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

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<IntroPage />}></Route>
          <Route path="/signup1" element={<SignUpPage1 />}></Route>
          <Route path="/signup2" element={<SignUpPage2 />}></Route>
          <Route path="/signup3" element={<SignUpPage3 />}></Route>
          <Route path="/main_page" element={<MainPage />}></Route>
          <Route path="/food_type_select" element={<SelectFoodType />}></Route>
          <Route path="/food_search" element={<FoodSearch />}></Route>
          <Route path="/food_ingredient" element={<IngredientModal/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
