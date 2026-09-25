Paste this directly from the `leadflow` root:

```bash
cat > README.md <<'EOF'
# Leadflow — Lead Management MVP

A production-ready full-stack Lead Management MVP developed as a technical assessment for **Quovoy**, a SaaS company based in Newcastle upon Tyne, United Kingdom.

[![CI](https://github.com/poundsmichaelscode/leadflow/actions/workflows/ci.yml/badge.svg)](https://github.com/poundsmichaelscode/leadflow/actions/workflows/ci.yml)

## Assessment Company

- **Company:** Quovoy
- **Industry:** SaaS
- **Location:** Newcastle upon Tyne, United Kingdom

## Project Overview

Leadflow is a full-stack application for creating, viewing, and tracking sales leads through a simple sales pipeline.

The application allows users to:

- Create a lead with a name, email address, and status
- View all leads in a responsive dashboard
- Track leads through multiple pipeline stages
- Receive frontend and backend validation feedback
- Prevent duplicate lead email addresses
- Persist lead data with PostgreSQL
- Run the complete application with Docker Compose

## Tech Stack

### Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS

### Backend

- Node.js
- Express.js
- TypeScript
- Zod
- Prisma ORM

### Database

- PostgreSQL 17

### DevOps and Quality

- Docker
- Docker Compose
- GitHub Actions
- Vitest
- Supertest
- ESLint
- TypeScript type checking

## Architecture

```text
Browser
   |
   v
Next.js Web App :3000
   |
   v
Express API :4000
   |
   v
Prisma ORM
   |
   v
PostgreSQL :5432
```

## Project Structure

```text
leadflow/
├── .github/
│   └── workflows/
│       └── ci.yml
├── apps/
│   ├── api/
│   │   ├── prisma/
│   │   ├── src/
│   │   ├── tests/
│   │   └── Dockerfile
│   └── web/
│       ├── src/
│       └── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
└── README.md
```

## Lead Statuses

The application supports the following lead statuses:

- New
- Engaged
- Proposal Sent
- Closed-Won
- Closed-Lost

## API Endpoints

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

### Get All Leads

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

The API validates incoming data and rejects duplicate email addresses.

## Environment Variables

### API

Create `apps/api/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/lead_manager?schema=public"
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend

Create `apps/web/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Environment files are excluded from Git.

## Run with Docker

Docker Compose is the recommended way to run the complete application.

### Requirements

- Docker
- Docker Compose

### Start the application

From the project root:

```bash
docker compose up --build
```

The following services will start:

- Frontend: `http://localhost:3000`
- API: `http://localhost:4000`
- PostgreSQL: `localhost:5432`

Open:

```text
http://localhost:3000
```

Check the API:

```bash
curl http://localhost:4000/health
```

Stop the containers:

```bash
docker compose down
```

Remove containers and database volume:

```bash
docker compose down -v
```

## Run Locally Without Docker

Install dependencies:

```bash
npm ci
```

Generate Prisma Client:

```bash
cd apps/api
npx prisma generate
```

Apply database migrations:

```bash
npx prisma migrate deploy --config prisma7.config.ts
```

Start the backend:

```bash
npm run dev
```

In another terminal, start the frontend:

```bash
cd apps/web
npm run dev
```

Open:

```text
http://localhost:3000
```

## Testing

The backend uses Vitest and Supertest.

Run tests:

```bash
cd apps/api
npm test
```

Current test result:

```text
Test Files: 2 passed
Tests:      8 passed
```

## Code Quality

### API Type Check

```bash
cd apps/api
npm run typecheck
```

### API Build

```bash
npm run build
```

### Frontend Lint

```bash
cd apps/web
npm run lint
```

### Frontend Build

```bash
npm run build
```

## Continuous Integration

GitHub Actions runs automatically on pushes and pull requests targeting the `main` branch.

The CI pipeline performs:

1. Repository checkout
2. Node.js 22 setup
3. Dependency installation
4. PostgreSQL service startup
5. Prisma Client generation
6. Database migration deployment
7. API type checking
8. API testing
9. API production build
10. Frontend linting
11. Frontend production build

Workflow file:

```text
.github/workflows/ci.yml
```

## Validation and Error Handling

The backend uses Zod for request validation and centralized Express error handling.

Supported validation includes:

- Lead name validation
- Email format validation
- Lead status validation
- Unique email enforcement
- Duplicate email error handling
- Consistent API error responses

The frontend also provides:

- Loading states
- Empty states
- Success feedback
- Error feedback
- Duplicate email feedback
- Disabled submit state while requests are processing

## Security

The backend includes practical security controls for an MVP:

- Helmet security headers
- Configurable CORS
- Rate limiting
- Request body size limits
- Environment-based configuration
- Database uniqueness constraints
- Server-side input validation

## Database Design

The `Lead` model contains:

- `id` — UUID primary key
- `name`
- `email` — unique
- `status`
- `createdAt`
- `updatedAt`

Indexes are included on status and creation date.

## Design Decisions

### Monorepo

The frontend and backend are maintained in a single npm workspace.

This simplifies:

- Dependency installation
- Docker builds
- CI configuration
- Repository management

### Separate Backend API

The Next.js application does not communicate directly with PostgreSQL.

All lead operations pass through the Express API so validation and business rules remain centralized.

### PostgreSQL and Prisma

PostgreSQL provides durable relational storage while Prisma provides type-safe database access and versioned migrations.

### Docker Compose

Docker Compose provides a repeatable development environment and allows the full application to start with one command.

## Trade-offs

This project focuses on the requested MVP scope.

The following features are intentionally not included:

- Authentication
- User accounts
- Edit leads
- Delete leads
- Search
- Filtering
- Sorting
- Pagination
- Analytics
- Lead notes
- Multi-user lead assignment

## Future Improvements

Possible improvements include:

- Authentication and role-based access control
- Edit and delete lead functionality
- Search and filtering
- Sorting and pagination
- Lead ownership and assignment
- Notes and activity history
- Pipeline analytics
- Dashboard reporting
- Frontend unit tests
- End-to-end tests
- Dedicated isolated test database
- Structured logging
- Monitoring and observability
- OpenAPI / Swagger documentation
- Cloud deployment
- Managed PostgreSQL database

## Author

**Olayenikan Michael**  
Full-Stack Developer | Backend Developer | DevOps Engineer  
Lagos, Nigeria

GitHub: [poundsmichaelscode](https://github.com/poundsmichaelscode)

---

Built as a technical assessment submission for **Quovoy**.
EOF

