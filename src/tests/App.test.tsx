import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { act, renderHook, screen, waitFor } from "@testing-library/react";
import Home from "../app/page";
import { PlanetsProvider, usePlanets } from "../context/PlanetsContext";
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

  it("UsePlanets lança erro fora do PlanetsProvider", () => {
    // renderHook não precisa de provider aqui
    expect(() => renderHook(() => usePlanets())).toThrow(
      "usePlanets must be used within a PlanetsProvider",
    );
  });

  it("Render selects, input, and button com valores", () => {
    renderWithRouterAndContext(<Home />);

    const columnSelect = screen.getByTestId("column-filter");
    const comparisonSelect = screen.getByTestId("comparison-filter");
    const valueInput = screen.getByTestId("value-filter");
    const applyButton = screen.getByRole("button", { name: /filtrar/i });

    expect(columnSelect).toBeInTheDocument();
    expect(comparisonSelect).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(applyButton).toBeInTheDocument();

    // Valores iniciais
    expect(columnSelect).toHaveValue("population");
    expect(comparisonSelect).toHaveValue("maior que");
    expect(valueInput).toHaveValue(0);
  });

  it("Adiciona o filtro numérico menor que sem duplicar filtros", async () => {
    const { user } = renderWithRouterAndContext(<Home />);

    const columnSelect = screen.getByTestId("column-filter");
    const comparisonSelect = screen.getByTestId("comparison-filter");
    const valueInput = screen.getByTestId("value-filter");
    const applyButton = screen.getByRole("button", { name: /filtrar/i });

    // Define valores Menor que e aplica filtro
    await user.selectOptions(columnSelect, "diameter");
    await user.selectOptions(comparisonSelect, "menor que");
    await user.clear(valueInput);
    await user.type(valueInput, "10000");
    await user.click(applyButton);

    // Verifica se o filtro apareceu na tela
    await waitFor(() => {
      expect(screen.getByText("diameter menor que 10000")).toBeInTheDocument();
    });

    // Tenta adicionar o mesmo filtro → não deve duplicar
    await user.click(applyButton);
    const filters = screen.getAllByText("diameter menor que 10000");
    expect(filters.length).toBe(1);
  });

  it("Filtra planetas usando 'maior que'", async () => {
    const { user } = renderWithRouterAndContext(<Home />);
    const columnSelect = screen.getByTestId("column-filter");
    const comparisonSelect = screen.getByTestId("comparison-filter");
    const valueInput = screen.getByTestId("value-filter");
    const applyButton = screen.getByRole("button", { name: /filtrar/i });

    await user.selectOptions(columnSelect, "population");
    await user.selectOptions(comparisonSelect, "maior que");
    await user.clear(valueInput);
    await user.type(valueInput, "1000000"); // Valor que filtra planetas
    await user.click(applyButton);

    await waitFor(() => {
      expect(screen.queryByText("Tatooine")).not.toBeInTheDocument();
      expect(screen.getByText("Alderaan")).toBeInTheDocument();
    });
  });

  it("Filtra planetas usando 'igual a'", async () => {
    const { user } = renderWithRouterAndContext(<Home />);
    const columnSelect = screen.getByTestId("column-filter");
    const comparisonSelect = screen.getByTestId("comparison-filter");
    const valueInput = screen.getByTestId("value-filter");
    const applyButton = screen.getByRole("button", { name: /filtrar/i });

    await user.selectOptions(columnSelect, "population");
    await user.selectOptions(comparisonSelect, "igual a");
    await user.clear(valueInput);
    await user.type(valueInput, "200000"); // Valor exato de Tatooine
    await user.click(applyButton);

    await waitFor(() => {
      expect(screen.getByText("Tatooine")).toBeInTheDocument();
      expect(screen.queryByText("Alderaan")).not.toBeInTheDocument();
    });
  });

  it("Cobre o case default do filtro numérico", async () => {
    const { result } = renderHook(() => usePlanets(), {
      wrapper: ({ children }) => <PlanetsProvider>{children}</PlanetsProvider>,
    });

    await act(async () => {
      // Adiciona filtro com comparação inválida
      result.current.addNumericFilter({
        column: "diameter" as any,
        comparison: "inválido" as any,
        value: 0,
      });
    });

    // Verifica se o filtro inválido foi adicionado
    expect(result.current.numericFilters).toEqual([
      { column: "diameter", comparison: "inválido", value: 0 },
    ]);
  });

  it("Remove um filtro específico", async () => {
    const { user } = renderWithRouterAndContext(<Home />);

    const columnSelect = screen.getByTestId("column-filter");
    const comparisonSelect = screen.getByTestId("comparison-filter");
    const valueInput = screen.getByTestId("value-filter");
    const applyButton = screen.getByRole("button", { name: /filtrar/i });

    // Adiciona dois filtros diferentes
    await user.selectOptions(columnSelect, "diameter");
    await user.selectOptions(comparisonSelect, "menor que");
    await user.clear(valueInput);
    await user.type(valueInput, "10000");
    await user.click(applyButton);

    await user.selectOptions(columnSelect, "population");
    await user.selectOptions(comparisonSelect, "maior que");
    await user.clear(valueInput);
    await user.type(valueInput, "1000000");
    await user.click(applyButton);

    // Verifica se ambos filtros aparecem
    expect(screen.getByText("diameter menor que 10000")).toBeInTheDocument();
    expect(
      screen.getByText("population maior que 1000000"),
    ).toBeInTheDocument();

    // Remove o primeiro filtro
    const removeButtons = screen.getAllByRole("button", { name: /x/i });
    await user.click(removeButtons[0]);

    await waitFor(() => {
      expect(
        screen.queryByText("diameter menor que 10000"),
      ).not.toBeInTheDocument();
      expect(
        screen.getByText("population maior que 1000000"),
      ).toBeInTheDocument();
    });
  });

  it("Remove todos os filtros com o botão 'Limpar todos'", async () => {
    const { user } = renderWithRouterAndContext(<Home />);

    const columnSelect = screen.getByTestId("column-filter");
    const comparisonSelect = screen.getByTestId("comparison-filter");
    const valueInput = screen.getByTestId("value-filter");
    const applyButton = screen.getByRole("button", { name: /filtrar/i });

    // Adiciona dois filtros
    await user.selectOptions(columnSelect, "diameter");
    await user.selectOptions(comparisonSelect, "menor que");
    await user.clear(valueInput);
    await user.type(valueInput, "10000");
    await user.click(applyButton);

    await user.selectOptions(columnSelect, "population");
    await user.selectOptions(comparisonSelect, "maior que");
    await user.clear(valueInput);
    await user.type(valueInput, "1000000");
    await user.click(applyButton);

    // Verifica se ambos filtros aparecem
    expect(screen.getByText("diameter menor que 10000")).toBeInTheDocument();
    expect(
      screen.getByText("population maior que 1000000"),
    ).toBeInTheDocument();

    // Clica em "Limpar todos"
    const clearAllButton = screen.getByRole("button", {
      name: /limpar todos/i,
    });
    await user.click(clearAllButton);

    await waitFor(() => {
      expect(
        screen.queryByText("diameter menor que 10000"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("population maior que 1000000"),
      ).not.toBeInTheDocument();
    });
  });
});
