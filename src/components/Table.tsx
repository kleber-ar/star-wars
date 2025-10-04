"use client";

import React from "react";
import { usePlanets } from "../context/PlanetsContext";

export default function Table() {
  const { planets, loading, error } = usePlanets();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!planets.length) return <p>Nenhum planeta encontrado.</p>;

  const headers = Object.keys(planets[0]);

  return (
    <div className="overflow-auto m-[20px]">
      <table border={1} cellPadding={5} cellSpacing={0}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th className="p-[10px]" key={header}>
                {header.replace("_", " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planets.map((planet, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>{(planet as any)[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
