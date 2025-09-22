"use client";

import { useFetchPlanets } from "../hooks/useFetchPlanets";

export default function Table() {
  const { planets, loading, error } = useFetchPlanets();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const headers = Object.keys(planets[0]);

  return (
    <div className="overflow-auto">
      <table border={1} cellPadding={5} cellSpacing={0}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planets.map((planet) => (
            <tr key={planet.name}>
              {headers.map((header) => (
                <td key={header}>
                  {(planet as Record<string, string | string[]>)[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
