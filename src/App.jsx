import { useState } from "react";
import HomePage from "./comps/HomePage";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import QuizPage from "./comps/QuizPage";
import ResultPage from "./comps/ResultPage";
import "./App.css";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/result" element={<ResultPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
