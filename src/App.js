/* import './App.css'; */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroPage from "./components/Intro/intro";
import SignUpPage1 from "./components/signup/signup1";
import SignUpPage2 from "./components/signup/signup2";
import SignUpPage3 from "./components/signup/signup3";
import MainPage from "./components/main/main";
import SelectFoodType from "./components/main/selectFoodType";
import FoodSearch from "./components/main/foodSearch";
import IngredientModal from "./components/main/ingredientModal";
import Recommendation from "./components/main/recommendation";
import Community from"./components/community/community"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<IntroPage />}></Route>
          <Route path="/signup1" element={<SignUpPage1 />}></Route>
          <Route path="/signup2" element={<SignUpPage2 />}></Route>
          <Route path="/signup3" element={<SignUpPage3 />}></Route>
          <Route path="/home" element={<MainPage />}></Route>
          <Route path="/home/food_type_select" element={<SelectFoodType />}></Route>
          <Route path="/home/food_search" element={<FoodSearch />}></Route>
          <Route path="/home/food_ingredient" element={<IngredientModal />}></Route>
          <Route path="/home/food_recommendation" element={<Recommendation />}></Route>
          <Route path="/community" element={<Community />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;