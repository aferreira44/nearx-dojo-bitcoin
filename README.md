# Bitcoin Block Explorer

A modern block explorer for Bitcoin nodes running in regtest mode. This application allows you to explore blocks, transactions, and wallet balances through a clean and intuitive interface.

## Tech Stack

### Frontend

- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS + DaisyUI for styling
- React Router for navigation

### Backend

- Go with GraphQL (gqlgen)
- Bitcoin Core RPC integration

### Infrastructure

- Docker & Docker Compose for containerization
- Nginx for production serving
- Air for Go hot-reloading in development

## Prerequisites

- Docker and Docker Compose
- Bitcoin Core node running in regtest mode
- Node.js 20+ (if developing locally)
- Go 1.23+ (if developing locally)

## Start the application

```bash
docker compose up -d
```

The application will be available at:

- Frontend: http://localhost:5173
- GraphQL Playground: http://localhost:8080/graphql
- GraphQL API: http://localhost:8080/query

## Features

- [ ] Check wallet balance by address
- [ ] View latest blocks
- [ ] Search blocks by number
- [ ] Search transactions by hash

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

[MIT](LICENSE)
