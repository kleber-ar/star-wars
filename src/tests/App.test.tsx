// src/tests/App.test.tsx
import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, screen, waitFor } from "@testing-library/react";
import Home from "../app/page";
import { usePlanets } from "../context/PlanetsContext";
import renderWithRouterAndContext from "./renderWithRouterAndContext";
import "@testing-library/jest-dom";

// Função para mock de fetch com dados
const mockFetchPlanetsSuccess = () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          results: [
            { name: "Tatooine", climate: "arid", population: "200000" },
            {
              name: "Alderaan",
              climate: "temperate",
              population: "2000000000",
            },
            { name: "Naboo", climate: "temperate", population: "4500000000" },
          ],
        }),
    }),
  ) as unknown as typeof fetch;
};

// Função para mock de fetch com erro
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
    mockFetchPlanetsSuccess();
    renderWithRouterAndContext(<Home />);

    expect(screen.getByText("Planetas Star Wars")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Tatooine")).toBeInTheDocument();
      expect(screen.getByText("Alderaan")).toBeInTheDocument();
      expect(screen.getByText("Naboo")).toBeInTheDocument();
    });
  });

  it("Mostra mensagem de erro quando a API falha", async () => {
    mockFetchPlanetsError();
    renderWithRouterAndContext(<Home />);

    await waitFor(() => {
      expect(screen.getByText("Erro ao buscar planetas")).toBeInTheDocument();
    });
  });

  it("Filtra os planetas pelo input e reseta corretamente", async () => {
    mockFetchPlanetsSuccess();
    const { user } = renderWithRouterAndContext(<Home />);

    const input = screen.getByPlaceholderText(/Filtrar planetas/i);

    // Digita "oo" → Tatooine e Naboo aparecem
    await user.type(input, "oo");
    await waitFor(() => {
      expect(screen.getByText("Tatooine")).toBeInTheDocument();
      expect(screen.getByText("Naboo")).toBeInTheDocument();
      expect(screen.queryByText("Alderaan")).not.toBeInTheDocument();
    });

    // Limpa input → todos aparecem
    await user.clear(input);
    await waitFor(() => {
      expect(screen.getByText("Tatooine")).toBeInTheDocument();
      expect(screen.getByText("Alderaan")).toBeInTheDocument();
      expect(screen.getByText("Naboo")).toBeInTheDocument();
    });
  });

  it("usePlanets lança erro fora do PlanetsProvider", () => {
    // renderHook não precisa de provider aqui
    expect(() => renderHook(() => usePlanets())).toThrow(
      "usePlanets must be used within a PlanetsProvider",
    );
  });
});
