import Filter from "@/components/filter";
import Results from "@/components/results/results";
import Search from "@/components/search";
import { AppProvider } from "@/context/appContext";

export default function List() {
  return (
    <AppProvider>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex justify-between px-4 py-3 border-b-2">
          <Search />
          <Filter />
        </div>
        <Results />
      </div>
    </AppProvider>
  );
}
