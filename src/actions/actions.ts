import pokemonClient from "@/api/pokemonClient";

export const fetchPokemons = async () => {
  const response = await pokemonClient.listPokemons(undefined, 1500);
  return response;
};