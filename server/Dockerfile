# Development stage
FROM golang:1.23-alpine as development

WORKDIR /app

# Install development tools (using the new air repository)
RUN go install github.com/air-verse/air@latest && \
    go install github.com/99designs/gqlgen@latest

# Copy go mod files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code (will be overridden by volume in dev)
COPY . .

# Create .air.toml if it doesn't exist
RUN if [ ! -f .air.toml ]; then \
    echo 'root = "."' > .air.toml && \
    echo 'tmp_dir = "tmp"' >> .air.toml && \
    echo '[build]' >> .air.toml && \
    echo 'cmd = "go build -o ./tmp/main ."' >> .air.toml && \
    echo 'bin = "./tmp/main"' >> .air.toml && \
    echo 'include_ext = ["go", "graphqls"]' >> .air.toml && \
    echo 'exclude_dir = ["tmp", "vendor"]' >> .air.toml; \
    fi

# Expose port
EXPOSE 8080

# Development command (air for hot reload)
CMD ["air"]

# Build stage
FROM golang:1.23-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Production stage
FROM alpine:latest as production

WORKDIR /app
COPY --from=builder /app/main .
COPY --from=builder /app/graph/*.graphqls ./graph/
EXPOSE 8080
CMD ["./main"]