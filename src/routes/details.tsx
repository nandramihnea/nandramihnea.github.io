import { getEvolutionChainById, getPokemonById } from "@/actions/actions";
import { capitaliseWord, createEvolutionChain } from "@/lib/helpers";
import { useQuery } from "@tanstack/react-query";
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
    <main className="max-w-screen-lg py-3 mx-auto">
      <h1 className="pb-4 text-3xl">{capitaliseWord(pokemon.name)}</h1>
      <div className="border">
        <div className="flex gap-x-2">
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
        <div className="flex gap-x-8">
          <span>{pokemon.height}m</span>
          <span>{pokemon.weight}kg</span>
          {pokemon.types.map((type: PokemonType) => (
            <span key={type.type.url}>{type.type.name}</span>
          ))}
        </div>
        <div className="grid grid-cols-2">
          {pokemon.stats.map((pokemonStat: PokemonStat, index) => (
            <span key={index}>
              {pokemonStat.stat.name}: {pokemonStat.base_stat}
            </span>
          ))}
        </div>
        <div>
          <span>Evolution chain: </span>
          {evolutions.map((name) => (
            <span key={name}>
              {capitaliseWord(name)}
              {"->"}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
