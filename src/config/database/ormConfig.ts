import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { EmployeeFeedbackEntity } from '../../adapter/output/persistense/entities/EmployeeFeedbackEntity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '123456789',
  database: process.env.DB_NAME || 'people_insights',
  entities: [EmployeeFeedbackEntity],
  logging: true,
});