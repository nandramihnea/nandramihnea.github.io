import { evolutionClient, pokemonClient } from "@/api/pokemonClient";

export const fetchPokemons = async () => {
  const response = await pokemonClient.listPokemons(undefined, 1500);
  return response;
};

export const fetchPokemonTypes = async () => {
  const response = await pokemonClient.listTypes();
  return response;
}

export const getPokemonById = async (id: number) => {
  const response = await pokemonClient.getPokemonById(id);
  return response;
}

export const getEvolutionChainById = async (id: number) => {
  const response = await evolutionClient.getEvolutionChainById(id);
  return response;
}