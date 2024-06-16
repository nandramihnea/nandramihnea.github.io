import { render, screen, waitFor } from "@testing-library/react";
import Results from "./results";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

let mockSearchParam = "";
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
  useSearchParams: () => {
    const [params, setParams] = useState(new URLSearchParams(mockSearchParam));
    return [
      params,
      (newParams: string) => {
        mockSearchParam = newParams;
        setParams(new URLSearchParams(newParams));
      },
    ];
  },
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
      const listItems = screen.getAllByTestId(/list/i);
      expect(listItems).toHaveLength(1302);
    });
  });
});
