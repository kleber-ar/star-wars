"use client";

import { useFetchPlanets } from "@/hooks/useFetchPlanets";
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

type PlanetsContextType = {
  planets: PlanetType[];
  loading: boolean;
  error: string | null;
  filter: string;
  setFilter: (filter: string) => void;
};

const PlanetsContext = createContext<PlanetsContextType | null>(null);

export const PlanetsProvider = ({ children }: { children: ReactNode }) => {
  const { planets: fetchedPlanets, loading, error } = useFetchPlanets();
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setPlanets(fetchedPlanets);
  }, [fetchedPlanets]);

  const filteredPlanets = planets.filter((planet) =>
    planet.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <PlanetsContext.Provider
      value={{ planets: filteredPlanets, loading, error, filter, setFilter }}
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
