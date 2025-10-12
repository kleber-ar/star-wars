"use client";

import React, { useState } from "react";
import { usePlanets } from "../context/PlanetsContext";
import type { NumericFilter } from "../types";

const columns = [
  "population",
  "orbital_period",
  "diameter",
  "rotation_period",
  "surface_water",
] as const;

const comparisons = ["maior que", "menor que", "igual a"] as const;

export default function NumericFilters() {
  const {
    addNumericFilter,
    numericFilters,
    removeNumericFilter,
    clearNumericFilters,
  } = usePlanets();

  const [column, setColumn] = useState<(typeof columns)[number]>("population");
  const [comparison, setComparison] =
    useState<(typeof comparisons)[number]>("maior que");
  const [value, setValue] = useState<number>(0);

  const handleAddFilter = () => {
    const filter: NumericFilter = { column, comparison, value };
    addNumericFilter(filter);
  };

  return (
    <div className="flex flex-col flex-wrap gap-[10px] mb-4">
      <div className="flex flex-wrap gap-[20px]">
        <select
          data-testid="column-filter"
          value={column}
          onChange={(e) =>
            setColumn(e.target.value as (typeof columns)[number])
          }
        >
          {columns.map((col) => (
            <option key={col} value={col}>
              {col.replace("_", " ")}
            </option>
          ))}
        </select>

        <select
          data-testid="comparison-filter"
          value={comparison}
          onChange={(e) =>
            setComparison(e.target.value as (typeof comparisons)[number])
          }
        >
          {comparisons.map((comp) => (
            <option key={comp} value={comp}>
              {comp}
            </option>
          ))}
        </select>

        <input
          className="w-[150px]"
          data-testid="value-filter"
          type="number"
          value={value > 0 ? value : 0}
          onChange={(e) => {
            const newValue = Number(e.target.value);
            setValue(newValue < 0 ? 0 : newValue);
          }}
          placeholder="Valor"
        />

        <button className="filter" type="button" onClick={handleAddFilter}>
          Filtrar
        </button>
      </div>

      {/* Lista de filtros aplicados */}
      {numericFilters.length > 0 && (
        <div className="flex-col">
          <button
            type="button"
            onClick={clearNumericFilters}
            className="clearAll mt-[20px]"
          >
            Limpar todos
          </button>
          {numericFilters.map((filter, index) => (
            <span
              key={index}
              className=" w-[245px] bg-gray-200 border-b pb-[10px] flex  justify-between items-center gap-[10px] m-[10px]"
            >
              {filter.column.replace("_", " ")} {filter.comparison}{" "}
              {filter.value}
              <button
                type="button"
                onClick={() => removeNumericFilter(index)}
                className="x"
              >
                X
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
