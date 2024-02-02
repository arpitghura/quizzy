import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <h1 className="font-bold text-4xl p-2">Welcome to the Quiz App</h1>
      <p className="text-lg">Powered by the Open Trivia Database API</p>
      <Link
        to="/quiz"
        className="py-2 px-6 bg-blue-500 text-white font-medium text-xl rounded-lg mt-4"
      >
        Start Quiz
      </Link>
    </div>
  );
};

export default HomePage;
