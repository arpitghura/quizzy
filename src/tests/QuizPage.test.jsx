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

  // test("clearClasses clears selected, correct, and incorrect classes", async () => {
  //   const { getByText } = render(
  //     <Router>
  //       <QuizPage />
  //     </Router>
  //   );

  //   await waitFor(() =>
  //     expect(getByText("Question 1 of 5")).toBeInTheDocument()
  //   );

  //   // Click on the first option
  //   const option1 = getByText("Java Vendor Machine");
  //   fireEvent.click(option1);

  //   // Expectations
  //   expect(option1.classList.contains("selected")).toBe(true);

  //   // Click on the second option
  //   const option2 = getByText("Java Virtual Machine");
  //   fireEvent.click(option2);

  //   // Expectations
  //   expect(option1.classList.contains("selected")).toBe(false);
  //   expect(option2.classList.contains("selected")).toBe(true);

  //   // Clear classes
  //   fireEvent.click(getByText("Next"));

  //   // Expectations
  //   expect(option2.classList.contains("selected")).toBe(false);
  // });

  test("Timer decreases and triggers submit on end", async () => {
    // Render the component and start timer
    const { getByText } = render(
      <Router>
        <QuizPage />
      </Router>
    );
    vi.useFakeTimers();
    // Simulate 25 seconds passing
    vi.advanceTimersByTime(25000);

    // Assert timer value and submit call
    expect(getByText("00:05")).toBeInTheDocument();
    expect(state.userSelection).not.toBeNull(); // Assuming handleSubmit is called
  });

  // test("handleSubmit updates score and highlights correct/incorrect options", async () => {
  //   const { getByText } = render(
  //     <Router>
  //       <QuizPage />
  //     </Router>
  //   );

  //   await waitFor(() =>
  //     expect(getByText("Question 1 of 5")).toBeInTheDocument()
  //   );

  //   // Click on the correct option
  //   const correctOption = getByText("Java Virtual Machine");
  //   fireEvent.click(correctOption);

  //   // Expectations
  //   expect(correctOption.classList.contains("correct")).toBe(true);
  //   expect(getByText(/Score: 0/i)).toBeInTheDocument();

  //   // Click on an incorrect option
  //   const incorrectOption = getByText("Java Vendor Machine");
  //   fireEvent.click(incorrectOption);

  //   // Expectations
  //   expect(incorrectOption.classList.contains("incorrect")).toBe(true);
  //   expect(screen.getByText(/Score: 0/i)).toBeInTheDocument();
  // });
  test("handleNext increments question counter and resets timer", async () => {
    const { getByText } = render(
      <Router>
        <QuizPage />
      </Router>
    );

    // Click on the Next button
    fireEvent.click(getByText(/Next/i));

    // Expectations
    expect(getByText(/Question 2 of 5/i)).toBeInTheDocument();
    expect(getByText(/Score: 0/i)).toBeInTheDocument();
  });
});
