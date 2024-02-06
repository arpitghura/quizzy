import React from "react";
import { Link } from "react-router-dom";

const ResultPage = ({ score = 0, totalScore = 0 }) => {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] relative">
      <h1 className="font-bold text-4xl p-2">
        Your Score: {score}/{totalScore}
      </h1>
      <p className="text-lg">All the best for the next time!!</p>
      <Link
        className="py-2 px-6 bg-blue-500 text-white select-none font-medium text-lg rounded-lg mt-4"
        to="/"
      >
        Go Home
      </Link>
    </div>
  );
};
export default ResultPage;
