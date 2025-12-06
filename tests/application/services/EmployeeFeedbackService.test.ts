import { createMock } from 'ts-auto-mock';
import { v4 as uuidv4 } from 'uuid';
import { EmployeeFeedbackPersistenceOutputPort } from "../../../src/application/output/EmployeeFeedbackPersistenceOutputPort";
import { EmployeeFeedbackService } from "../../../src/application/services/EmployeeFeedbackService";
import { EmployeeFeedback } from '../../../src/domain/models/EmployeeFeedback';
import { Department } from '../../../src/domain/enums/Department';
import { CompanyTenure } from '../../../src/domain/enums/CompanyTenure';
import { Gender } from '../../../src/domain/enums/Gender';
import { Generation } from '../../../src/domain/enums/Generation';
import { BadRequestError } from '../../../src/helpers/BadRequestError';
import { Constantes } from '../../../src/domain/Constantes';
import { NotFoundError } from '../../../src/helpers/NotFoundError';
import { BaseError } from '../../../src/helpers/BaseError';

describe('EmployeeFeedbackService tests', () => {
  let mockEmployeeFeedbackPersistenceAdapter: EmployeeFeedbackPersistenceOutputPort;
  let employeeFeedbackService: EmployeeFeedbackService;

  beforeEach(() => {
    mockEmployeeFeedbackPersistenceAdapter = createMock<EmployeeFeedbackPersistenceOutputPort>();
    employeeFeedbackService = new EmployeeFeedbackService(mockEmployeeFeedbackPersistenceAdapter);
    jest.clearAllMocks();
  });

  const createEmployeeFeedback = (id: string = '123'): EmployeeFeedback => {
    return new EmployeeFeedback(
      id,
      'João Silva',
      'joao.silva12@example.com',
      'joao.silva12@empresa.com',
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

  test('create_whenEmailAlreadyExists_returnBadRequestError', async () => {
    const employeeFeedbackExistsByEmail = createEmployeeFeedback();

    mockEmployeeFeedbackPersistenceAdapter.findByEmail = jest
      .fn(async () => { return employeeFeedbackExistsByEmail });

    expect(async () => await employeeFeedbackService.create(employeeFeedbackExistsByEmail))
      .rejects
      .toBeInstanceOf(BadRequestError);
    expect(async () => await employeeFeedbackService.create(employeeFeedbackExistsByEmail))
      .rejects
      .toMatchObject({
        message: Constantes.httpMessages.BAD_REQUEST_ERROR,
        errors: [
          {
            title: 'E-mail já existe',
            detail: 'O e-mail informado já existe',
            code: Constantes.httpStatus.BAD_REQUEST
          }
        ]
      });

  });

  test('create_whenPayloadInvalid_returnBadRequestError', async () => {
    const employeeFeedbackInvalid = createEmployeeFeedback();
    employeeFeedbackInvalid.name = '';
    employeeFeedbackInvalid.email = '';

    expect(async () => await employeeFeedbackService.create(employeeFeedbackInvalid))
      .rejects
      .toBeInstanceOf(BadRequestError);
    expect(async () => await employeeFeedbackService.create(employeeFeedbackInvalid))
      .rejects
      .toMatchObject({
        message: Constantes.httpMessages.BAD_REQUEST_ERROR,
        errors: expect.any(Array),
        statusCode: Constantes.httpStatus.BAD_REQUEST
      });
  });

  test('create_whenPayloadValid_returnEmployeeFeedback', async () => {
    mockEmployeeFeedbackPersistenceAdapter.findByEmail = jest.fn().mockResolvedValue(false);

    const id = uuidv4();
    const employeeFeedback = createEmployeeFeedback(id);

    mockEmployeeFeedbackPersistenceAdapter.create = jest.fn().mockResolvedValue({ ...employeeFeedback });

    const employeeFeedbackCreated = await employeeFeedbackService.create(employeeFeedback);

    expect(employeeFeedbackCreated.id).toBe(id);
    expect(employeeFeedbackCreated.name).toBe('João Silva');
    expect(employeeFeedbackCreated.email).toBe('joao.silva12@example.com');
    expect(employeeFeedbackCreated.corporateEmail).toBe('joao.silva12@empresa.com');
    expect(mockEmployeeFeedbackPersistenceAdapter.create).toHaveBeenCalledTimes(1);
  });

  test('delete_whenIdInvalid_returnNotFoundError', async () => {
    mockEmployeeFeedbackPersistenceAdapter.findById = jest.fn(async () => { return null });

    expect(async () => {
      await employeeFeedbackService.delete('123');
    }).rejects.toBeInstanceOf(NotFoundError);

  });

  test('delete_whenIdValid_returnVoid', async () => {
    const employeeFeedback = createEmployeeFeedback();
    mockEmployeeFeedbackPersistenceAdapter.findById = jest.fn(async () => { return employeeFeedback });

    await expect(employeeFeedbackService.delete(employeeFeedback.id))
      .resolves
      .toBeUndefined();
    await expect(employeeFeedbackService.delete(employeeFeedback.id))
      .resolves
      .not.toThrow(BaseError);
  });

  test('update_whenIdNotFound_returnNotFoundError', async () => {
    mockEmployeeFeedbackPersistenceAdapter.findById = jest.fn()
      .mockResolvedValue(null);
  
    const payload = createEmployeeFeedback();
    payload.name = 'João Silva Updated';	
  
    await expect(employeeFeedbackService.update('123', payload))
      .rejects
      .toBeInstanceOf(NotFoundError);
  });  

  test('update_whenPayloadInvalid_returnBadRequestError', async () => {
    const employeeFeedback = createEmployeeFeedback();
  
    mockEmployeeFeedbackPersistenceAdapter.findById = jest.fn()
      .mockResolvedValue(employeeFeedback);
  
    const invalidPayload = { ...employeeFeedback, name: '' };
  
    await expect(employeeFeedbackService.update(employeeFeedback.id, invalidPayload as EmployeeFeedback))
      .rejects
      .toBeInstanceOf(BadRequestError);
  });

  test('update_whenPayloadValid_returnUpdatedEmployeeFeedback', async () => {
    const employeeFeedback = createEmployeeFeedback();
    
    mockEmployeeFeedbackPersistenceAdapter.findById = jest.fn()
      .mockResolvedValue(employeeFeedback);
  
    const updated = { ...employeeFeedback, name: 'João Silva Updated' };
    mockEmployeeFeedbackPersistenceAdapter.update = jest.fn()
      .mockResolvedValue(updated);
  
    const employeeFeedbackUpdated = await employeeFeedbackService.update(employeeFeedback.id, updated as EmployeeFeedback);
  
    expect(employeeFeedbackUpdated.name).toBe('João Silva Updated');
    expect(mockEmployeeFeedbackPersistenceAdapter.update).toHaveBeenCalledTimes(1);
    expect(mockEmployeeFeedbackPersistenceAdapter.update)
      .toHaveBeenCalledWith(employeeFeedback.id, updated);
  });
});