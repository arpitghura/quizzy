import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "../comps/HomePage";

// Tests
describe("HomePage Component", () => {
  it("renders HomePage component", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    // Expectations
    expect(screen.getByText(/Welcome to the Quiz App/i)).toBeInTheDocument();
  });

  test("select options for difficulty and number of questions", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    // Difficulty select
    //   how to select the select element with name and id attribute in testing library
    //   https://testing-library.com/docs/queries/byrole/

    const difficultySelect = screen.getByLabelText(/difficulty/i);
    fireEvent.change(difficultySelect, { target: { value: "medium" } });
    expect(difficultySelect.value).toBe("medium");

    // Number of Questions select
    const noOfQuestionsSelect = screen.getByLabelText(/Number of Questions/i);
    fireEvent.change(noOfQuestionsSelect, { target: { value: "10" } });
    expect(noOfQuestionsSelect.value).toBe("10");
  });

  test("Start Quiz link", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    // Click on the Start Quiz link
    const startQuizLink = screen.getByText(/Start Quiz/i);
    fireEvent.click(startQuizLink);

    // You can add more specific assertions based on the expected behavior after clicking the link
    // For example, you can check if the link navigates to the correct route with the expected state.
  });
});
