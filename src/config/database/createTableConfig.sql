CREATE TYPE gender_enum AS ENUM (
    'MALE',
    'FEMALE',
    'OTHER'
);

CREATE TYPE tenure_enum AS ENUM (
    'Menos de 6 meses',
    '6 meses a 1 ano',
    '1 a 2 anos',
    '2 a 3 anos',
    '3 a 4 anos',
    '4 a 5 anos',
    '5 a 6 anos',
    '6 a 7 anos',
    '7 a 8 anos',
    '8 a 9 anos',
    '9 a 10 anos',
    '10 a 12 anos',
    '12 a 15 anos',
    '15 a 20 anos',
    'Mais de 20 anos'
);

CREATE TYPE department_enum AS ENUM (
    'Marketing',
    'Financeiro',
    'Recursos Humanos',
    'Tecnologia',
    'Administração',
    'Comercial',
    'Operações',
    'Logística',
    'Jurídico'
);

CREATE TYPE generation_enum AS ENUM (
    'Geração Alpha',
    'Geração Z',
    'Geração Y',
    'Geração X',
    'Baby Boomers'
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE employees_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    corporate_email TEXT UNIQUE NOT NULL,

    department department_enum,
    job_role TEXT NOT NULL,
    job_function TEXT NOT NULL,
    location TEXT NOT NULL,

    company_tenure tenure_enum NOT NULL,
    gender gender_enum NOT NULL,
    generation generation_enum NOT NULL,

    level_0_company TEXT,
    level_1_directorate TEXT,
    level_2_management TEXT,
    level_3_coordination TEXT,
    level_4_area TEXT,

    response_date DATE NOT NULL,

    job_interest INTEGER NOT NULL,
    job_interest_comments TEXT NOT NULL,

    contribution INTEGER,
    contribution_comments TEXT,

    learning_development INTEGER,
    learning_development_comments TEXT,

    feedback_score INTEGER,
    feedback_comments TEXT,

    manager_interaction INTEGER,
    manager_interaction_comments TEXT,

    career_clarity INTEGER,
    career_clarity_comments TEXT,

    permanence_expectation INTEGER,
    permanence_expectation_comments TEXT,

    enps_score INTEGER,
    enps_open_comments TEXT,

    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_department ON employees_feedback (department);
CREATE INDEX idx_job_role ON employees_feedback (job_role);
CREATE INDEX idx_location ON employees_feedback (location);
CREATE INDEX idx_response_date ON employees_feedback (response_date);
CREATE INDEX idx_company_tenure ON employees_feedback (company_tenure);
CREATE INDEX idx_generation ON employees_feedback (generation);