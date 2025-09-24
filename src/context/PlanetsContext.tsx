"use client";

import { useFetchPlanets } from "../hooks/useFetchPlanets";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type PlanetType = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export type NumericFilter = {
  column: keyof PlanetType;
  comparison: "maior que" | "menor que" | "igual a";
  value: number;
};

type PlanetsContextType = {
  planets: PlanetType[];
  loading: boolean;
  error: string | null;
  filter: string;
  setFilter: (filter: string) => void;
  numericFilters: NumericFilter[];
  addNumericFilter: (filter: NumericFilter) => void;
  removeNumericFilter: (index: number) => void;
  clearNumericFilters: () => void;
};

const PlanetsContext = createContext<PlanetsContextType | null>(null);

export const PlanetsProvider = ({ children }: { children: ReactNode }) => {
  const { planets: fetchedPlanets, loading, error } = useFetchPlanets();
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [filter, setFilter] = useState("");
  const [numericFilters, setNumericFilters] = useState<NumericFilter[]>([]);

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
    );

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
