import { Input } from "./ui/input";
import { useSearchParams } from "react-router-dom";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const q = searchParams.get("q") || "";
  // const [debouncedValue] = useDebounce(q, 1000);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      (prev) => {
        prev.set("q", event.target.value);
        return prev;
      },
      { replace: true }
    );
  };

  // useEffect(() => {
  //   setSearchValue(debouncedValue);
  // }, [debouncedValue]);

  return (
    <Input
      type="search"
      placeholder="Search by name"
      className="max-w-[300px]"
      onChange={handleInputChange}
      value={q}
    />
  );
}
