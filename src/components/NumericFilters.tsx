"use client";

import { useState } from "react";
import { usePlanets, type NumericFilter } from "../context/PlanetsContext";

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
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex gap-2">
        <select
          value={column}
          onChange={(e) =>
            setColumn(e.target.value as (typeof columns)[number])
          }
        >
          {columns.map((col) => (
            <option key={col} value={col}>
              {col}
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
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          placeholder="Valor"
        />

        <button
          type="button"
          onClick={handleAddFilter}
          className="bg-blue-500 text-white px-2 rounded"
        >
          Filtrar
        </button>
      </div>

      {/* Lista de filtros aplicados */}
      {numericFilters.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-2">
          {numericFilters.map((filter, index) => (
            <span
              key={index}
              className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
            >
              {filter.column} {filter.comparison} {filter.value}
              <button
                type="button"
                onClick={() => removeNumericFilter(index)}
                className="text-red-500 font-bold"
              >
                x
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={clearNumericFilters}
            className="bg-red-500 text-white px-2 rounded"
          >
            Limpar todos
          </button>
        </div>
      )}
    </div>
  );
}
