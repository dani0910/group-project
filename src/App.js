/* import './App.css'; */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroPage from "./components/Intro/intro";
import SignUpPage1 from "./components/signup/signup1";
import SignUpPage2 from "./components/signup/signup2";
import SignUpPage3 from "./components/signup/signup3";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<IntroPage />}></Route>
          <Route path="/signup1" element={<SignUpPage1 />}></Route>
          <Route path="/signup2" element={<SignUpPage2 />}></Route>
          <Route path="/signup3" element={<SignUpPage3 />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
