import Filter from "@/components/filter";
import Results from "@/components/results/results";
import Search from "@/components/search";

export default function List() {
  return (
    <div className="">
      <div className="flex justify-between border-b-2">
        <Search />
        <Filter />
      </div>
      <Results />
    </div>
  );
}
