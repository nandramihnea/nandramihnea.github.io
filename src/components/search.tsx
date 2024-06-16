import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useDebounce } from "use-debounce";
import { useSearch } from "@/context/appContext";

export default function Search() {
  const [inputValue, setInputValue] = useState("");
  const { setSearchValue } = useSearch();
  const [debouncedValue] = useDebounce(inputValue, 1000);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    setSearchValue(debouncedValue);
  }, [debouncedValue]);

  return (
    <Input
      type="search"
      placeholder="Search by name"
      className="max-w-[300px]"
      onChange={handleInputChange}
      value={inputValue}
    />
  );
}
