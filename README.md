# The Great Gnawa Evening API

A production-ready REST API built with Node.js, Express, and PostgreSQL
for managing a cultural event featuring Gnawa musical heritage.

------------------------------------------------------------------------

## 🎯 Features

-   **Event Management**: Fetch event details\
-   **Artist Management**: CRUD operations for performing artists\
-   **Booking System**: Create and retrieve ticket bookings with
    auto-generated confirmation codes\
-   **Admin Authentication**: JWT-based admin routes (optional)\
-   **Sequelize ORM**: PostgreSQL database with migrations and seeders\
-   **Comprehensive Validation**: Input sanitization and error handling\
-   **CORS & Security**: Production-ready configuration

------------------------------------------------------------------------

## 🛠 Tech Stack

-   **Runtime**: Node.js\
-   **Framework**: Express.js\
-   **Database**: PostgreSQL 12+\
-   **ORM**: Sequelize 6.x\
-   **Authentication**: JWT + Bcrypt\
-   **Validation**: Express Validator\
-   **Environment**: Dotenv\
-   **Development**: Nodemon

------------------------------------------------------------------------

## 📋 Prerequisites

-   Node.js 16+ installed\
-   PostgreSQL 12+ running locally or remote\
-   npm or yarn package manager

------------------------------------------------------------------------

## 🔧 Installation

### 1. Clone & Setup

``` bash
git clone <your-repo-url>
cd gnawa-api
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

``` env
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gnawa_dev
DB_USER=postgres
DB_PASS=your_password

# Admin Authentication (Optional)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=$2b$10$YourHashedPasswordHere

# Production Database URL (Optional)
# DATABASE_URL=postgres://user:pass@host:5432/dbname
```

### 3. Database Setup

``` bash
createdb gnawa_dev
npm run migrate
npm run seed
```

### 4. Start Development Server

``` bash
npm run dev
```

Server runs at: `http://localhost:3000`

### 5. Production Deployment

``` bash
export NODE_ENV=production
export DATABASE_URL=postgres://user:pass@host:5432/dbname
npm start
```
------------------------------------------------------------------------

## UML Class Diagram

![TGGE UML Class Diagram](./assets/UML.svg)

[📥 Download UML Diagram](./assets/UML.drawio)

------------------------------------------------------------------------

## 📡 API Endpoints

### Public Routes

  Method   Endpoint                     Description                         Auth
  -------- ---------------------------- ----------------------------------- ------
  GET      /api/event                   Get event information               No
  GET      /api/artists                 Get all artists (optional search)   No
  GET      /api/artists/:id             Get artist by ID                    No
  POST     /api/bookings                Create booking                      No
  GET      /api/bookings/:code          Get booking by code                 No
  GET      /api/bookings/email/:email   Get bookings by email               No

### Admin Routes (Protected)

  Method   Endpoint           Description
  -------- ------------------ ---------------
  POST     /api/auth/login    Admin login
  POST     /api/artists       Create artist
  PUT      /api/artists/:id   Update artist
  DELETE   /api/artists/:id   Delete artist

------------------------------------------------------------------------

## 🔐 Admin Authentication

### Login Example

``` http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "your_password"
}
```

Response:

``` json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

Use token:

    Authorization: Bearer JWT_TOKEN

------------------------------------------------------------------------

## 📊 Request / Response Examples

### Create Booking

``` http
POST /api/bookings
Content-Type: application/json

{
  "email": "user@example.com",
  "full_name": "John Doe",
  "phone": "+212600000000",
  "ticket_count": 2
}
```

Response:

``` json
{
  "message": "Booking created successfully",
  "booking": {
    "confirmation_code": "GNW-A7K2P"
  }
}
```

### Search Artists

``` http
GET /api/artists?search=Maalem
```

------------------------------------------------------------------------

## 🗂 Project Structure

``` text
gnawa-api/
├── controllers/
├── middleware/
├── migrations/
├── models/
├── routes/
├── seeders/
├── config/
├── server.js
└── package.json
```

------------------------------------------------------------------------

## 🚀 Available Scripts

  Script            Description
  ----------------- -------------------
  npm start         Start production
  npm run dev       Start development
  npm run migrate   Run migrations
  npm run seed      Seed database

------------------------------------------------------------------------

## 🐛 Troubleshooting

-   Missing createdAt column → enable `underscored: true`
-   confirmation_code null → use `beforeValidate`
-   DB errors → check PostgreSQL & `.env`

------------------------------------------------------------------------

## 📮 Postman Collection

A full Postman collection is included in this README for testing all
endpoints.

------------------------------------------------------------------------

## 👨‍💻 Author

Marouane akrich --- Full Stack Developer

------------------------------------------------------------------------

## 🙏 Acknowledgments

Gnawa music community of Agadir
