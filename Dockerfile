# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Install dependencies first for efficient layer caching
COPY package*.json ./
RUN npm ci --omit=dev

# Copy application source code
COPY src ./src

# Create non-root user and assign permissions
RUN chown -R node:node /app
USER node

# Expose microservice port
EXPOSE 3000

# Container healthcheck
HEALTHCHECK --interval=20s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health | grep -q '"status":"UP"' || exit 1

# Start application
CMD ["node", "src/app.js"]
