# Use a small Node.js image
FROM node:18-slim as build

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the rest of the source code
COPY . .

# Final stage
FROM node:18-slim

WORKDIR /app

# Copy from build stage
COPY --from=build /app .

# Set production environment
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# Use non-root user for security
USER node

CMD ["node", "index.js"]
