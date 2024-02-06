import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Error404 from "../comps/Error404";

// Tests
describe("Renders Error404 component correctly", async () => {
  it("Should render the Error404 component correctly", async () => {
    // Setup
    render(
      <Router>
        <Error404 />
      </Router>
    );

    // Expectations
    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/The page you are looking for does not exist/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Go back to Home/i })
    ).toBeInTheDocument();
  });
});
