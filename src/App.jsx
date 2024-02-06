import HomePage from "./comps/HomePage";
import QuizPage from "./comps/QuizPage";
import Error404 from "./comps/error404";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";

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
