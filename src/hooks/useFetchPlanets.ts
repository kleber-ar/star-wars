// src/hooks/useFetchPlanets.ts
import { useEffect, useState } from "react";
import type { PlanetType } from "../context/PlanetsContext";

export const useFetchPlanets = () => {
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const res = await fetch("https://swapi.dev/api/planets");
        const data = await res.json();

        const planetsWithoutResidents = data.results.map(
          ({ residents, ...rest }: { residents: string[]; rest: PlanetType }) =>
            rest,
        );

        setPlanets(planetsWithoutResidents);
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar planetas");
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  return { planets, loading, error };
};
