import fs from 'fs';
import { AppDataSource } from './ormConfig';
import { EmployeeFeedbackEntity } from '../../adapter/output/persistense/entities/EmployeeFeedbackEntity';
import { Department } from '../../domain/enums/Department';
import { Gender } from '../../domain/enums/Gender';
import { CompanyTenure } from '../../domain/enums/CompanyTenure';
import { Generation } from '../../domain/enums/Generation';

function mapArea(area: string): string {
    const areaMap: { [key: string]: string } = {
        'administrativo': Department.ADMINISTRATION,
        'comercial': Department.COMMERCIAL,
        'financeiro': Department.FINANCE,
        'recursos humanos': Department.HR,
        'tecnologia': Department.TECHNOLOGY,
        'marketing': Department.MARKETING,
        'operações': Department.OPERATIONS,
        'logística': Department.LOGISTICS,
        'jurídico': Department.LEGAL,
    };
    return areaMap[area.toLowerCase()] || area;
}

function mapGender(gender: string): string {
    const genderMap: { [key: string]: string } = {
        'masculino': Gender.MALE,
        'feminino': Gender.FEMALE,
        'outro': Gender.OTHER,
    };
    return genderMap[gender.toLowerCase()] || gender.toUpperCase();
}

function mapCompanyTenure(tenure: string): string {
    const tenureMap: { [key: string]: string } = {
        'menos de 1 ano': CompanyTenure.LESS_THAN_1_YEAR,
        'entre 1 e 2 anos': CompanyTenure.LESS_THAN_2_YEARS,
        'entre 2 e 3 anos': CompanyTenure.LESS_THAN_3_YEARS,
        'entre 3 e 4 anos': CompanyTenure.LESS_THAN_4_YEARS,
        'entre 2 e 5 anos': CompanyTenure.LESS_THAN_5_YEARS,
        'entre 4 e 5 anos': CompanyTenure.LESS_THAN_5_YEARS,
        'entre 5 e 6 anos': CompanyTenure.LESS_THAN_6_YEARS,
        'mais de 5 anos': CompanyTenure.LESS_THAN_8_YEARS, 
    };
    return tenureMap[tenure.toLowerCase()] || tenure;
}

function mapGeneration(generation: string): string {
    const generationMap: { [key: string]: string } = {
        'geração alpha': Generation.GENERATION_ALPHA,
        'geração z': Generation.GENERATION_Z,
        'geração y': Generation.GENERATION_Y,
        'geração x': Generation.GENERATION_X,
        'baby boomers': Generation.BABY_BOOMERS,
        'baby boomer': Generation.BABY_BOOMERS,
    };
    return generationMap[generation.toLowerCase()] || generation;
}

function parseDate(date: string): Date {
    const [day, month, year] = date.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

function parseNumber(value: string): number | undefined {
    if (!value || value === '-' || value.trim() === '') {
        return undefined;
    }
    const num = parseInt(value);
    return isNaN(num) ? undefined : num;
}

async function insertDataConfig() {
    await AppDataSource.initialize();
    const employeeFeedbackRepository = AppDataSource.getRepository(EmployeeFeedbackEntity);

    const count = await employeeFeedbackRepository.count();
    if (count > 0) {
        console.log(`Dados já existem no banco (${count} registros). Pulando importação.`);
        await AppDataSource.destroy();
        return;
    }

    console.log('Iniciando importação do CSV...');

    const filePath = './src/config/database/data.csv';

    if (!fs.existsSync(filePath)) {
        console.error('Arquivo CSV não encontrado:', filePath);
        await AppDataSource.destroy();
        return;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n').filter(line => line.trim() !== '');
    
    if (lines.length < 2) {
        console.error('Arquivo CSV vazio ou sem dados');
        await AppDataSource.destroy();
        return;
    }

    const headers = lines[0].split(';').map(h => h.trim());
    
    console.log(`Encontradas ${lines.length - 1} linhas de dados`);

    let inserted = 0;
    let errors = 0;

    for (let i = 1; i < lines.length; i++) {
        let row: { [key: string]: string } = {};
        try {
            const values = lines[i].split(';');
            row = {};
            
            headers.forEach((header, index) => {
                row[header] = values[index]?.trim() || '';
            });

            if (!row['nome'] || !row['email']) {
                console.warn(`Linha ${i + 1} ignorada: dados incompletos`);
                continue;
            }
            const existingRecord = await employeeFeedbackRepository.findOne({
                where: { email: row['email'] }
            });

            if (existingRecord) {
                console.warn(`Linha ${i + 1} ignorada: email ${row['email']} já existe no banco`);
                continue;
            }

            const entity = employeeFeedbackRepository.create({
                name: row['nome'],
                email: row['email'],
                corporateEmail: row['email_corporativo'] || row['email'],
                department: mapArea(row['area']),
                jobRole: row['cargo'],
                jobFunction: row['funcao'],
                location: row['localidade'],
                companyTenure: mapCompanyTenure(row['tempo_de_empresa']),
                gender: mapGender(row['genero']),
                generation: mapGeneration(row['geracao']),
                level0Company: row['n0_empresa'] || '',
                level1Directorate: row['n1_diretoria'] || '',
                level2Management: row['n2_gerencia'] || '',
                level3Coordination: row['n3_coordenacao'] || '',
                level4Area: row['n4_area'] || '',
                responseDate: parseDate(row['Data da Resposta']),
                jobInterest: parseNumber(row['Interesse no Cargo']) || 0,
                jobInterestComments: row['Comentários - Interesse no Cargo'] || '',
                contribution: parseNumber(row['Contribuição']),
                contributionComments: row['Comentários - Contribuição'] || '',
                learningDevelopment: parseNumber(row['Aprendizado e Desenvolvimento']) || 0,
                learningDevelopmentComments: row['Comentários - Aprendizado e Desenvolvimento'] || '',
                feedbackScore: parseNumber(row['Feedback']),
                feedbackComments: row['Comentários - Feedback'] || '',
                managerInteraction: parseNumber(row['Interação com Gestor']),
                managerInteractionComments: row['Comentários - Interação com Gestor'] || '',
                careerClarity: parseNumber(row['Clareza sobre Possibilidades de Carreira']) || 0,
                careerClarityComments: row['Comentários - Clareza sobre Possibilidades de Carreira'] || '',
                permanenceExpectation: parseNumber(row['Expectativa de Permanência']),
                permanenceExpectationComments: row['Comentários - Expectativa de Permanência'] || '',
                enpsScore: parseNumber(row['eNPS']),
                enpsOpenComments: row['[Aberta] eNPS'] || '',
            });

            await employeeFeedbackRepository.save(entity);
            inserted++;

            if (inserted % 100 === 0) {
                console.log(`Processadas ${inserted} linhas...`);
            }
        } catch (error: any) {
            if (error?.code === '23505' || error?.driverError?.code === '23505') {
                const email = row['email'] || 'desconhecido';
                console.warn(`Linha ${i + 1} ignorada: registro duplicado (email: ${email})`);
            } else {
                errors++;
                console.error(`Erro ao processar linha ${i + 1}:`, error.message || error);
            }
        }
    }

    console.log(`\nImportação concluída!`);
    console.log(`- Inseridos: ${inserted}`);
    console.log(`- Erros: ${errors}`);
    
    await AppDataSource.destroy();
}

insertDataConfig().catch((err) => {
    console.error('Erro durante inserção de dados:', err);
    process.exit(1);
});
