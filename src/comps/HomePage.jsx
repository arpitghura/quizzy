import React, { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [noOfQuestions, setNoOfQuestions] = useState(5);

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleQuestionsChange = (e) => {
    setNoOfQuestions(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <h1 className="font-bold text-4xl p-2 text-center">
        Welcome to the Quiz App
      </h1>
      <p className="text-lg p-2 text-center">
        Powered by the Open Trivia Database API
      </p>
      <div className="flex flex-col sm:flex-row justify-between gap-5 my-5 align-baseline items-center">
        <label htmlFor="difficulty">Choose Difficulty Level</label>
        <select
          name="difficulty"
          id="difficulty"
          onChange={handleDifficultyChange}
          className="p-2 rounded-lg border-2 border-gray-300 outline-none bg-gray-900"
        >
          <option value="easy" className="difficulty-levels">
            Easy
          </option>
          <option value="medium" className="difficulty-levels">
            Medium
          </option>
          <option value="hard" className="difficulty-levels">
            Hard
          </option>
        </select>

        <label htmlFor="noOfQuestions">Choose Number of Questions</label>
        <select
          name="noOfQuestions"
          id="noOfQuestions"
          onChange={handleQuestionsChange}
          className="p-2 rounded-lg border-2 border-gray-300 outline-none bg-gray-900"
        >
          <option value="5" className="noOfQuestions-5">
            05
          </option>
          <option value="10" className="noOfQuestions-10">
            10
          </option>
          <option value="20" className="noOfQuestions-20">
            20
          </option>
        </select>
      </div>
      <Link
        to="/quiz"
        state={{ noOfQuestions, difficulty }}
        className="py-2 px-6 bg-blue-600 text-white font-medium text-xl select-none rounded-lg mt-4"
      >
        Start Quiz
      </Link>
    </div>
  );
};

export default HomePage;
