import { render, screen, waitFor } from "@testing-library/react";
import Results from "./results";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
  useSearchParams: vi.fn(),
}));

const queryClient = new QueryClient();

describe("Results list component tests", () => {
  it("should have exactly 1302 items if the filters are not active", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Results />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(1302);
    });
  });
});
