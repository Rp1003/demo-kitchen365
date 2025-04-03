# Demo Kitchen365 

A full-stack application for managing restaurant operations, built with Next.js (Frontend), Nest.js (Backend), and PostgreSQL (Database).

## Project Structure

```
demo-kitchen365/
├── backend/           # Nest.js backend application
│   ├── src/          # Source code
│   ├── test/         # Test files
│   ├── .env          # Environment variables
│   └── docker-compose.yml  # Docker configuration
└── frontend-ui/      # Next.js frontend application
    ├── src/          # Source code
    ├── public/       # Static assets
    └── next.config.ts # Next.js configuration
```

## Tech Stack

### Backend
- Nest.js (Node.js framework)
- TypeORM (Database ORM)
- PostgreSQL (Database)
- JWT Authentication
- Swagger (API Documentation)
- Jest (Testing)

### Frontend
- Next.js 15
- React 19
- Ant Design (UI Components)
- TailwindCSS (Styling)
- TypeScript

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd demo-kitchen365
```

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Start PostgreSQL with Docker:
```bash
docker-compose up -d
```

4. Install dependencies and start the backend:
```bash
npm install
npm run start:dev
```

The backend will be available at: http://localhost:3000 or http://localhost:1400

### 3. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend-ui
```

2. Install dependencies:
```bash
npm install
```

3. In frontend-ui/src/lib/api.ts file, update the API_URL constant to match your backend port:

4. Start the development server:
```bash
npm run dev

```
The frontend will be available at: http://localhost:3000

## Features

### Backend Features
- RESTful API architecture
- JWT-based authentication
- Role-based access control
- Database migrations
- API documentation with Swagger
- Unit and e2e testing setup

### Frontend Features
- Modern UI with Ant Design
- Responsive design
- Type-safe development with TypeScript
- Optimized performance with Next.js
- TailwindCSS for styling

## Development

### Backend Development
- Run tests: `npm test`
- Lint code: `npm run lint`
- Format code: `npm run format`

### Frontend Development
- Run development server: `npm run dev`
- Build for production: `npm run build`
- Lint code: `npm run lint`

## API Documentation

Once the backend is running, you can access the Swagger documentation at:
http://localhost:3000/api/docs or http://localhost:1400/api/docs

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the UNLICENSED License.