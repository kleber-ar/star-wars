"use client";

import { usePlanets } from "../context/PlanetsContext";

export default function FilterInput() {
  const { filter, setFilter } = usePlanets();

  return (
    <input
      type="text"
      placeholder="Filtrar planetas"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
}
