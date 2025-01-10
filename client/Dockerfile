# Development stage
FROM node:20-alpine as development

WORKDIR /app

# Install pnpm for better performance
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package*.json ./

# Create node_modules directory and set permissions
RUN mkdir -p node_modules && chown -R node:node .

# Switch to non-root user
USER node

# Install dependencies
RUN pnpm install

# Expose Vite's default port
EXPOSE 5173

# Development command
CMD ["pnpm", "dev", "--host"]

# Build stage
FROM node:20-alpine as builder

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package*.json ./

RUN pnpm install
COPY . .
RUN pnpm build

# Production stage
FROM nginx:alpine-slim as production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]