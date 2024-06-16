import { getEvolutionChainById, getPokemonById } from "@/actions/actions";
import { capitaliseWord, createEvolutionChain } from "@/lib/helpers";
import { useQuery } from "@tanstack/react-query";
import { ChevronsRight } from "lucide-react";
import { PokemonStat, PokemonType } from "pokenode-ts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  const { id } = useParams();
  const [evolutions, setEvolutions] = useState<string[]>([]);

  const { data: pokemon } = useQuery({
    queryKey: ["pokemonById", id],
    queryFn: async () => {
      if (id) {
        const numericId = Number(id);
        return await getPokemonById(numericId);
      } else {
        return null;
      }
    },
    enabled: !!id,
  });

  const { data: evolutionChain } = useQuery({
    queryKey: ["evolutionChain", id],
    queryFn: async () => {
      if (id) {
        const numericId = Number(id);
        return await getEvolutionChainById(numericId);
      } else {
        return null;
      }
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (!evolutionChain) return;
    const names = createEvolutionChain(evolutionChain.chain);
    setEvolutions(names);
  }, [pokemon, evolutionChain]);

  if (!pokemon) {
    return <></>;
  }

  return (
    <main className="max-w-screen-lg min-h-screen py-3 mx-auto">
      <h1 className="pb-4 mb-10 text-5xl text-center">
        {capitaliseWord(pokemon.name)}
      </h1>
      <div className="max-w-md p-4 mx-auto border border-slate-700">
        <div className="flex justify-center my-4 gap-x-2">
          <img
            className="border border-slate-900"
            src={pokemon.sprites.front_default as string}
            alt="pokemon_img_front"
          />
          <img
            className="border border-slate-900"
            src={pokemon.sprites.back_default as string}
            alt="pokemon_img_back"
          />
        </div>
        <div className="flex justify-around gap-x-8">
          <div className="flex gap-x-2">
            <span className="pr-2 text-2xl border-r border-slate-700 text-slate-300">
              {pokemon.height}m
            </span>
            <span className="text-2xl text-slate-300">{pokemon.weight}kg</span>
          </div>
          <div className="flex gap-x-4">
            {pokemon.types.map((type: PokemonType) => (
              <span className="text-2xl text-slate-300" key={type.type.url}>
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 mx-auto mt-8 mb-6 gap-y-1 gap-x-10 max-w-fit">
          {pokemon.stats.map((pokemonStat: PokemonStat, index) => (
            <span key={index}>
              <span className="text-slate-500">{pokemonStat.stat.name}:</span>{" "}
              <span className="px-1 text-lg text-slate-200">
                {pokemonStat.base_stat}
              </span>
            </span>
          ))}
        </div>
        <h3 className="mt-10 mb-2 text-xl text-slate-500">Evolution chain</h3>
        <div className="flex text-slate-200 gap-x-2">
          {evolutions.map((name) => (
            <span key={name} className="flex gap-x-2">
              {capitaliseWord(name)} <ChevronsRight />
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
