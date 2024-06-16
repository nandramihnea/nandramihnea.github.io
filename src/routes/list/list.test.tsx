import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import List from "./list";
import { AppProvider } from "@/context/appContext";
import userEvent from "@testing-library/user-event";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("@/actions/actions", () => ({
  fetchPokemons: vi.fn().mockResolvedValue({
    results: [
      { name: "Bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      { name: "Ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
      { name: "Venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
    ],
  }),
}));

const queryClient = new QueryClient();

describe("List component intergration tests", () => {
  it("should update the search results based on the search input value", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <List />
        </AppProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      const listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(3);
    });

    userEvent.type(screen.getByPlaceholderText(/Search by name/i), "Ivysaur");
    await waitFor(
      () => {
        const listItems = screen.getAllByRole("listitem");
        expect(listItems).toHaveLength(1);
        expect(listItems[0]).toHaveTextContent("Ivysaur");
      },
      { timeout: 1500 }
    );
  });
});
