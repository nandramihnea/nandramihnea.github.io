import pokemonClient from "@/api/pokemonClient";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function Results() {
  const navigate = useNavigate();

  const fetchPokemons = async () => {
    const response = await pokemonClient.listPokemons(undefined, 1500);
    return response;
  };

  const getPokemonIdFromUrl = (url: string) => {
    const parts = url.split("/");
    const id = parts[parts.length - 1];
    return id;
  };

  const navigateBasedOnId = (url: string) => {
    const id = getPokemonIdFromUrl(url);
    navigate(`/list/${id}`);
  };

  const { data } = useQuery({
    queryKey: ["pokemonList"],
    queryFn: fetchPokemons,
  });
  console.log("data", data);

  if (!data?.results.length) {
    return <></>;
  }

  return (
    <ul className="">
      {data.results.map((item) => (
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
