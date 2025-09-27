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

export type PlanetsContextType = {
  planets: PlanetType[];
  loading: boolean;
  error: string | null;
  filter: string;
  setFilter: (filter: string) => void;
  numericFilters: NumericFilter[];
  addNumericFilter: (filter: NumericFilter) => void;
  removeNumericFilter: (index: number) => void;
  clearNumericFilters: () => void;
  order: Order;
  setOrder: (order: Order) => void;
};

export type Order = {
  column: keyof PlanetType;
  sort: "ASC" | "DESC";
};
