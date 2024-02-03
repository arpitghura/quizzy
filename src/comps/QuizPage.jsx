import React, { useEffect, useState, useRef } from "react";
import parse from "html-react-parser";

const QuizPage = ({ difficulty = "medium", noOfQuestions = 2 }) => {
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [allOptions, setAllOptions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timer, setTimer] = useState(60);

  const [score, setScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [userSelection, setUserSelection] = useState(null);

  const [APIError, setAPIError] = useState(false);
  const intervalTimer = useRef(null);

  const uri = `https://opentdb.com/api.php?amount=${noOfQuestions}&difficulty=${difficulty}&type=multiple`;

  const handleNext = () => {
    // save user selection
    // fetch next question
    clearClasses();
    setCurrentQuestion((prev) => prev + 1);
    clearInterval(intervalTimer);
    setIsTimerRunning(true);
    setUserSelection(null);
    setTimer(60);
  };

  const clearClasses = () => {
    const options = document.querySelectorAll(".option");
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
    const options = document.querySelectorAll(".option");
    options.forEach((option) => {
      option.disabled = true;
    });

    // stop timer
    setIsTimerRunning(false);
    clearInterval(intervalTimer);
    console.log("User Selection: ", userSelection);

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
    }
  };

  const fetchQuestions = async () => {
    const res = await fetch(uri);
    const data = await res.json();

    console.log("Data: ", data);
    if (data.response_code !== 0) {
      console.log(`Error: `, data.response_code);
      setAPIError(true);
      return;
    }

    // set correct answers
    const correctAns = data.results.map((ques) => {
      return ques.correct_answer;
    });

    setCorrectAnswers(correctAns);

    // all options (correct and incorrect)
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

    setAllOptions(allOptions);

    // get all questions
    const allQuestions = data.results.map((ques) => {
      // check if question contains html entities
      if (ques.question.includes("&")) {
        return parse(ques.question);
      }
      return ques.question;
    });

    setAllQuestions(allQuestions);
    // start timer
    setIsTimerRunning(true);
  };

  useEffect(() => {
    setAPIError(false);
    setIsTimerRunning(false);
    clearInterval(intervalTimer);
    setTimer(60);
    setScore(0);
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
      console.log("Timer Stopped");
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
    if (currentQuestion === noOfQuestions) {
      setIsQuizOver(true);
    }
  }, [currentQuestion]);

  return (
    <div>
      {!APIError ? (
        <>
          <div className="options flex justify-between p-2 bg-slate-50 w-[100vw]">
            <div className="bg-white text-black font-medium text-lg rounded-lg px-4 py-2">
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
                  ? `Time's Up ${timer}`
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
                className="option bg-gray-500 py-2 px-4 rounded-lg w-full text-slate-100 text-lg text-left mb-3"
                onClick={handleOptionClick}
                name={`option-${
                  allOptions[currentQuestion] && allOptions[currentQuestion][0]
                }`}
              >
                {allOptions[currentQuestion] && allOptions[currentQuestion][0]}
              </button>
              <button
                id="option2"
                className="option bg-gray-500 py-2 px-4 rounded-lg w-full text-slate-100 text-lg text-left mb-3"
                onClick={handleOptionClick}
                name={`option-${
                  allOptions[currentQuestion] && allOptions[currentQuestion][1]
                }`}
              >
                {allOptions[currentQuestion] && allOptions[currentQuestion][1]}
              </button>
              <button
                id="option3"
                className="option bg-gray-500 py-2 px-4 rounded-lg w-full text-slate-100 text-lg text-left mb-3"
                onClick={handleOptionClick}
                name={`option-${
                  allOptions[currentQuestion] && allOptions[currentQuestion][2]
                }`}
              >
                {allOptions[currentQuestion] && allOptions[currentQuestion][2]}
              </button>
              <button
                id="option4"
                className="option bg-gray-500 py-2 px-4 rounded-lg w-full text-slate-100 text-lg text-left mb-3"
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
              className="py-2 px-6 bg-blue-500 text-white font-base text-lg rounded-lg mr-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="py-2 px-6 bg-violet-500 text-white font-base text-lg rounded-lg"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-[100vh] p-10">
          <img
            src="/server_down.svg"
            alt="Server Error"
            height="500"
            width="500"
          />
          <h1 className="font-semibold text-2xl p-2 mt-3 text-yellow-500">
            Error fetching questions. Please try again in some time.
          </h1>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
