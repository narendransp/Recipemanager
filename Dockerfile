# -------------------
# Base image
FROM node:22

# -------------------
# Backend setup
WORKDIR /app/backend

# Copy backend dependency files
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy backend source
COPY backend . 

# Expose backend port (e.g., 5000)
EXPOSE 5000

# -------------------
# Frontend setup
WORKDIR /app/frontend

# Copy frontend dependency files
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend source
COPY frontend .

# Expose frontend dev server port
EXPOSE 5173

# -------------------
# Default command (run both servers)
WORKDIR /app
CMD ["sh", "-c", "cd backend && npm start & cd frontend && npm run dev -- --host --port 5173"]
