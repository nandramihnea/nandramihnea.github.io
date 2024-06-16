import { createContext, useContext, useState } from "react";

export interface AppContextType {
  searchValue: string;
  setSearchValue: (value: string) => void;
  filterValue: string;
  setFilterValue: (value: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");

  return (
    <AppContext.Provider
      value={{ searchValue, setSearchValue, filterValue, setFilterValue }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useContextHook = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useContextHook must be used within a AppContextProvider");
  }
  return context;
};
