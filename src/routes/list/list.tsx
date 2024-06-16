import Filter from "@/components/ui/filters/filter";
import Results from "@/components/results/results";
import Search from "@/components/search";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function List() {
  const [, setSearchParams] = useSearchParams({ q: "", type: "" });

  const handleClearFilters = () => {
    setSearchParams({ q: "", type: "" });
  };

  return (
    <main className="max-w-screen-lg min-h-screen py-3 mx-auto">
      <h1 className="pb-4 text-3xl">Pokedex</h1>
      <div className="grid px-4 py-3 border-b-2 gap-y-2 border-slate-800">
        <div className="flex justify-between">
          <Search />
          <Filter />
        </div>
        <Button
          onClick={handleClearFilters}
          className="px-2 py-2 justify-self-end text-slate-600"
          variant="link"
        >
          Remove filters
          <X className="pl-1" />
        </Button>
      </div>
      <Results />
    </main>
  );
}
