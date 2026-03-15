FROM node:20-alpine

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy application source code
COPY src/ ./src/

# Expose port (default 3000)
EXPOSE 3000

# Run the app
CMD ["node", "src/index.js"]
