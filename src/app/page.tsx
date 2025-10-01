import React from "react";
import NumericFilters from "../components/NumericFilters";
import FilterInput from "../components/FilterInput";
import Table from "../components/Table";
import OrderFilter from "../components/OrderFilter";
import Image from "next/image";

import backShape from "../../public/grafismo-topo.svg";
import logo from "../../public/logo-star wars.svg";

export default function Home() {
  return (
    <div className="text-center">
      <div className=" h-[400px] mt-[20px] flex justify-center items-center">
        <Image
          src={backShape}
          alt="backShape"
          width={500}
          className="absolute -z-1"
        />
        <Image src={logo} alt="backShape" width={200} className="mb-[120px]" />
      </div>
      <FilterInput />
      <NumericFilters />
      <OrderFilter />
      <Table />
    </div>
  );
}
