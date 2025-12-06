import { GenericContainer, StartedTestContainer } from "testcontainers";
import { DataSource } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { EmployeeFeedbackEntity } from "../../../../src/adapter/output/persistense/entities/EmployeeFeedbackEntity";
import { Department } from "../../../../src/domain/enums/Department";
import { EmployeeFeedback } from "../../../../src/domain/models/EmployeeFeedback";
import { CompanyTenure } from "../../../../src/domain/enums/CompanyTenure";
import { Gender } from "../../../../src/domain/enums/Gender";
import { Generation } from "../../../../src/domain/enums/Generation";
import dotenv from 'dotenv';

dotenv.config();

describe('EmployeeFeedbackPersistenceAdapter tests', () => {
    let container: StartedTestContainer;
    let testDataSource: DataSource;

    jest.setTimeout(60000);

    beforeAll(async () => {
        container = await new GenericContainer("postgres")
            .withEnvironment({
                POSTGRES_USER: "test",
                POSTGRES_PASSWORD: "test",
                POSTGRES_DB: "people_insights_test",
            })
            .withExposedPorts(5432)
            .start();

        await new Promise(res => setTimeout(res, 1500));

        testDataSource = new DataSource({
            type: "postgres",
            host: container.getHost(),
            port: container.getMappedPort(5432),
            username: "test",
            password: "test",
            database: "people_insights_test",
            synchronize: true,
            entities: [EmployeeFeedbackEntity],
        });

        await testDataSource.initialize();
    }, 60000);

    afterEach(async () => {
        if (testDataSource?.isInitialized) {
            const repo = testDataSource.getRepository(EmployeeFeedbackEntity);
            await repo.clear();
        }
    });

    afterAll(async () => {
        if (testDataSource?.isInitialized) {
            await testDataSource.destroy();
        }
        if (container) {
            await container.stop();
        }
    });

    const createEmployeeFeedback = (id: string = '123'): EmployeeFeedback => {
        return new EmployeeFeedback(
            id,
            'João Silva',
            `joao.silva${id}@example.com`,
            `joao.silva${id}@empresa.com`,
            Department.TECHNOLOGY,
            'Desenvolvedor',
            'Desenvolvimento de Software',
            'São Paulo',
            CompanyTenure.LESS_THAN_2_YEARS,
            Gender.MALE,
            Generation.GENERATION_Y,
            'Empresa',
            'Diretoria de Tecnologia',
            'Gerência de Desenvolvimento',
            'Coordenação de Backend',
            'Área de APIs',
            new Date('2025-11-15'),
            8,
            'Gosto muito do trabalho que faço',
            8,
            'Contribuo bastante para o time',
            7,
            'Quero evoluir ainda mais',
            9,
            'Feedback positivo geral',
            8,
            'Boa relação com a liderança',
            6,
            'Gostaria de ter mais visibilidade sobre carreira',
            5,
            'Pretendo ficar pelos próximos anos',
            7,
            'Empresa com pontos fortes e oportunidades'
        );
    };

    test('create_whenValid_returnEmployeeFeedback', async () => {
        const repo = testDataSource.getRepository(EmployeeFeedbackEntity);

        const id = uuidv4();
        const model = createEmployeeFeedback(id);

        const entity = repo.create({
            ...model,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await repo.save(entity);

        const saved = await repo.findOneBy({ id });

        expect(saved).not.toBeNull();
        expect(saved?.email).toBe(model.email);
    });

    test('findAll_whenRecordsExist_returnList', async () => {
        const repo = testDataSource.getRepository(EmployeeFeedbackEntity);

        await repo.save(repo.create({ ...createEmployeeFeedback(uuidv4()), createdAt: new Date(), updatedAt: new Date() }));
        await repo.save(repo.create({ ...createEmployeeFeedback(uuidv4()), createdAt: new Date(), updatedAt: new Date() }));

        const results = await repo.find();

        expect(results.length).toBeGreaterThanOrEqual(2);
    });

    test('findById_whenIdExists_returnEmployeeFeedback', async () => {
        const repo = testDataSource.getRepository(EmployeeFeedbackEntity);
        const id = uuidv4();
        const employeeFeedbackCreated = createEmployeeFeedback(id);

        const entity = repo.create({
            ...employeeFeedbackCreated,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await repo.save(entity);
        const employeeFeedback: any = await repo.findBy({ id });

        expect(employeeFeedback[0].name).toBe('João Silva');
        expect(employeeFeedback[0].email).toBe(employeeFeedbackCreated.email);
        expect(employeeFeedback[0].corporateEmail).toBe(employeeFeedbackCreated.corporateEmail);
        expect(employeeFeedback[0].department).toBe(Department.TECHNOLOGY);
    });

    test('update_whenValid_updateSuccess', async () => {
        const repo = testDataSource.getRepository(EmployeeFeedbackEntity);
        const id = uuidv4();

        const entity = repo.create({
            ...createEmployeeFeedback(id),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await repo.save(entity);

        await repo.update({ id }, { name: "Maria Souza" });

        const updated = await repo.findOneBy({ id });

        expect(updated?.name).toBe("Maria Souza");
    });

    test('delete_whenValid_deleteSuccess', async () => {
        const repo = testDataSource.getRepository(EmployeeFeedbackEntity);
        const id = uuidv4();

        const entity = repo.create({
            ...createEmployeeFeedback(id),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await repo.save(entity);

        await repo.delete({ id });

        const deleted = await repo.findOneBy({ id });

        expect(deleted).toBeNull();
    });
});
