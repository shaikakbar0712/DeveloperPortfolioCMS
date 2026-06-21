# Developer Portfolio CMS

A full-stack developer portfolio management system built with React + Spring Boot.

## Tech Stack
- **Frontend:** React 18, React Router v6, Axios, CSS
- **Backend:** Spring Boot 3.2, Spring Data JPA, H2 (in-memory), Maven

## Quick Start

### Backend
```bash
cd backend
mvn spring-boot:run
```
Runs on http://localhost:8080

### Frontend
```bash
cd frontend
npm install
npm start
```
Runs on http://localhost:3000

## Sample Login
After starting the backend, a sample user is pre-loaded:
- **Email:** alex@example.com
- **Password:** password123

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/users/register | Register |
| POST | /api/users/login | Login |
| GET | /api/users/{id} | Get user |
| POST | /api/users/{id}/resume | Upload resume |
| GET/POST | /api/projects/user/{userId} | Projects |
| PUT/DELETE | /api/projects/{id} | Update/Delete project |
| GET/POST | /api/skills/user/{userId} | Skills |
| PUT/DELETE | /api/skills/{id} | Update/Delete skill |
| GET/POST | /api/certifications/user/{userId} | Certifications |
| PUT/DELETE | /api/certifications/{id} | Update/Delete cert |
| GET/POST | /api/social-links/user/{userId} | Social Links |
| PUT/DELETE | /api/social-links/{id} | Update/Delete link |
| GET | /api/portfolio/{userId} | Public portfolio data |

## H2 Console
http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:portfoliodb`
- Username: `sa`
- Password: (empty)

## Features
- User registration & login
- CRUD for Projects, Skills, Certifications, Social Links
- Resume PDF upload (stored in `/uploads`)
- Public portfolio page at `/portfolio/{userId}`
- Responsive UI
