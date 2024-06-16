import { fetchPokemons } from "@/actions/actions";
import {
  capitaliseWord,
  filterListBasedOnSearchValueOrType,
  getPokemonIdFromUrl,
} from "@/lib/helpers";
import { useQuery } from "@tanstack/react-query";
import { NamedAPIResource } from "pokenode-ts";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Results() {
  const [searchParams] = useSearchParams({ q: "", type: "" });
  const type = searchParams.get("type") || "";
  const q = searchParams.get("q") || "";

  const navigate = useNavigate();
  const [filteredPokemons, setFilteredPokemons] = useState<
    NamedAPIResource[] | undefined
  >(undefined);

  useEffect(() => {
    const filterResult = filterListBasedOnSearchValueOrType(
      q,
      pokemonList,
      type
    );
    setFilteredPokemons(filterResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, type]);

  const { data: pokemonList } = useQuery({
    queryKey: ["pokemonList"],
    queryFn: fetchPokemons,
  });

  const navigateBasedOnId = (url: string) => {
    const id = getPokemonIdFromUrl(url);
    navigate(`/list/${id}`);
  };

  if (!pokemonList?.results.length) {
    return <></>;
  }

  const filteredPokemonsDiv = filteredPokemons?.map((item) => (
    <li
      className="px-10 py-4 my-1 border cursor-pointer"
      key={item.name}
      onClick={() => navigateBasedOnId(item.url)}
      data-testid="list"
    >
      {capitaliseWord(item.name)}
    </li>
  ));

  const pokemonListDiv = pokemonList.results.map((item) => (
    <li
      className="px-10 py-4 my-1 border cursor-pointer"
      key={item.name}
      onClick={() => navigateBasedOnId(item.url)}
      data-testid="list"
    >
      {capitaliseWord(item.name)}
    </li>
  ));

  return (
    <ul className="pt-2">
      {filteredPokemons ? filteredPokemonsDiv : pokemonListDiv}
    </ul>
  );
}
