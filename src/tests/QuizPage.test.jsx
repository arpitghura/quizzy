import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import QuizPage from "../comps/QuizPage";
import { describe, expect, test, vi } from "vitest";

describe("QuizPage Component", () => {
  test("Renders fetched questions and data correctly", async () => {
    // Render the component
    const { getByText } = render(
      <Router>
        <QuizPage />
      </Router>
    );

    // Wait for API call and rendering
    await waitFor(() =>
      expect(getByText("Question 1 of 5")).toBeInTheDocument()
    );

    // Assert questions, options, and state variables
    expect(
      getByText("What does the computer software acronym JVM stand for?")
    ).toBeInTheDocument();
    expect(getByText("Java Virtual Machine")).toBeInTheDocument();
    expect(getByText("Just Virtual Machine")).toBeInTheDocument();
    expect(getByText("Java Visual Machine")).toBeInTheDocument();
    expect(getByText("Java Vendor Machine")).toBeInTheDocument();
    expect(getByText("Score: 0")).toBeInTheDocument();
    expect(getByText("Submit")).toBeInTheDocument();
    expect(getByText("Next")).toBeInTheDocument();
  });

  test("handleOptionClick updates user selection and clears classes", async () => {
    const { getByText } = render(
      <Router>
        <QuizPage />
      </Router>
    );

    await waitFor(() =>
      expect(getByText("Question 1 of 5")).toBeInTheDocument()
    );

    // Click on the first option
    const option1 = getByText("Java Vendor Machine");
    fireEvent.click(option1);

    // Expectations
    expect(option1.classList.contains("selected")).toBe(true);

    // Click on the second option
    const option2 = getByText("Java Virtual Machine");
    fireEvent.click(option2);

    // Expectations
    expect(option1.classList.contains("selected")).toBe(false);
    expect(option2.classList.contains("selected")).toBe(true);
  });

  // test("handleNext increments question counter and resets timer", async () => {
  //   const { getByText } = render(
  //     <Router>
  //       <QuizPage />
  //     </Router>
  //   );

  //   await waitFor(() =>
  //     expect(getByText("Question 1 of 5")).toBeInTheDocument()
  //   );

  //   // Click on the Next button
  //   fireEvent.click(getByText("Next"));

  //   // Expectations
  //   expect(getByText("Score: 0")).toBeInTheDocument();
  // });

  test("handleSubmit updates score and highlights correct/incorrect options", async () => {
    // Render the component
    const { getByText, getByLabelText } = render(
      <Router>
        <QuizPage />
      </Router>
    );

    // Wait for initial rendering
    await waitFor(() =>
      expect(getByText("Question 1 of 5")).toBeInTheDocument()
    );

    // Select and submit the correct option
    const correctOption = getByText("Java Virtual Machine"); // Assuming correct answer is in option-0
    fireEvent.click(correctOption);
    fireEvent.click(getByText("Submit")); // Trigger handleSubmit

    // Expectations for correct answer
    expect(correctOption).toHaveClass("correct");
    expect(getByText("Score: 1")).toBeInTheDocument(); // Score should be updated

    // Select and submit an incorrect option
    const incorrectOption = getByText("Java Vendor Machine");
    fireEvent.click(incorrectOption);
    fireEvent.click(getByText("Submit"));

    // Expectations for incorrect answer
    expect(incorrectOption).toHaveClass("incorrect");
    expect(getByText("Score: 1")).toBeInTheDocument(); // Score should remain unchanged
    expect(getByText("Java Virtual Machine")).toHaveClass("correct"); // Correct option should still be highlighted
  });
});
