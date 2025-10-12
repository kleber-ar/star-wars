import React from "react";
import NumericFilters from "../components/NumericFilters";
import FilterInput from "../components/FilterInput";
import Table from "../components/Table";
import OrderFilter from "../components/OrderFilter";
import Image from "next/image";

import backShape from "../../public/grafismo-topo.svg";
import logo from "../../public/logo-star wars.svg";
import PlanetCards from "@/components/PlanetCards";

export default function Home() {
  return (
    <div className="text-center">
      <div className=" h-[400px] mt-[20px] flex justify-center items-center">
        <Image
          src={backShape}
          alt="backShape"
          width={500}
          height={500}
          className="absolute -z-1"
        />
        <Image
          src={logo}
          alt="logo"
          width={200}
          height={200}
          className="mb-[120px]"
        />
      </div>
      <hr className="mt-[-25px]" />
      <div className="p-[10px] mb-[20px]">
        <FilterInput />
        <OrderFilter />
        <NumericFilters />
      </div>
      <div className="hidden [@media(min-width:601px)]:block">
        <Table />
      </div>
      <div className="block [@media(min-width:601px)]:hidden">
        <PlanetCards />
      </div>
    </div>
  );
}
