# Product Application

A full-stack application for managing a products, built with Next.js (Frontend), Nest.js (Backend), and PostgreSQL (Database).

## Project Structure

```
demo-kitchen365/
├── backend/           # Nest.js backend application
└── frontend/          # Next.js frontend application
```

## Prerequisites

- Node.js (v23.10.0)
- Docker and Docker Compose
- npm or yarn

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd demo-kitchen365
```

### 2. Start PostgreSQL with Docker

```bash
cd backend
docker-compose up -d
```

This will start PostgreSQL on port 5432 with the following credentials:
- Username: postgres
- Password: postgres
- Database: demo_kitchen365

### 3. Setup and run the Backend

```bash
cd backend
npm install
npm run start:dev
```

The backend will be available at: http://localhost:3000 or if are you using .env then http://localhost:{process.env.PORT}

After that first go to seed api and create user using http://localhost:{process.env.PORT}/seed/createUser

### 4. Setup and run the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at: http://localhost:3000

Login detail:- 
admin@admin.com 
Admin@123

## API Documentation

### Products Endpoints

- `GET /products` - Get all products
- `POST /products` - Create a new product
- `DELETE /products/:id` - Delete a product by ID

### Request/Response Examples

#### Get all products

Request:
```http
GET /products
```

Response:
```json
[
  {
    "id": "e87e5d38-6b9a-4bf5-a1d5-08f1ac1fbdca",
    "name": "Laptop",
    "price": 999.99,
    "description": "High-performance laptop"
  },
  {
    "id": "a8e5b1c3-9d2e-4f7g-8h9i-0j1k2l3m4n5o",
    "name": "Smartphone",
    "price": 699.99,
    "description": "Latest model smartphone"
  }
]
```

#### Create a product

Request:
```http
POST /products
Content-Type: application/json

{
  "name": "Headphones",
  "price": 129.99,
  "description": "Noise-canceling headphones"
}
```

Response:
```json
{
  "id": "b7c8d9e0-f1g2-h3i4-j5k6-l7m8n9o0p1q2",
  "name": "Headphones",
  "price": 129.99,
  "description": "Noise-canceling headphones"
}
```

#### Delete a product

Request:
```http
DELETE /products/b7c8d9e0-f1g2-h3i4-j5k6-l7m8n9o0p1q2
```

Response:
```
204 No Content
```