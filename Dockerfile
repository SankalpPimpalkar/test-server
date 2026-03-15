FROM node:20-alpine

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./
RUN npm install

# Copy application source code
COPY . .

# Expose port (default 3000)
EXPOSE 5050

# Run the app
CMD ["node", "src/index.js"]
