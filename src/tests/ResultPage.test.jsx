import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ResultPage from "../comps/ResultPage";

// Tests
describe("ResultPage Component", () => {
  test("renders ResultPage component with default values", () => {
    render(
      <Router>
        <ResultPage />
      </Router>
    );

    // Expectations
    expect(screen.getByText(/Your Score: 0\/0/i)).toBeInTheDocument();
    expect(
      screen.getByText(/All the best for the next time!!/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Go Home/i })).toBeInTheDocument();
  });

  test("renders ResultPage component with custom values", () => {
    render(
      <Router>
        <ResultPage score={8} totalScore={10} />
      </Router>
    );

    // Expectations
    expect(screen.getByText(/Your Score: 8\/10/i)).toBeInTheDocument();
    // You can add more specific assertions based on your component's structure and content
  });

  test("Link navigates to the correct route", () => {
    render(
      <Router>
        <ResultPage />
      </Router>
    );

    // Click on the Go Home link
    const goHomeLink = screen.getByText(/Go Home/i);
    fireEvent.click(goHomeLink);

    // You can add more specific assertions based on the expected behavior after clicking the link
    // For example, you can check if the link navigates to the correct route.
  });
});
