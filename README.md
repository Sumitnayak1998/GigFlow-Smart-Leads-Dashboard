# GigFlow - Smart Leads Dashboard

GigFlow - Smart Leads Dashboard is a full-stack MERN lead management application for sales teams. It includes authentication, role-based access control, lead CRUD, advanced filtering, backend pagination, CSV export, responsive UI, and dark mode.

## Tech Stack

Frontend:

- React.js
- TypeScript
- TailwindCSS
- React Router
- Axios
- Lucide React

Backend:

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcrypt
- Zod

DevOps:

- Docker
- Docker Compose

## Features

- User registration and login
- JWT authentication
- Protected frontend routes
- Password hashing with bcrypt
- Admin and Sales User roles
- Lead CRUD
- Single lead details page
- Filter by status and source
- Debounced search by name or email
- Sort by latest or oldest
- Backend pagination with 10 records per page
- CSV export
- Loading, empty, and error states
- Form validation
- Responsive dashboard UI
- Dark mode support

## Local Setup

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/smart-leads-dashboard
JWT_SECRET=change_this_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Docker

Run from the root folder:

```bash
docker compose up --build
```

Services:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- MongoDB: `localhost:27017`

## API Documentation

Base URL:

```txt
http://localhost:5000/api
```

### Auth

`POST /auth/register`

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "password123",
  "role": "admin"
}
```

`POST /auth/login`

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

### Leads

All lead endpoints require:

```txt
Authorization: Bearer YOUR_TOKEN
```

`GET /leads`

Supported query parameters:

- `status`
- `source`
- `search`
- `sort`
- `page`

Example:

```txt
GET /leads?status=Qualified&source=Instagram&search=Rahul&sort=latest&page=1
```

`POST /leads`

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "status": "Qualified",
  "source": "Instagram"
}
```

`GET /leads/:id`

`PATCH /leads/:id`

```json
{
  "status": "Contacted"
}
```

`DELETE /leads/:id`

Only admin users can delete leads.

`GET /leads/export/csv`

Supports the same filters as `GET /leads`.

## Roles

Admin:

- Create leads
- View leads
- View lead details
- Update leads
- Delete leads
- Export CSV

Sales User:

- Create leads
- View leads
- View lead details
- Update leads
- Export CSV
