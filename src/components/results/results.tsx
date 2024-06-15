import pokemonClient from "@/api/pokemonClient";
import { useSearch } from "@/context/appContext";
import { PokemonListEntry } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { NamedAPIResource } from "pokenode-ts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Results() {
  const navigate = useNavigate();
  const { searchValue } = useSearch();
  const [filteredPokemons, setFilteredPokemons] = useState<
    NamedAPIResource[] | undefined
  >(undefined);

  useEffect(() => {
    const filterResult = filterListBasedOnSearchValue();
    setFilteredPokemons(filterResult);
  }, [searchValue]);

  const fetchPokemons = async () => {
    const response = await pokemonClient.listPokemons(undefined, 1500);
    return response;
  };

  const { data: pokemonList } = useQuery({
    queryKey: ["pokemonList"],
    queryFn: fetchPokemons,
  });

  const getPokemonIdFromUrl = (url: string) => {
    const parts = url.split("/").filter((part) => part !== "");
    const id = parts[parts.length - 1];
    return id;
  };

  const navigateBasedOnId = (url: string) => {
    const id = getPokemonIdFromUrl(url);
    navigate(`/list/${id}`);
  };

  const filterListBasedOnSearchValue = () => {
    if (searchValue === "") return pokemonList?.results;

    const filterResult = pokemonList?.results.filter(
      (pokemon: PokemonListEntry) =>
        pokemon.name.toLowerCase() === searchValue.toLowerCase()
    );
    return filterResult;
  };

  if (!pokemonList?.results.length) {
    return <></>;
  }

  return (
    <ul className="pt-2">
      {filteredPokemons?.map((item) => (
        <li
          className="px-10 py-4 my-1 border cursor-pointer"
          key={item.name}
          onClick={() => navigateBasedOnId(item.url)}
        >
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </li>
      ))}
    </ul>
  );
}
