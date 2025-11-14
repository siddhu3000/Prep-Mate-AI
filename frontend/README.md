# AI Interview Prep Platform - Frontend

## Setup

1. **Clone the repo and enter frontend directory:**
   ```
   git clone <repo-url>
   cd frontend
   ```

2. **Create `.env` file:**
   ```
   cp env.example .env
   ```
   Set the backend API base URL if needed.

3. **Install dependencies:**
   ```
   npm install
   ```

4. **Run the app:**
   ```
   npm start
   ```

5. **App runs at `http://localhost:3000`**

## Features

- Login/Register pages
- Domain selection (DSA, Web, DBMS, OS)
- Question/Answer interface
- AI-generated feedback display
- Session history viewing
- JWT-based authentication
- Clean, functional UI

## Environment Variables

- `REACT_APP_API_BASE_URL` - Backend API base URL (default: http://localhost:8080)

## Pages

- `/login` - User login
- `/register` - User registration
- `/` - Domain selection (protected)
- `/interview` - Question answering (protected)
- `/feedback` - AI feedback display (protected)
- `/history` - Session history (protected)

## Notes

- Requires backend running at `REACT_APP_API_BASE_URL`
- Minimal styling for clarity and learning
- Modular components for easy maintenance 