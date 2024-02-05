import { useState } from "react";
import HomePage from "./comps/HomePage";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import QuizPage from "./comps/QuizPage";
import ResultPage from "./comps/ResultPage";
import "./App.css";
import Error404 from "./comps/error404";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route exact path="/quiz" element={<QuizPage />} />
          <Route exact path="/" element={<HomePage />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
