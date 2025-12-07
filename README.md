# Desafio PinPeople 

API REST desenvolvida para criar e gerenciar feedbacks de funcionários, implementada seguindo os princípios da Arquitetura Hexagonal (Ports and Adapters).


## ✅ Tarefas Concluídas

- **Task 1:** Criar banco de dados básico  
- **Task 3:** Criar conjunto de testes  
- **Task 4:** Configuração Docker Compose + Dockerfile  
- **Task 9:** Criar API simples  


## 🚀 Funcionalidades

- Criação de feedback de funcionários  
- Listagem com paginação e filtros  
- Consulta por ID  
- Atualização de feedback  
- Exclusão de feedback  
- Documentação via Swagger/OpenAPI  


## 🧩 Arquitetura

O projeto segue a **Arquitetura Hexagonal**, dividida em:

- **Domain** – Entidades, enums e regras de negócio  
- **Application** – Casos de uso, serviços e interfaces (ports)  
- **Adapter/Input** – Controllers, rotas e DTOs  
- **Adapter/Output** – Persistência e integrações externas  


## 🛠 Tecnologias

- Node.js + TypeScript  
- Express.js  
- TypeORM  
- PostgreSQL  
- Docker & Docker Compose  
- Swagger/OpenAPI  
- Jest  


## 🚀 Como Executar

### Pré-requisitos
- Docker Engine 20.10+  
- Docker Compose 2.0+


## ⚙️ Configuração de Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para configuração. Um arquivo `.env.example` está disponível na raiz do projeto como referência, copie o arquivo de exemplo e renomei para `.env`.

### Conteúdo do `.env.example`

O arquivo `.env.example` contém todas as variáveis necessárias:

```env
# Application Configuration
PORT=8000

# Database Configuration
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=123456789
DB_NAME=people_insights
```

## 📦 Executar com Docker

### Passo 1: Clone o repositório
```bash
git clone <repository-url>
cd challenge-tech-playground
```

### Passo 2: Construir e iniciar todos os serviços
```bash
docker-compose up -d --build
```

Este comando irá:
- Construir a imagem da aplicação usando o Dockerfile
- Iniciar o banco de dados PostgreSQL
- Iniciar a aplicação

### Passo 3: Verificar se os serviços estão rodando
```bash
docker-compose ps
```

Você deve ver os dois containers rodando:
- `postgres-employee-feedback` (banco de dados)
- `api-employee-feedback` (aplicação)

### Passo 4: Verificar logs da aplicação
```bash
docker-compose logs -f app
```

Os logs mostrarão:
- O início da aplicação na porta 8000

### Passo 5: Acessar a aplicação
- **API:** http://localhost:8000
- **Swagger Documentation:** http://localhost:8000/api/v1/docs
- **Banco de dados:** localhost:5432

### Comandos úteis

**Parar os serviços:**
```bash
docker-compose down
```

**Parar e remover volumes (limpar dados do banco):**
```bash
docker-compose down -v
```

**Reconstruir a aplicação após mudanças no código:**
```bash
docker-compose up -d --build app
```

**Ver logs do banco de dados:**
```bash
docker-compose logs -f postgres
```

## 💻 Executar Localmente (sem Docker)

Se preferir executar sem Docker:

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Copie o arquivo de exemplo e configure:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações (veja a seção [Configuração de Variáveis de Ambiente](#-configuração-de-variáveis-de-ambiente) acima).

### 3. Configurar o banco de dados
Certifique-se de que o PostgreSQL está rodando e execute o script de criação:
```bash
# Execute o script SQL manualmente ou use o Docker apenas para o banco
psql -U postgres -d people_insights -f src/config/database/createTableConfig.sql
```

### 4. Importar dados iniciais
```bash
npm run import:csv:dev
```

### 5. Compilar o projeto
```bash
npm run build
```

### 6. Iniciar a aplicação
```bash
npm start
```

### 7. Modo desenvolvimento
```bash
npm run start:dev
```

## 📡 Endpoints da API

### Base URL
```
http://localhost:8000/api/v1
```

### Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/employee-feedback` | Criar novo feedback |
| `GET` | `/employee-feedback` | Listar feedbacks (com filtros e paginação) |
| `GET` | `/employee-feedback/:id` | Buscar feedback por ID |
| `PUT` | `/employee-feedback/:id` | Atualizar feedback |
| `DELETE` | `/employee-feedback/:id` | Excluir feedback |

### Filtros Disponíveis (Query Parameters)

- `page` - Número da página (padrão: 1)
- `limit` - Itens por página (padrão: 15)
- `department` - Filtrar por departamento
- `jobRole` - Filtrar por cargo
- `location` - Filtrar por localização
- `gender` - Filtrar por gênero (MALE, FEMALE, OTHER)
- `companyTenure` - Filtrar por tempo de empresa
- `generation` - Filtrar por geração
- `dateFrom` - Data inicial (formato: YYYY-MM-DD)
- `dateTo` - Data final (formato: YYYY-MM-DD)
- `search` - Busca textual


## 📚 Documentação da API

A documentação completa da API está disponível via Swagger UI:

```
http://localhost:8000/api/v1/docs
```


## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm test -- --watch
```


## 📁 Estrutura do Projeto

```
challenge-tech-playground/
├── src/
│   ├── adapter/
│   │   ├── input/          # Controllers e Rotas
│   │   └── output/         # Persistência e Integrações
│   ├── application/        # Casos de uso e Serviços
│   ├── config/             # Configurações (DB, etc)
│   │   └── database/       # Scripts SQL e CSV
│   ├── domain/             # Entidades e Regras de Negócio
│   ├── helpers/            # Utilitários e Erros
│   ├── docs/               # Documentação Swagger
│   ├── App.ts              # Configuração Express
│   └── server.ts           # Ponto de entrada
├── tests/                  # Testes unitários
├── docker-compose.yml      # Configuração Docker Compose
├── Dockerfile              # Imagem Docker da aplicação
└── package.json
```

