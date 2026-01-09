# Vehicle Rental Management System

A full-stack MERN application for managing vehicle rentals, bookings, and users.  

---

## Features

- User registration and login using JWT authentication
- Role-based access control (admin and standard user)
- Admin users can add and delete cars
- Users can book and cancel car rentals
- Total cost calculation based on rental duration
- Real-time booking updates using WebSockets (Socket.IO)
- MongoDB persistent data storage
- Fully containerised using Docker Compose

---

## Technology Stack

### Frontend
- React
- Axios
- Socket.IO Client

### Backend
- Node.js
- Express
- Mongoose
- JWT Authentication
- bcryptjs
- Socket.IO

### Database
- MongoDB

### Infrastructure
- Docker
- Docker Compose

---

## Prerequisites

You must have installed:

- Docker Desktop
- Docker Compose
- Git

Verify with:

    docker --version
    docker compose version
    git --version

---

## Installation

Clone the repository:

    git clone https://github.com/YOUR_USERNAME/vehicle-rental-system.git
    cd vehicle-rental-system

---

## Running the System

From the project root, run:

    docker compose up --build

This will start:
- Frontend on http://localhost
- Backend API on http://localhost:5001
- MongoDB on port 27017

To stop the system:

    docker compose down

---

## Usage

1. Open http://localhost in your browser
2. Register a user account
3. The first registered user becomes admin automatically
4. Login using your credentials
5. Admins can add and delete cars
6. Users can book available cars and cancel bookings

---

## API Endpoints

### Authentication
- POST /auth/register  
- POST /auth/login  
- GET /auth/me  

### Cars
- GET /cars (public)  
- POST /cars (admin only)  
- DELETE /cars/:id (admin only)  

### Bookings
- GET /bookings (authenticated users)  
- POST /bookings (authenticated users)  
- DELETE /bookings/:id (authenticated users)  

---

## Environment Variables

These are configured inside Docker Compose:

- MONGO_URI = mongodb://mongo:27017/car_rental  
- JWT_SECRET = secret  

---

## Development Notes

- Live reload is enabled via bind mounts in Docker Compose
- WebSockets are used to update bookings across clients in real time
- JWT tokens are stored in localStorage on the client
- Passwords are hashed using bcrypt

---

## Testing and CI/CD

Unit and integration testing will be implemented using Jest and Supertest.

CI/CD will be configured using GitHub Actions to:
- Install dependencies
- Run tests
- Build Docker images

---

## Author

Christopher Moore  
University of Kent — COMP-3006

---

## License

This project is for academic use only.
