# AI Interview Prep Platform

A full-stack AI-powered interview preparation platform with Spring Boot backend and React frontend.

## Features

- **User Authentication**: JWT-based authentication with secure password hashing
- **Question Generation**: AI-powered question generation using OpenAI for different domains (DSA, Web, DBMS, OS)
- **Answer Submission**: User-friendly interface for submitting answers to generated questions
- **AI Feedback**: Intelligent feedback generation using OpenAI for each submitted answer
- **Session History**: Complete session tracking with questions, answers, and feedback
- **Modular Architecture**: Clean separation of concerns for easy maintenance and feature removal

## Tech Stack

### Backend
- **Java Spring Boot 3.2.5** with Maven
- **Spring Security** for authentication
- **Spring Data MongoDB** for database operations
- **Spring AI** for OpenAI integration
- **JWT** for token-based authentication
- **MongoDB** for data storage
- **Lombok** for reducing boilerplate code

### Frontend
- **React 18** with functional components
- **React Router** for navigation
- **Context API** for state management
- **Axios** for API communication
- **Clean, minimal UI** for learning purposes

## Quick Start

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- MongoDB (local or Atlas)
- OpenAI API key

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create environment file:**
   ```bash
   cp env.example .env
   ```

3. **Configure environment variables in `.env`:**
   ```env
   OPENAI_API_KEY="sk-xxxx..." # Your OpenAI API Key
   JWT_SECRET="your_jwt_secret_here" # JWT signing secret
   MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/dbname" # MongoDB URI
   ```

4. **Build and run:**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

5. **Backend runs at `http://localhost:8080`**

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Create environment file:**
   ```bash
   cp env.example .env
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the app:**
   ```bash
   npm start
   ```

5. **Frontend runs at `http://localhost:3000`**

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user (returns JWT)
- `GET /api/auth/profile` - Get user profile (JWT required)

### Questions & Feedback
- `POST /api/questions/generate` - Generate questions for domain (JWT required)
- `POST /api/feedback/get` - Get AI feedback for answers (JWT required)

### Sessions
- `POST /api/sessions/save` - Save interview session (JWT required)
- `GET /api/sessions/history` - Get user's session history (JWT required)

## Testing

### Backend Testing
```bash
cd backend
mvn test
```

### API Testing with curl
```bash
# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"testpass"}'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}'

# Generate questions (use token from login)
curl -X POST http://localhost:8080/api/questions/generate \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"domain":"DSA"}'
```

## Project Structure

```
├── backend/
│   ├── src/main/java/com/aiinterviewprep/
│   │   ├── config/          # Environment configuration
│   │   ├── controller/      # REST controllers
│   │   ├── model/          # Data models
│   │   ├── repository/     # MongoDB repositories
│   │   ├── security/       # JWT and security config
│   │   └── service/        # Business logic
│   ├── src/main/resources/
│   │   └── prompts/        # AI prompts
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── api/           # API configuration
│   │   ├── auth/          # Authentication context
│   │   ├── components/    # Reusable components
│   │   └── pages/         # Page components
│   └── package.json
└── README.md
```

## Environment Variables

### Backend (.env)
- `OPENAI_API_KEY` - OpenAI API key for question/feedback generation
- `JWT_SECRET` - Secret for JWT token signing
- `MONGODB_URI` - MongoDB connection string

### Frontend (.env)
- `REACT_APP_API_BASE_URL` - Backend API base URL

## Features Overview

1. **User Registration/Login**: Secure authentication with JWT tokens
2. **Domain Selection**: Choose from DSA, Web, DBMS, or OS
3. **AI Question Generation**: Domain-specific questions using OpenAI
4. **Answer Submission**: User-friendly form for submitting answers
5. **AI Feedback**: Intelligent feedback on each answer
6. **Session Management**: Complete history of all interview sessions
7. **Modular Design**: Each feature can be removed independently

## Development

The platform is designed with modularity in mind. Each feature (auth, questions, feedback, sessions) is implemented in separate controllers and services, making it easy to:

- Remove features without affecting others
- Add new features independently
- Test individual components
- Maintain clean, readable code

## License

This project is for educational purposes. Feel free to use and modify as needed. 
