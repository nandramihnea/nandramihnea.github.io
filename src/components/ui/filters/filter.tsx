import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonTypes } from "@/actions/actions";
import { capitaliseWord } from "@/lib/helpers";
import { filterLabelsName } from "@/lib/types";
import { useSearchParams } from "react-router-dom";

const otherFilters = [{ name: "Apple" }, { name: "Banana" }, { name: "Pear" }];

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const type = searchParams.get("type") || "";
  const [openCollapsibles, setOpenCollapsibles] = useState<{
    [key: string]: boolean;
  }>({});

  const { data: pokemonTypes } = useQuery({
    queryKey: ["pokemonTypes"],
    queryFn: fetchPokemonTypes,
  });

  const handleToggle = (key: string) => {
    setOpenCollapsibles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleValueChange = (newValue: string) => {
    console.log("new val", newValue);
    setSearchParams(
      (prev) => {
        prev.set("type", newValue);
        return prev;
      },
      { replace: true }
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filters = {
    pokemonTypes: pokemonTypes?.results,
    otherFilters,
  };

  const filterLabels = {
    pokemonTypes: "Types",
    otherFilters: "Other Filters",
  };

  if (!pokemonTypes?.results.length) {
    return <></>;
  }

  return (
    <Select value={type} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(filters).map(([key, value]) => (
          <SelectGroup key={key}>
            <Collapsible
              open={openCollapsibles[key] || false}
              onOpenChange={() => handleToggle(key)}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <SelectLabel>
                  {filterLabels[key as filterLabelsName] || key}
                </SelectLabel>
                {openCollapsibles[key] ? (
                  <ChevronUp className="pr-2" />
                ) : (
                  <ChevronDown className="pr-2" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent>
                {value?.map((option) => (
                  <SelectItem key={option.name} value={option.name}>
                    {typeof option === "string"
                      ? capitaliseWord(option)
                      : capitaliseWord(option.name)}
                  </SelectItem>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
