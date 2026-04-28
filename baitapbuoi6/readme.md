# Student Management API

A Node.js Express application with Mongoose for managing students.

## Features
- CRUD operations for students (with soft delete)
- Pagination and filtering
- Advanced querying (Top students, Average Score, Search by name)
- Input validation & Error handling
- Custom logging middleware

## Setup
1. Ensure MongoDB is running locally or set `MONGODB_URI` in `.env`.
2. Run `npm install`
3. Run `node server.js`

## Endpoints
- `POST /api/students` - Create a student
- `GET /api/students?page=1&limit=10&major=IT` - Get students
- `GET /api/students/top?limit=5` - Top students by score
- `GET /api/students/stats/avg` - Average score of active students
- `GET /api/students/search?q=name` - Search students by name
- `GET /api/students/:id` - Get student by ID
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Soft delete student
- `PATCH /api/students/:id/score` - Update student score only (0-100)
