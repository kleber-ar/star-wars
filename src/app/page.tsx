import React from "react";
import NumericFilters from "../components/NumericFilters";
import FilterInput from "../components/FilterInput";
import Table from "../components/Table";
import OrderFilter from "../components/OrderFilter";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-2xl mt-[20px] mb-[20px] font-bold text-center">
        Planetas Star Wars
      </h1>
      <FilterInput />
      <NumericFilters />
      <OrderFilter />
      <Table />
    </div>
  );
}
