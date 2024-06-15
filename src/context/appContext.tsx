import { createContext, useContext, useState } from "react";

export interface AppContextType {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <AppContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </AppContext.Provider>
  );
};

export const useSearch = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
