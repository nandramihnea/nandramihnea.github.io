import { NamedAPIResourceList } from "pokenode-ts";
import { PokemonListEntry } from "./types";

export const getPokemonIdFromUrl = (url: string) => {
  const parts = url.split("/").filter((part) => part !== "");
  const id = parts[parts.length - 1];
  return id;
};

export const filterListBasedOnSearchValue = (searchValue: string, list: NamedAPIResourceList | undefined) => {
  if (searchValue === "") return list?.results;

  const filterResult = list?.results.filter(
    (pokemon: PokemonListEntry) =>
      pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  return filterResult;
};

export const capitaliseWord = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1)