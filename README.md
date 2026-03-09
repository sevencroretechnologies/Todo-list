# Todo List - Full Stack Application

A full-stack To-Do List application built with **React** (frontend) and **Laravel** (backend API).

## Features

- User Authentication (Login/Register) with Laravel Sanctum
- Create, Edit, Delete Tasks
- Mark tasks as Completed/Pending (toggle)
- Filter tasks by Status and Priority
- Search tasks by title/description
- Server-side Pagination
- Task Priority levels (Low, Medium, High)
- Due Date with overdue indicators
- Due Date Reminders (tasks due within 24 hours)
- Responsive UI with Tailwind CSS
- Data table with sorting capabilities

## Tech Stack

### Backend
- **Framework:** Laravel 10
- **Authentication:** Laravel Sanctum (Token-based)
- **Database:** MySQL
- **API Style:** RESTful

### Frontend
- **Framework:** React 19 (Vite)
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS
- **Data Table:** react-data-table-component
- **Routing:** React Router v7
- **Notifications:** React Toastify

## Project Structure

```
Todo-list/
├── backend/          # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── AuthController.php
│   │   │   │   └── TaskController.php
│   │   │   ├── Requests/
│   │   │   │   ├── RegisterRequest.php
│   │   │   │   ├── LoginRequest.php
│   │   │   │   └── TaskRequest.php
│   │   │   └── Resources/
│   │   │       └── TaskResource.php
│   │   └── Models/
│   │       ├── User.php
│   │       └── Task.php
│   ├── database/migrations/
│   ├── routes/api.php
│   └── ...
├── frontend/         # React App
│   ├── src/
│   │   ├── api/          # Axios API layer
│   │   ├── context/      # Auth context
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   └── App.jsx
│   └── ...
└── README.md
```

## Database Schema

### Users Table
| Column | Type | Description |
|--------|------|-------------|
| id | BigInt (PK) | Auto-increment |
| name | String | User's full name |
| email | String (Unique) | User's email |
| password | String | Hashed password |
| created_at | Timestamp | Creation date |
| updated_at | Timestamp | Last update |

### Tasks Table
| Column | Type | Description |
|--------|------|-------------|
| id | BigInt (PK) | Auto-increment |
| user_id | BigInt (FK) | References users.id |
| title | String | Task title |
| description | Text (Nullable) | Task description |
| priority | Enum | Low, Medium, High |
| status | Enum | Pending, Completed |
| due_date | Date (Nullable) | Task due date |
| created_at | Timestamp | Creation date |
| updated_at | Timestamp | Last update |

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register a new user |
| POST | `/api/login` | Login and get token |
| POST | `/api/logout` | Logout (revoke token) |
| GET | `/api/user` | Get authenticated user |

### Tasks (Protected - requires Bearer token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List tasks (paginated, filterable, searchable) |
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks/{id}` | Get a single task |
| PUT | `/api/tasks/{id}` | Update a task |
| PATCH | `/api/tasks/{id}/toggle` | Toggle task status |
| DELETE | `/api/tasks/{id}` | Delete a task |
| GET | `/api/tasks/reminders` | Get tasks due within 24 hours |

### Task List Query Parameters
| Parameter | Values | Description |
|-----------|--------|-------------|
| status | Pending, Completed | Filter by status |
| priority | Low, Medium, High | Filter by priority |
| search | string | Search in title/description |
| sort_by | title, priority, status, due_date, created_at | Sort field |
| sort_order | asc, desc | Sort direction |
| per_page | number | Items per page (default: 10) |
| page | number | Page number |

## Setup Instructions

### Backend Setup
```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
# Configure your MySQL database in .env
php artisan migrate
php artisan serve
```

### Frontend Setup
```bash
cd frontend
npm install
# Configure API URL in .env
npm run dev
```

### Environment Variables

**Backend (.env):**
- `DB_CONNECTION=mysql`
- `DB_HOST=127.0.0.1`
- `DB_PORT=3306`
- `DB_DATABASE=todo_list`
- `DB_USERNAME=root`
- `DB_PASSWORD=`

**Frontend (.env):**
- `VITE_API_URL=http://localhost:8000/api`
