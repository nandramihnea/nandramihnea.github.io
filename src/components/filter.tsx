import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { fetchPokemonTypes } from "@/actions/actions";

export default function Filter() {
  const { data: pokemonTypes } = useQuery({
    queryKey: ["pokemonTypes"],
    queryFn: fetchPokemonTypes,
  });

  if (!pokemonTypes?.results.length) {
    return <></>;
  }

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Type</SelectLabel>
          {pokemonTypes.results.map((type) => (
            <SelectItem key={type.url} value={type.name}>
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Other filters</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
