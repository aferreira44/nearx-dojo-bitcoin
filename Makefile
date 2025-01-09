generate:
	@cd server && go run github.com/99designs/gqlgen generate
	@echo "✅ Generated GraphQL schema successfully"
