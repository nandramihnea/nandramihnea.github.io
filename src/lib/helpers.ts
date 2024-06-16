import { ChainLink, NamedAPIResourceList } from "pokenode-ts";
import { PokemonListEntry } from "./types";

export const getPokemonIdFromUrl = (url: string) => {
  const parts = url.split("/").filter((part) => part !== "");
  const id = parts[parts.length - 1];
  return id;
};

export const filterListBasedOnSearchValueOrType = (searchValue: string, list: NamedAPIResourceList | undefined, filterValue: string) => {
  if (searchValue === '' && filterValue === '') return list?.results;

  const filterByName = list?.results.filter(
    (pokemon: PokemonListEntry) =>
      pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  console.log('filterByName', filterByName);
  console.log('filterValue', filterValue);

  // const filterByType = filterByName?.filter((pokemon: PokemonListEntry) =>
  // pokemon.name.toLowerCase())
  // console.log('filterByType', filterByType);
  return filterByName;
};

export const capitaliseWord = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1)

export const createEvolutionChain = (evolutionChain: ChainLink) => {
  const names:string[] = [];

  // Helper function to recursively traverse the evolution chain
  function traverse(chain: ChainLink) {
      // Add the current species name to the array
      names.push(chain.species.name);

      // If there are evolutions, traverse them
      chain.evolves_to.forEach(evolution => {
          traverse(evolution);
      });
  }

  // Start the traversal from the root of the chain
  traverse(evolutionChain);

  return names;
}