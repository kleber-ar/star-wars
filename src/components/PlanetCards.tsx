"use client";

import { usePlanets } from "@/context/PlanetsContext";
import planetImg from "../../public/Foto planeta.png";
import Image from "next/image";

export default function PlanetCards() {
  const { planets, loading, error } = usePlanets();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!planets.length) return <p>Nenhum planeta encontrado.</p>;

  return (
    <div className="grid grid-cols-1 m-[20px] gap-[20px] place-items-center">
      {planets.map((planet, index) => (
        <div
          key={index}
          className="bg-[var(--color-secondary)] rounded-[10px] p-[16px] w-[358px] flex items-center justify-between gap-[8px]"
        >
          <div className="flex flex-col gap-[5px] text-left break-words">
            <h2 className="text-lg font-semibold text-white mb-[8px]">
              {planet.name}
            </h2>

            <p className="text-sm text-gray-300">🌦️ Clima: {planet.climate}</p>
            <p className="text-sm text-gray-300">
              🌍 Terreno: {planet.terrain}
            </p>
            <p className="text-sm text-gray-300">
              👥 População: {planet.population}
            </p>
          </div>

          <Image src={planetImg} alt="planeta" width={128} height={128} />
        </div>
      ))}
    </div>
  );
}
