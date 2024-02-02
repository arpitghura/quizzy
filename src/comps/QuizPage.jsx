import React, { useEffect, useState } from "react";

const QuizPage = () => {
  const [quesData, setQuesData] = useState(undefined);
  const [userSelection, setUserSelection] = useState([]);

  const uri = "https://opentdb.com/api.php?amount=5&difficulty=medium";

  const handleNext = () => {
    // save user selection
    // fetch next question
  };

  const handlePrevious = () => {
    // save user selection
    // fetch previous question
  };

  const fetchQuestions = async () => {
    const res = await fetch(uri);
    const data = await res.json();
    if (data.response_code === 0) {
      setQuesData(data.results); // data.results is an array of objects
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div>
      <div className="options flex justify-between p-2 bg-slate-50 w-[100vw]">
        <div className="bg-white text-black font-medium text-xl rounded-lg px-4 py-2">
          01/10
        </div>
        <div className="timer bg-yellow-500 text-black font-medium text-xl rounded-lg px-4 py-2">
          00:59
        </div>
        <div className="score bg-green-700 text-white font-medium text-xl rounded-lg px-4 py-2">
          Score: 0
        </div>
      </div>
      <div className="container py-6 px-10">
        <h1 className="question font-semibold text-2xl py-2 leading-loose">
          What was the name of the protagonist in the movie Commando (1985)?
        </h1>
        <div className="options">
          <div className="option mb-2">
            <input type="radio" name="ques" id="ques" />
            <label className="px-4 font-medium text-lg" htmlFor="ques-">
              Option - 1
            </label>
          </div>
          <div className="option mb-2">
            <input type="radio" name="ques" id="ques" />
            <label className="px-4 font-medium text-lg" htmlFor="ques-">
              Option - 2
            </label>
          </div>
          <div className="option mb-2">
            <input type="radio" name="ques" id="ques" />
            <label className="px-4 font-medium text-lg" htmlFor="ques-">
              Option - 3
            </label>
          </div>
          <div className="option mb-2">
            <input type="radio" name="ques" id="ques" />
            <label className="px-4 font-medium text-lg" htmlFor="ques-">
              Option - 4
            </label>
          </div>
        </div>
      </div>

      <div className="container options flex flex-row py-6 px-10">
        <button className="py-2 px-6 bg-gray-500 text-white font-base text-lg rounded-lg mr-2 ">
          Previous
        </button>
        <button className="py-2 px-6 bg-blue-500 text-white font-base text-lg rounded-lg ">
          Save & Next
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
