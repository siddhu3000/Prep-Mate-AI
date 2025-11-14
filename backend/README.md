# AI Interview Prep Platform - Backend

## Setup

1. **Clone the repo and enter backend directory:**
   ```
   git clone <repo-url>
   cd backend
   ```

2. **Create `.env` file:**
   ```
   cp env.example .env
   ```
   Fill in your OpenAI API key, JWT secret, and MongoDB URI.

3. **Run MongoDB (local or Atlas).**

4. **Build and run:**
   ```
   mvn clean install
   mvn spring-boot:run
   ```

5. **API runs at `http://localhost:8080`**

## API Endpoints

- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login, returns JWT
- `GET /api/auth/profile` — Get user profile (JWT required)
- `POST /api/questions/generate` — Generate questions (JWT required)
- `POST /api/feedback/get` — Get feedback (JWT required)
- `POST /api/sessions/save` — Save session (JWT required)
- `GET /api/sessions/history` — Get session history (JWT required)

## Testing

### Example curl commands:

```sh
# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"testpass"}'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}'

# Use the returned token for further requests:
TOKEN="your_jwt_token_here"

# Generate questions
curl -X POST http://localhost:8080/api/questions/generate \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"domain":"DSA"}'

# Get feedback
curl -X POST http://localhost:8080/api/feedback/get \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"questions":["What is a binary tree?"],"answers":["A tree data structure"]}'

# Save session
curl -X POST http://localhost:8080/api/sessions/save \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"domain":"DSA","questions":["Q1"],"answers":["A1"],"feedback":["F1"]}'

# Get session history
curl -X GET http://localhost:8080/api/sessions/history \
  -H "Authorization: Bearer $TOKEN"
```

## Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key
- `JWT_SECRET` - Secret for JWT token signing
- `MONGODB_URI` - MongoDB connection string

## Features

- User authentication with JWT
- Question generation using OpenAI
- Feedback generation using OpenAI
- Session history management
- Modular architecture for easy maintenance 