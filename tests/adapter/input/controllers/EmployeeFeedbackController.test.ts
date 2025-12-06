import request from "supertest";
import express, { Express } from "express";
import { createMock } from "ts-auto-mock";
import { EmployeeFeedbackServiceInputPort } from "../../../../src/application/input/EmployeeFeedbackServiceInputPort";
import { EmployeeFeedbackController } from "../../../../src/adapter/input/controllers/EmployeeFeedbackController";
import { EmployeeFeedback } from "../../../../src/domain/models/EmployeeFeedback";
import { Department } from "../../../../src/domain/enums/Department";
import { CompanyTenure } from "../../../../src/domain/enums/CompanyTenure";
import { Gender } from "../../../../src/domain/enums/Gender";
import { Generation } from "../../../../src/domain/enums/Generation";

describe('EmployeeFeedbackController tests', () => {
    let mockEmployeeFeedbackServiceInputPort: EmployeeFeedbackServiceInputPort;
    let employeeFeedbackController: EmployeeFeedbackController;
    let testApp: Express;

    beforeEach(() => {
        mockEmployeeFeedbackServiceInputPort = createMock<EmployeeFeedbackServiceInputPort>();
        employeeFeedbackController = new EmployeeFeedbackController(mockEmployeeFeedbackServiceInputPort);

        testApp = express();
        testApp.use(express.json());
        testApp.post('/api/v1/employee-feedback', async (req, res) => {
            await employeeFeedbackController.create(req, res);
        });
        testApp.put('/api/v1/employee-feedback/:id', async (req, res) => {
            await employeeFeedbackController.update(req, res);
        });
        testApp.delete('/api/v1/employee-feedback/:id', async (req, res) => {
            await employeeFeedbackController.delete(req, res);
        });
        testApp.get('/api/v1/employee-feedback/:id', async (req, res) => {
            await employeeFeedbackController.findOne(req, res);
        });
        testApp.get('/api/v1/employee-feedback', async (req, res) => {
            await employeeFeedbackController.findAll(req, res);
        });
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

    test("create_whenPayloadValid_return201", async () => {
        const employeeFeedback = createEmployeeFeedback();

        mockEmployeeFeedbackServiceInputPort.create = jest.fn().mockResolvedValue(employeeFeedback);

        const employeeFeedbackCreated = { ...employeeFeedback } as EmployeeFeedback;

        const response = await request(testApp)
            .post("/api/v1/employee-feedback")
            .send(employeeFeedbackCreated).expect(201);

        expect(response.status).toBe(201);
        expect(response.body.employeeFeedback).toBeDefined();
        expect(response.body.message).toBeDefined();
        expect(mockEmployeeFeedbackServiceInputPort.create).toHaveBeenCalledTimes(1);
    });

    test("update_whenPayloadValid_return200", async () => {
        const employeeFeedback = createEmployeeFeedback("123");

        mockEmployeeFeedbackServiceInputPort.update = jest
            .fn()
            .mockResolvedValue(undefined);

        const response = await request(testApp)
            .put("/api/v1/employee-feedback/123")
            .send(employeeFeedback)
            .expect(200);

        expect(response.status).toBe(200);
        expect(response.body.message).toBeDefined();
        expect(mockEmployeeFeedbackServiceInputPort.update).toHaveBeenCalledWith(
            "123",
            expect.objectContaining({
                name: employeeFeedback.name,
                email: employeeFeedback.email,
            })
        );
    });

    test("delete_whenIdExists_return204", async () => {
        mockEmployeeFeedbackServiceInputPort.delete = jest
            .fn()
            .mockResolvedValue(undefined);

        const response = await request(testApp)
            .delete("/api/v1/employee-feedback/123")
            .expect(204);

        expect(response.status).toBe(204);
        expect(mockEmployeeFeedbackServiceInputPort.delete).toHaveBeenCalledWith("123");
    });

    test("findOne_whenIdExists_return200", async () => {
        const employeeFeedback = createEmployeeFeedback("123");

        mockEmployeeFeedbackServiceInputPort.findById = jest
            .fn()
            .mockResolvedValue(employeeFeedback);

        const response = await request(testApp)
            .get("/api/v1/employee-feedback/123")
            .expect(200);

        expect(response.status).toBe(200);
        expect(response.body.employeeFeedback).toBeDefined();
        expect(mockEmployeeFeedbackServiceInputPort.findById).toHaveBeenCalledWith(
            "123"
        );
    });

    test("findAll_whenDataExists_return200", async () => {
        const mockEmployeeFeedbackList = {
            data: [createEmployeeFeedback("123"), createEmployeeFeedback("456")],
            total: 2,
            page: 1,
            limit: 15
        };

        mockEmployeeFeedbackServiceInputPort.findAll = jest
            .fn()
            .mockResolvedValue(mockEmployeeFeedbackList);

        const response = await request(testApp)
            .get("/api/v1/employee-feedback")
            .query({ page: 1, limit: 15 })
            .expect(200);

        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
        expect(response.body.total).toBe(2);
        expect(response.body.page).toBe(1);
        expect(response.body.limit).toBe(15);
        expect(mockEmployeeFeedbackServiceInputPort.findAll).toHaveBeenCalledWith(
            expect.objectContaining({
                page: 1,
                limit: 15,
            })
        );
    });
});