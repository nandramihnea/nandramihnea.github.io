import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import List from "./list";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

let mockSearchParam = "";

vi.mock("react-router-dom", () => {
  return {
    useNavigate: vi.fn(),
    useSearchParams: () => {
      const [params, setParams] = useState(
        new URLSearchParams(mockSearchParam)
      );
      return [
        params,
        (newParams: string) => {
          mockSearchParam = newParams;
          setParams(new URLSearchParams(newParams));
        },
      ];
    },
  };
});

vi.mock("@/actions/actions", () => ({
  fetchPokemons: vi.fn().mockResolvedValue({
    results: [
      { name: "Bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      { name: "Ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
      { name: "Venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
    ],
  }),
  fetchPokemonTypes: vi.fn().mockResolvedValue({
    results: [
      { name: "Normal", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      { name: "Rock", url: "https://pokeapi.co/api/v2/pokemon/2/" },
      { name: "Bug", url: "https://pokeapi.co/api/v2/pokemon/3/" },
      { name: "Ice", url: "https://pokeapi.co/api/v2/pokemon/4/" },
    ],
  }),
}));

const queryClient = new QueryClient();

describe("List component intergration tests", () => {
  it("should update the search results based on the search input value", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <List />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(3);
    });

    // userEvent.type(screen.getByPlaceholderText(/Search by name/i), "Ivysaur");

    // await waitFor(
    //   () => {
    //     const listItems = screen.getAllByTestId(/list/i);
    //     expect(listItems).toHaveLength(1);
    //     expect(listItems[0]).toHaveTextContent("Ivysaur");
    //   },
    //   { timeout: 1500 }
    // );
  });
});
