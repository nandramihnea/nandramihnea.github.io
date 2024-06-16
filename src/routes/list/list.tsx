import Filter from "@/components/ui/filters/filter";
import Results from "@/components/results/results";
import Search from "@/components/search";
import { AppProvider } from "@/context/appContext";

export default function List() {
  return (
    <AppProvider>
      <main className="max-w-screen-lg py-3 mx-auto">
        <h1 className="pb-4 text-3xl">Pokedex</h1>
        <div className="flex justify-between px-4 py-3 border-b-2">
          <Search />
          <Filter />
        </div>
        <Results />
      </main>
    </AppProvider>
  );
}
