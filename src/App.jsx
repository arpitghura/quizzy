import HomePage from "./comps/HomePage";
import QuizPage from "./comps/QuizPage";
import Error404 from "./comps/Error404";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app" data-testid="appComp">
        <Routes>
          <Route exact path="/quiz" element={<QuizPage />} />
          <Route exact path="/" element={<HomePage />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
