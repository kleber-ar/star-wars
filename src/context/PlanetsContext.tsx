"use client";

import { useFetchPlanets } from "../hooks/useFetchPlanets";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import type {
  NumericFilter,
  Order,
  PlanetsContextType,
  PlanetType,
} from "../types";

const PlanetsContext = createContext<PlanetsContextType | null>(null);

export const PlanetsProvider = ({ children }: { children: ReactNode }) => {
  const { planets: fetchedPlanets, loading, error } = useFetchPlanets();
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [filter, setFilter] = useState("");
  const [numericFilters, setNumericFilters] = useState<NumericFilter[]>([]);
  const [order, setOrder] = useState<Order>({ column: "name", sort: "ASC" });

  useEffect(() => {
    setPlanets(fetchedPlanets);
  }, [fetchedPlanets]);

  const filteredPlanets = planets
    .filter((planet) =>
      planet.name.toLowerCase().includes(filter.toLowerCase()),
    )
    .filter((planet) =>
      numericFilters.every(({ column, comparison, value }) => {
        const planetValue = Number(planet[column]);
        switch (comparison) {
          case "maior que":
            return planetValue > value;

          case "menor que":
            return planetValue < value;

          case "igual a":
            return planetValue === value;

          default:
            return true;
        }
      }),
    )
    .sort((a, b) => {
      const { column, sort } = order;

      const aValue = a[column] === "unknown" ? Infinity : Number(a[column]);
      const bValue = b[column] === "unknown" ? Infinity : Number(b[column]);

      if (sort === "ASC") return aValue - bValue;
      return bValue - aValue;
    });

  const addNumericFilter = (newFilter: NumericFilter) => {
    // Verifica se já existe um filtro igual
    const exists = numericFilters.some(
      (filter) =>
        filter.column === newFilter.column &&
        filter.comparison === newFilter.comparison &&
        filter.value === newFilter.value,
    );

    if (!exists) {
      setNumericFilters([...numericFilters, newFilter]);
    }
  };

  const removeNumericFilter = (index: number) => {
    setNumericFilters((prev) => prev.filter((_, i) => i !== index));
  };

  const clearNumericFilters = () => {
    setNumericFilters([]);
  };

  return (
    <PlanetsContext.Provider
      value={{
        planets: filteredPlanets,
        loading,
        error,
        filter,
        setFilter,
        numericFilters,
        addNumericFilter,
        removeNumericFilter,
        clearNumericFilters,
        order,
        setOrder,
      }}
    >
      {children}
    </PlanetsContext.Provider>
  );
};

export function usePlanets() {
  const context = useContext(PlanetsContext);
  if (!context)
    throw new Error("usePlanets must be used within a PlanetsProvider");
  return context;
}
