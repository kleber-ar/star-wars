"use client";

import React from "react";
import { usePlanets } from "../context/PlanetsContext";

export default function FilterInput() {
  const { filter, setFilter } = usePlanets();

  return (
    <input
      className="m-[8px]"
      type="text"
      placeholder="Filtrar planetas"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
}
