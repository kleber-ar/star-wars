"use client";

import React, { useState } from "react";
import { usePlanets } from "../context/PlanetsContext";

const OrderFilter = () => {
  const { setOrder } = usePlanets();
  const [column, setColumn] = useState("population");
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");

  const handleOrder = () => {
    setOrder({ column: column as any, sort });
  };

  return (
    <div className="flex flex-wrap gap-[12px] mb-[20px] mt-[20px]">
      <select
        className="mb-[18px]"
        data-testid="column-sort"
        value={column}
        onChange={(e) => setColumn(e.target.value)}
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation period</option>
        <option value="surface_water">surface water</option>
      </select>

      <label>
        <input
          type="radio"
          name="sort"
          data-testid="column-sort-input-asc"
          value="ASC"
          checked={sort === "ASC"}
          onChange={() => setSort("ASC")}
        />
        Ascendente
      </label>

      <label>
        <input
          type="radio"
          name="sort"
          data-testid="column-sort-input-desc"
          value="DESC"
          checked={sort === "DESC"}
          onChange={() => setSort("DESC")}
        />
        Descendente
      </label>

      <button
        data-testid="column-sort-button"
        type="button"
        onClick={handleOrder}
      >
        Ordenar
      </button>
    </div>
  );
};

export default OrderFilter;
