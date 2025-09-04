# Job Portal

A full-stack job portal application built with React, TypeScript, Node.js, Express, and MongoDB.

## Tech Stack

### Frontend
- React
- Vite + TypeScript
- Shadcn UI
- Redux Toolkit for state management
- Radix UI
- Framer Motion

### Backend
- Node.js with Express
- MongoDB 
- JWT authentication
- Cloudinary for file uploads
- bcryptjs for password hashing

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/atharva-kakarot/job-portal.git
cd job-portal
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=8000
SECRET_KEY=your_jwt_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

## Running the Application

### Start Backend Server
```bash
cd backend
npm run dev
```

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
