import React, { useEffect, useState, useRef } from "react";
import parse from "html-react-parser";
import ResultPage from "./ResultPage";
import { useLocation } from "react-router-dom";
import serverDownImg from "/server_down.svg";

const QuizPage = () => {
  const location = useLocation();

  const noOfQuestions = location?.state?.noOfQuestions || 5;
  const difficulty = location?.state?.difficulty || "easy";
  const category = location?.state?.category || 0;

  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [allOptions, setAllOptions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timer, setTimer] = useState(30);

  const [score, setScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [userSelection, setUserSelection] = useState(null);

  const [APIError, setAPIError] = useState(false);
  const intervalTimer = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  const uri = `https://opentdb.com/api.php?amount=${noOfQuestions}&difficulty=${difficulty}&category=${category}&type=multiple`;

  const options = document.querySelectorAll(".option");
  const submitBtn = document.querySelector("#submitBtn");
  const nextBtn = document.querySelector("#nextBtn");

  const handleNext = () => {
    if (currentQuestion + 1 >= noOfQuestions) {
      setIsQuizOver(true);
      clearInterval(intervalTimer);
      nextBtn.innerText = "Finish";
      return;
    }

    if (userSelection !== null) {
      handleSubmit();
      return;
    }

    clearClasses();
    clearInterval(intervalTimer);
    setTimer(30);
    setUserSelection(null);
    setIsTimerRunning(true);
    submitBtn.disabled = false;
    setCurrentQuestion((prev) => prev + 1);
  };

  const clearClasses = () => {
    options.forEach((option) => {
      option.classList.remove("selected");
      option.classList.remove("correct");
      option.classList.remove("incorrect");
      option.disabled = false;
    });
  };

  const handleOptionClick = (e) => {
    // remove selected class from all options
    clearClasses();
    // add selected class to the clicked option
    e.target.classList.add("selected");
    // save user selection
    setUserSelection(e.target.id);
  };

  const handleSubmit = () => {
    // disable all options
    options.forEach((option) => {
      option.disabled = true;
    });

    // disable submit button
    submitBtn.disabled = true;

    // stop timer
    setIsTimerRunning(false);
    clearInterval(intervalTimer);

    // check if selected option is correct
    if (userSelection) {
      const selectedOption = document.getElementById(userSelection);
      const selectedOptionText = selectedOption.textContent;
      const correctAns = correctAnswers[currentQuestion];
      if (selectedOptionText === correctAns) {
        setScore(score + 1);
        selectedOption.classList.add("correct");
      } else {
        selectedOption.classList.add("incorrect");
        // find correct option and highlight it
        const correctOption = document.getElementsByName(
          `option-${correctAnswers[currentQuestion]}`
        )[0];
        correctOption.classList.add("correct");
      }

      // set user selection to null
      setUserSelection(null);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchQuestions = async () => {
      try {
        const res = await fetch(uri);
        const data = await res.json();

        if (data.response_code !== 0) {
          throw data.response_code;
        }

        console.log(data.results);

        const correctAns = data.results.map((ques) => {
          if (ques.correct_answer.includes("&")) {
            return parse(ques.correct_answer);
          }
          return ques.correct_answer;
        });

        const allOptions = data.results.map((ques) => {
          let options = [...ques.incorrect_answers, ques.correct_answer];
          // check if options contain html entities
          options = options
            .map((option) => {
              if (option.includes("&")) {
                return parse(option);
              }
              return option;
            })
            .sort(() => Math.random() - 0.5);
          return options;
        });

        const allQuestions = data.results.map((ques) => {
          // check if question contains html entities
          if (ques.question.includes("&")) {
            return parse(ques.question);
          }
          return ques.question;
        });

        setCorrectAnswers(correctAns);
        setAllOptions(allOptions);
        setAllQuestions(allQuestions);
        setIsTimerRunning(true);
        setIsLoading(false);
      } catch (err) {
        console.log("Error Code:", err);
        setIsLoading(false);
        setAPIError(true);
        return;
      }
    };

    clearClasses();
    fetchQuestions();
  }, []);

  useEffect(() => {
    // start timer
    if (isTimerRunning) {
      intervalTimer.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    if (!isTimerRunning || timer === 0) {
      clearInterval(intervalTimer.current);
    }
  }, [isTimerRunning]);

  useEffect(() => {
    if (timer == 0) {
      setIsTimerRunning(false);
      handleSubmit();
      clearInterval(intervalTimer);
    }
  }, [timer]);

  useEffect(() => {
    if (isQuizOver) {
      clearInterval(intervalTimer);
    }
  }, [isQuizOver]);

  return (
    <div>
      {isLoading && !APIError && (
        <div className="flex flex-col justify-center items-center h-[100vh]">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <h2 className="text-xl font-semibold">
            Please Wait...Fetching Data from API.
          </h2>
        </div>
      )}
      {!APIError && !isLoading ? (
        <div className={`${isQuizOver && "hidden"}`}>
          <div className="options flex justify-between p-2 w-[100vw] bg-gray-800 shadow-lg shadow-gray-900">
            <div className="font-medium text-lg rounded-lg px-4 py-2">
              Question {currentQuestion + 1} of {noOfQuestions}
            </div>
            <div
              className={`timer ${
                timer <= 5
                  ? "bg-red-500 text-slate-100"
                  : "bg-yellow-500 text-black"
              } text-black font-medium text-xl text-center rounded-lg px-4 py-2 min-w-max`}
            >
              <p>
                {timer <= 0
                  ? `Time's Up`
                  : timer < 10
                  ? `00:0${timer}`
                  : `00:${timer}`}
              </p>
            </div>
            <div className="score bg-green-700 text-white font-medium text-xl rounded-lg px-4 py-2">
              Score: {score}
            </div>
          </div>
          <div className="container py-6 px-10">
            <h1 className="question font-semibold text-2xl py-2 leading-normal">
              {allQuestions[currentQuestion]}
            </h1>
            <div className="options">
              <button
                id="option1"
                className="option bg-gray-500 select-none py-2 px-4 rounded-lg w-full text-slate-100 text-lg text-left mb-3"
                onClick={handleOptionClick}
                name={`option-${
                  allOptions[currentQuestion] && allOptions[currentQuestion][0]
                }`}
              >
                {allOptions[currentQuestion] && allOptions[currentQuestion][0]}
              </button>
              <button
                id="option2"
                className="option bg-gray-500 select-none py-2 px-4 rounded-lg w-full text-slate-100 text-lg text-left mb-3"
                onClick={handleOptionClick}
                name={`option-${
                  allOptions[currentQuestion] && allOptions[currentQuestion][1]
                }`}
              >
                {allOptions[currentQuestion] && allOptions[currentQuestion][1]}
              </button>
              <button
                id="option3"
                className="option bg-gray-500 py-2 px-4 select-none rounded-lg w-full text-slate-100 text-lg text-left mb-3"
                onClick={handleOptionClick}
                name={`option-${
                  allOptions[currentQuestion] && allOptions[currentQuestion][2]
                }`}
              >
                {allOptions[currentQuestion] && allOptions[currentQuestion][2]}
              </button>
              <button
                id="option4"
                className="option bg-gray-500 py-2 px-4 select-none rounded-lg w-full text-slate-100 text-lg text-left mb-3"
                onClick={handleOptionClick}
                name={`option-${
                  allOptions[currentQuestion] && allOptions[currentQuestion][3]
                }`}
              >
                {allOptions[currentQuestion] && allOptions[currentQuestion][3]}
              </button>
            </div>
          </div>

          <div className="container options flex flex-row py-6 px-10">
            <button
              className="py-2 px-6 bg-blue-600 text-white select-none font-base text-lg rounded-lg mr-2 disabled:bg-blue-400"
              onClick={handleSubmit}
              id="submitBtn"
            >
              Submit
            </button>
            <button
              className="py-2 px-6 bg-violet-600 text-white select-none font-base text-lg rounded-lg"
              onClick={handleNext}
              id="nextBtn"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[100vh] p-10">
          <img
            src={serverDownImg}
            alt="Server Error"
            height="500"
            width="500"
          />
          <h1 className="font-semibold text-2xl p-2 mt-3 text-yellow-500">
            Error fetching questions. Please try again in some time.
          </h1>
        </div>
      )}
      {isQuizOver && <ResultPage score={score} totalScore={noOfQuestions} />}
    </div>
  );
};

export default QuizPage;
