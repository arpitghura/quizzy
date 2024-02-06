import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// To Test
import App from "../App";

// Tests
describe("Renders main page correctly", async () => {
  it("Should render the page correctly", async () => {
    // Setup
    render(<App />);
    const appComp = await screen.findByTestId("appComp");

    // Expectations
    expect(appComp).toBeInTheDocument();
  });
});
