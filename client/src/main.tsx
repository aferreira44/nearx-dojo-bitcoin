import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Criando o cliente Apollo
const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL || "http://localhost:8080/query", // URL do backend GraphQL
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
