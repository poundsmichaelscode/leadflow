# Leadflow

Production-oriented full-stack Lead Management MVP built with Next.js, Express, TypeScript, Prisma, PostgreSQL, Docker, GitHub Actions, Vercel, and Render.

Developed as a technical assessment for **Quovoy**, a SaaS company based in Newcastle upon Tyne, United Kingdom.

[![CI](https://github.com/poundsmichaelscode/leadflow/actions/workflows/ci.yml/badge.svg)](https://github.com/poundsmichaelscode/leadflow/actions/workflows/ci.yml)

## Production Links

| Service | URL |
|---|---|
| Live Application | https://leadflow-psi-sage.vercel.app |
| Production API | https://leadflow-yiwn.onrender.com |
| API Health Check | https://leadflow-yiwn.onrender.com/health |
| GitHub Repository | https://github.com/poundsmichaelscode/leadflow |

## Assessment Company

- **Company:** Quovoy
- **Industry:** SaaS
- **Location:** Newcastle upon Tyne, United Kingdom

## Project Overview

Leadflow is a full-stack lead management application for creating, viewing, and tracking prospects through a simple sales pipeline.

The application demonstrates a production-style architecture with:

- Separate frontend and backend services
- Managed PostgreSQL database
- Prisma ORM and migrations
- Dockerized local development
- Automated testing
- GitHub Actions CI
- Production deployments on Vercel and Render

## Features

- Create new leads
- View all leads
- Track leads by pipeline status
- Persistent PostgreSQL storage
- Unique email enforcement
- Client-side validation
- Server-side validation with Zod
- Duplicate-email handling
- Loading states
- Empty states
- Success feedback
- Error handling
- Responsive UI
- REST API
- Health-check endpoint
- Automated database migrations
- Docker Compose support
- Continuous integration

## Lead Statuses

Supported statuses:

- New
- Engaged
- Proposal Sent
- Closed-Won
- Closed-Lost

## Production Architecture

```text
User Browser
     |
     | HTTPS
     v
Vercel
Next.js Frontend
     |
     | HTTPS
     v
Render
Express / TypeScript API
     |
     v
Prisma ORM
     |
     v
Render PostgreSQL
```

## Local Architecture

```text
Browser
   |
   v
Next.js :3000
   |
   v
Express API :4000
   |
   v
Prisma
   |
   v
PostgreSQL :5432
```

## Tech Stack

### Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS

### Backend

- Node.js 22
- Express.js
- TypeScript
- Zod
- Prisma ORM
- PostgreSQL adapter

### Database

- PostgreSQL 17

### DevOps

- Docker
- Docker Compose
- GitHub Actions
- Vercel
- Render

### Testing and Quality

- Vitest
- Supertest
- ESLint
- TypeScript strict mode
- GitHub Actions CI

## Repository Structure

```text
leadflow/
├── .github/
│   └── workflows/
│       └── ci.yml
├── apps/
│   ├── api/
│   │   ├── prisma/
│   │   │   ├── migrations/
│   │   │   └── schema.prisma
│   │   ├── src/
│   │   │   ├── config/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── utils/
│   │   │   └── validation/
│   │   ├── tests/
│   │   └── Dockerfile
│   └── web/
│       ├── src/
│       │   ├── app/
│       │   ├── components/
│       │   ├── hooks/
│       │   ├── lib/
│       │   └── types/
│       └── Dockerfile
├── docker-compose.yml
├── render.yaml
├── package.json
├── package-lock.json
└── README.md
```

## API

Production API:

```text
https://leadflow-yiwn.onrender.com
```

### Health Check

```http
GET /health
```

Example response:

```json
{
  "status": "ok"
}
```

### Get Leads

```http
GET /leads
```

### Create Lead

```http
POST /leads
Content-Type: application/json
```

Example request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "status": "New"
}
```

## API Validation

The backend validates:

- Lead name
- Email format
- Supported lead status
- Duplicate email addresses

Duplicate emails return an HTTP `409 Conflict`.

## Environment Variables

### API

Local:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/lead_manager?schema=public
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

Production variables are configured in Render.

Production CORS:

```env
CORS_ORIGIN=https://leadflow-psi-sage.vercel.app
```

### Frontend

Local:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Production:

```env
NEXT_PUBLIC_API_URL=https://leadflow-yiwn.onrender.com
```

Environment files containing secrets are excluded from Git.

## Local Development

### Requirements

- Node.js 22+
- npm
- Docker
- Docker Compose

Clone the repository:

```bash
git clone https://github.com/poundsmichaelscode/leadflow.git
cd leadflow
```

Install dependencies:

```bash
npm ci
```

## Run with Docker

Start the entire application:

```bash
docker compose up --build
```

Services:

```text
Frontend:   http://localhost:3000
API:        http://localhost:4000
PostgreSQL: localhost:5432
```

Stop the application:

```bash
docker compose down
```

Remove the database volume too:

```bash
docker compose down -v
```

## Run Without Docker

### Backend

```bash
cd apps/api
```

Generate Prisma Client:

```bash
npx prisma generate
```

Apply migrations:

```bash
npx prisma migrate deploy --config prisma7.config.ts
```

Start development API:

```bash
npm run dev
```

### Frontend

In another terminal:

```bash
cd apps/web
```

Start:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Database

The main `Lead` model contains:

- `id`
- `name`
- `email`
- `status`
- `createdAt`
- `updatedAt`

Email is unique.

Indexes are included for:

- Lead status
- Creation date

## Prisma Migrations

Migration files are committed under:

```text
apps/api/prisma/migrations/
```

Production migration command:

```bash
npx prisma migrate deploy --config prisma7.config.ts
```

Development migration command:

```bash
npx prisma migrate dev
```

## Testing

Run API tests:

```bash
npm test --workspace=apps/api
```

Current automated test result:

```text
2 test files passed
8 tests passed
```

The test suite covers:

- Health endpoint
- Lead creation
- Lead listing
- Validation
- Duplicate email handling
- API error behaviour

## Code Quality

API type checking:

```bash
npm run typecheck --workspace=apps/api
```

API tests:

```bash
npm test --workspace=apps/api
```

API build:

```bash
npm run build --workspace=apps/api
```

Frontend lint:

```bash
npm run lint --workspace=apps/web
```

Frontend build:

```bash
npm run build --workspace=apps/web
```

## Continuous Integration

GitHub Actions runs on:

- Pushes to `main`
- Pull requests targeting `main`

Pipeline:

```text
Checkout
   |
   v
Node.js 22
   |
   v
npm ci
   |
   v
PostgreSQL Service
   |
   v
Prisma Generate
   |
   v
Database Migration
   |
   v
API Typecheck
   |
   v
API Tests
   |
   v
API Build
   |
   v
Web Lint
   |
   v
Web Build
```

Workflow file:

```text
.github/workflows/ci.yml
```

## Production Deployment

### Frontend — Vercel

Production URL:

```text
https://leadflow-psi-sage.vercel.app
```

Configuration:

```text
Framework: Next.js
Root Directory: apps/web
```

Environment variable:

```env
NEXT_PUBLIC_API_URL=https://leadflow-yiwn.onrender.com
```

### Backend — Render

Production URL:

```text
https://leadflow-yiwn.onrender.com
```

The API is deployed from:

```text
apps/api/Dockerfile
```

Production startup:

```bash
npm run start:prod
```

which runs:

```bash
prisma migrate deploy --config prisma7.config.ts && node dist/server.js
```

### Database — Render PostgreSQL

The API connects to a managed PostgreSQL database through the Render internal database connection URL.

The production database connection string is stored securely as:

```text
DATABASE_URL
```

and is never committed to Git.

## Health Monitoring

Health endpoint:

```text
https://leadflow-yiwn.onrender.com/health
```

Render monitors:

```text
/health
```

The health service also verifies database connectivity.

## Security

The API includes:

- Helmet security headers
- CORS configuration
- Rate limiting
- Request body size limits
- Zod validation
- Unique database constraints
- Environment-based configuration
- Centralized error handling
- No production secrets committed to source control

## Design Decisions

### Monorepo

The frontend and backend live in a single npm workspace.

This simplifies:

- Dependency installation
- CI
- Docker builds
- Repository management

### Separate API Layer

The Next.js frontend does not communicate directly with PostgreSQL.

```text
Next.js
   |
   v
Express
   |
   v
Prisma
   |
   v
PostgreSQL
```

This keeps business logic, validation, and database access centralized.

### PostgreSQL

PostgreSQL provides durable relational persistence and database-level constraints.

### Prisma

Prisma provides:

- Type-safe database access
- Schema management
- Migration tracking
- Production migration deployment

### Docker

Docker provides a repeatable runtime across development and deployment environments.

### CI

Every push to `main` is automatically validated through GitHub Actions.

## Current Scope

The MVP currently focuses on lead creation and lead viewing.

Not currently included:

- Authentication
- User accounts
- Edit lead
- Delete lead
- Search
- Filtering
- Sorting
- Pagination
- Lead assignment
- Notes
- Analytics

## Future Improvements

Potential production improvements include:

- Authentication
- Role-based access control
- Lead editing
- Lead deletion
- Search and filtering
- Sorting and pagination
- Lead ownership
- Activity history
- Notes
- Analytics dashboard
- Frontend unit tests
- End-to-end tests
- Structured logging
- Error monitoring
- Metrics and observability
- OpenAPI / Swagger
- Custom domains
- Database backups
- Redis caching
- Background workers

## Assessment

Built as a technical assessment submission for:

**Quovoy**  
SaaS  
Newcastle upon Tyne, United Kingdom

## Author

**Olayenikan Michael**

Full-Stack Developer | Backend Developer | DevOps Engineer

Lagos, Nigeria

GitHub: https://github.com/poundsmichaelscode

---

**Leadflow — built, tested, containerized, continuously integrated, and deployed using a production-oriented full-stack architecture.**

