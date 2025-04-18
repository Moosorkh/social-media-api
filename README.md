# Social Media API

A RESTful API for exercise tracking with authentication and social features, built with **NestJS** and **Prisma**.

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-blue)](https://github.com/Moosorkh/prehab-api)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Setup](#environment-setup)
  - [Running with Docker (Recommended)](#running-with-docker-recommended)
  - [Local Development](#local-development)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Implemented Requirements](#implemented-requirements)

---

## Features

- 🔐 JWT-based authentication (register, login, token refresh)
- 🏋️ Exercise CRUD operations (create, read, update, delete)
  - Public/private visibility with access control
  - Filtering and sorting
- ❤️ Social features:
  - Favorite / Unfavorite
  - Save / Unsave
  - Rate exercises (1–5)
  - Combined favorites and saves list
- 🗃️ Database migrations and seeding (Prisma)
- 📄 Swagger API documentation
- 🐳 Docker containerization
- ✅ Unit and E2E tests

---

## Tech Stack

- **Backend**: NestJS + TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Documentation**: Swagger / OpenAPI
- **Testing**: Jest
- **Containerization**: Docker

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 7+
- Docker + Docker Compose
- PostgreSQL (for local development)

---

### Environment Setup

Create a `.env` file in the root directory: 

```env
# Database
DATABASE_URL="postgresql://postgres:yourdbpassword@localhost:5432/prehab_db"

# JWT
JWT_SECRET="your_very_secure_jwt_secret"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_EXPIRES_IN="30d"

# App
PORT=3000
```
Alternatively, run:
```bash
cp .env.example .env
```
To populate `.env` file based on the provided `.env.example`

---

### Running with Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/Moosorkh/prehab-api.git
cd prehab-api
```

2. Build and start the containers:
```bash
docker compose build --no-cache
docker compose up
```

3. API will be available at:  
   [http://localhost:3000](http://localhost:3000)

4. Swagger docs at:  
   [http://localhost:3000/api](http://localhost:3000/api)

---

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/Moosorkh/prehab-api.git
cd prehab-api
```

2. Install dependencies:
```bash
npm install
```

3. Generate Prisma client:
```bash
npx prisma generate
```

4. Run migrations:
```bash
npx prisma migrate dev
```

5. Seed the database:
```bash
npx prisma db seed
```

6. Build the app:
```bash
npm run build
```

7. Start the app:
```bash
npm run start
```
Or for development:
```bash
npm run start:dev
```

---

## Testing

### Run Unit Tests
```bash
npm run test
```

### Run E2E Tests
```bash
npm run test:e2e
```

---

## API Documentation

Interactive Swagger UI available at:  
[http://localhost:3000/api](http://localhost:3000/api)

---

## Project Structure

```bash
prehab-api/
├── prisma/                # Database schema and migrations
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── auth/              # Auth module
│   ├── common/            # Shared utilities
│   ├── exercises/         # Exercises module
│   ├── favorites/         # Favorites module
│   ├── prisma/            # Prisma service
│   ├── ratings/           # Ratings module
│   ├── saves/             # Saves module
│   ├── users/             # Users module
│   ├── app.module.ts
│   └── main.ts
├── test/                  # E2E tests
├── .env                   # Environment config
├── Dockerfile             # Docker setup
├── docker-compose.yaml    # Docker Compose config
└── package.json           # Scripts and dependencies
```

---

## Database Schema

- **User**: credentials and relations
- **Exercise**: exercise data and creator relation
- **Favorite**: user-exercise relation
- **Save**: user-exercise save relation
- **Rating**: user ratings for exercises

---

## Implemented Requirements

```bash
✅ JWT-based authentication
✅ Exercise CRUD
✅ Public/private visibility
✅ Filtering & sorting
✅ Favorite/unfavorite
✅ Save/unsave
✅ Exercise rating
✅ Combined list (favorites & saves)
✅ DB indexing
✅ Unit tests
✅ Swagger API docs
✅ Database migrations
```
