# Campus Marketplace

Campus Marketplace is a separated full-stack web application for university students to browse, create, edit, and delete marketplace listings. The main goal of the project is to learn how APIs work in production-style applications, with a clear frontend, backend, and database split.

## Project Overview

This app lets students post items they want to sell or share with other students. Users can browse listings freely, but only authenticated users can create listings. A user can edit or delete only their own listings.

The project is intentionally designed to help understand the full API request lifecycle:

Frontend -> API Request -> Backend Route -> Controller Logic -> Database Query -> API Response -> Frontend Update

## Tech Stack

Frontend:
- React
- Vite
- React Router
- Fetch API or Axios

Backend:
- Node.js
- Express.js

Database:
- PostgreSQL

Authentication:
- JWT authentication

## Features

- User registration and login
- JWT-based authentication and protected routes
- Browse all listings
- View a single listing
- Create a listing
- Edit own listing
- Delete own listing
- Search listings by keyword
- Filter by category
- Sort by newest or price
- Ownership checks so only the listing owner can update or delete it
- Validation and error handling on the backend

## Short API Summary

Authentication routes:
- `POST /api/auth/register` - create a new account
- `POST /api/auth/login` - log in and receive a JWT
- `GET /api/auth/me` - get the current authenticated user

Listing routes:
- `GET /api/listings` - get all listings
- `GET /api/listings/:id` - get one listing
- `POST /api/listings` - create a listing
- `PATCH /api/listings/:id` - update a listing
- `DELETE /api/listings/:id` - delete a listing

## Learning Focus

This project is mainly about understanding:
- REST API design
- HTTP methods like GET, POST, PATCH, and DELETE
- Middleware
- Authentication and authorization
- Database relationships
- Separation of concerns
- API security basics

## Project Structure Goal

The backend is intended to follow a clean structure like:

```text
src/
├── routes/
├── controllers/
├── middleware/
├── models/
├── database/
├── utils/
└── server.js
```

For the full design notes, see [docs/DESIGN.md](docs/DESIGN.md).
