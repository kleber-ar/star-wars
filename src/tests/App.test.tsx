// src/tests/App.test.tsx
import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import Home from "../app/page"; // Next 13 App Router
import renderWithRouterAndContext from "./renderWithRouterAndContext";
import "@testing-library/jest-dom";

// Mock global fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        results: [
          { name: "Tatooine", climate: "arid", population: "200000" },
          { name: "Alderaan", climate: "temperate", population: "2000000000" },
        ],
      }),
  }),
) as unknown as typeof fetch;

const mockFetchPlanetsError = () => {
  global.fetch = vi.fn(() =>
    Promise.reject("API falhou"),
  ) as unknown as typeof fetch;
};

describe("App Testes de integração", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("Renderiza a aplicação completa com tabela de planetas", async () => {
    renderWithRouterAndContext(<Home />);

    expect(screen.getByText("Planetas Star Wars")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Tatooine")).toBeInTheDocument();
      expect(screen.getByText("Alderaan")).toBeInTheDocument();
    });
  });

  it("Mostra mensagem de erro quando a API falha", async () => {
    mockFetchPlanetsError(); // força erro
    renderWithRouterAndContext(<Home />);

    await waitFor(() => {
      expect(screen.getByText("Erro ao buscar planetas")).toBeInTheDocument();
    });
  });
});

