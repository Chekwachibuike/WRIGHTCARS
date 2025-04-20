# RightCars Backend API

A TypeScript-based backend API for the RightCars application with user authentication, 2FA, and role-based access control.

## Features

- User authentication with JWT
- Two-factor authentication (2FA) with OTP
- Role-based access control (admin, worker, user)
- User management (CRUD operations)
- Swagger API documentation
- PostgreSQL database with Sequelize ORM
- Secure password hashing with Argon2

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=5450
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=rightcars_db
JWT_SECRET=your_jwt_secret
```

4. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5450`

## API Documentation

Swagger documentation is available at `/api-docs` when the server is running.

### Authentication Endpoints

#### Login
```http
POST /api/v1/auth/login
```
Request body:
```json
{
  "emailAddress": "user@example.com",
  "password": "password123"
}
```
Response:
```json
{
  "data": {
    "accessToken": "jwt_token",
    "id": 1,
    "name": "John Doe",
    "emailAddress": "user@example.com",
    "phoneNumber": "12345678901",
    "role": "user",
    "is2FAEnabled": false
  }
}
```

If 2FA is enabled, the response will include:
```json
{
  "message": "OTP sent successfully",
  "requires2FA": true,
  "otp": "123456"
}
```

### 2FA Endpoints

#### Enable 2FA
```http
POST /api/v1/2fa/enable
```
Request body:
```json
{
  "emailAddress": "user@example.com"
}
```

#### Verify 2FA Setup
```http
POST /api/v1/2fa/verify
```
Request body:
```json
{
  "emailAddress": "user@example.com",
  "code": "123456"
}
```

#### Verify Login OTP
```http
POST /api/v1/2fa/verify-login
```
Request body:
```json
{
  "emailAddress": "user@example.com",
  "code": "123456"
}
```

### User Management Endpoints

#### Create User
```http
POST /api/v1/users/create
```
Request body:
```json
{
  "name": "John Doe",
  "emailAddress": "user@example.com",
  "phoneNumber": "12345678901",
  "password": "Password@123",
  "role": "user"
}
```

#### Get User by ID
```http
GET /api/v1/users/:id
```

#### Update User
```http
PUT /api/v1/users/:id
```
Request body:
```json
{
  "name": "John Doe Updated",
  "phoneNumber": "12345678902"
}
```

#### Delete User
```http
DELETE /api/v1/users/:id
```

## Error Handling

The API uses a consistent error response format:
```json
{
  "message": "Error message",
  "statusCode": 400,
  "errorCode": "ERROR_CODE"
}
```

## Security Features

1. Password Requirements:
   - Minimum 8 characters
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one number
   - At least one special character (!@#$%^&*)

2. 2FA Implementation:
   - 6-digit OTP
   - 5-minute expiration
   - Single-use codes
   - Automatic cleanup of expired/used OTPs

3. JWT Authentication:
   - Token-based authentication
   - Secure token signing
   - Token expiration handling

## Frontend Integration Notes

1. Authentication Flow:
   - Implement login with email/password
   - Check response for `requires2FA` flag
   - If 2FA is required, prompt for OTP
   - Store JWT token in secure storage (e.g., HttpOnly cookies)

2. Error Handling:
   - Handle 401 (Unauthorized) by redirecting to login
   - Handle 403 (Forbidden) by showing appropriate message
   - Handle 400 (Bad Request) by displaying validation errors

3. 2FA Implementation:
   - Implement OTP input UI
   - Handle OTP expiration
   - Provide resend OTP option
   - Show appropriate error messages

## Development

### Project Structure
```
server/
├── src/
│   ├── database/
│   │   ├── config/
│   │   ├── models/
│   │   └── repository/
│   ├── middleware/
│   ├── routes/
│   │   └── v1/
│   ├── utils/
│   └── validationSchema/
```

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build the project
- `npm start`: Start production server
- `npm test`: Run tests

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request 