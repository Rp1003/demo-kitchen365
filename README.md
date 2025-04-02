# Product Catalog Application

A full-stack application for managing a product catalog, built with Next.js (Frontend), Nest.js (Backend), and PostgreSQL (Database).

## Project Structure

```
product-catalog/
├── backend/           # Nest.js backend application
└── frontend/          # Next.js frontend application
```

## Prerequisites

- Node.js (v16+)
- Docker and Docker Compose
- npm or yarn

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd product-catalog
```

### 2. Start PostgreSQL with Docker

```bash
cd backend
docker-compose up -d
```

This will start PostgreSQL on port 5432 with the following credentials:
- Username: postgres
- Password: postgres
- Database: product_catalog

### 3. Setup and run the Backend

```bash
cd backend
npm install
npm run start:dev
```

The backend will be available at: http://localhost:3001

### 4. Setup and run the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at: http://localhost:3000

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

## Features

- View all products in a responsive grid layout
- Add new products with form validation
- Delete products with confirmation dialog
- Error handling and loading states

## Bonus Features Implementation

For bonus features like JWT authentication and search/filter functionality, check out the `bonus-features` branch.

## Technology Stack

- **Frontend**:
  - Next.js (React framework)
  - TypeScript
  - Tailwind CSS for styling
  
- **Backend**:
  - Nest.js (Node.js framework)
  - TypeORM for database abstraction
  - PostgreSQL for data storage
  - Class-validator for DTO validation

- **DevOps**:
  - Docker for PostgreSQL containerization


  # Product Catalog - Setup and Running Guide

This document provides detailed step-by-step instructions for setting up and running the Product Catalog application.

## Initial Setup

### 1. Clone or Download the Project

First, ensure you have the project files. If you received them as a ZIP file, extract them to a location of your choice.

### 2. Environment Setup

Ensure you have the following installed:
- Node.js (v16 or later)
- npm or yarn
- Docker and Docker Compose

You can check your Node.js and npm versions with:
```bash
node --version
npm --version
```

### 3. Starting the Database

We'll use Docker to run PostgreSQL:

```bash
# Navigate to the backend directory
cd backend

# Start PostgreSQL using Docker Compose
docker-compose up -d
```

This will start a PostgreSQL instance with:
- Port: 5432
- Username: postgres
- Password: postgres
- Database: product_catalog

You can verify the database is running with:
```bash
docker ps
```

You should see a container named something like `backend_postgres_1` running.

### 4. Setting up the Backend

```bash
# Make sure you're in the backend directory
cd backend

# Install dependencies
npm install

# Start the development server
npm run start:dev
```

The backend should now be running at http://localhost:3001

You can test it by opening http://localhost:3001/products in your browser, which should return an empty array `[]` if everything is working correctly.

### 5. Setting up the Frontend

```bash
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend should now be running at http://localhost:3000

## Using the Application

1. Open http://localhost:3000 in your browser
2. You'll see the Product Catalog interface with two main sections:
   - Products list (left/top)
   - Add Product form (right/bottom)
3. Add a few products using the form
4. View and delete products from the main list

## Troubleshooting

### Database Connection Issues

If the backend fails to connect to the database:

1. Make sure Docker is running
2. Check if the PostgreSQL container is running: `docker ps`
3. Verify the database credentials in `backend/src/app.module.ts` match the ones in `docker-compose.yml`

### Frontend Can't Connect to Backend

If the frontend can't connect to the backend:

1. Make sure the backend is running on port 3001
2. Check if CORS is enabled in the backend (`app.enableCors()` in `main.ts`)
3. Verify the API URL in `frontend/src/lib/api.ts` is set to `http://localhost:3001`

### Port Conflicts

If port 3000 or 3001 is already in use:

1. For the backend, you can change the port in `backend/src/main.ts`
2. For the frontend, you can start it on a different port with:
   ```bash
   npm run dev -- -p 3005
   ```
   Replace 3005 with any available port.

## Building for Production

### Backend

```bash
cd backend
npm run build
npm run start:prod
```

### Frontend

```bash
cd frontend
npm run build
npm run start
```

Or you can use a production-ready web server like Nginx to serve the static files from the `frontend/.next` directory.