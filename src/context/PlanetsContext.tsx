import { createContext, type ReactNode, useContext, useState } from "react";

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
};

const PlanetsContext = createContext<PlanetsContextType>({ planets: [] });

export const PlanetsProvider = ({ children }: { children: ReactNode }) => {
  const [planets] = useState<PlanetType[]>([]);

  return (
    <PlanetsContext.Provider value={{ planets }}>
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
