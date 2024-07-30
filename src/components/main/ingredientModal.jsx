import React from "react";
import { Header, MenuBar } from "./main";
import "./css/ingredientModal.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const IngredientModal = () => {
  //css 개판으로 해놔서 수정해야함
  const location = useLocation();
  const navigate = useNavigate();
  let foodinfo = [];
  try {
    console.log(location.state?.foodinfo || []);
    foodinfo = location.state?.foodinfo || [];
  } catch (e) {
    console.error("Failed to parse foodinfo:", e);
    foodinfo = [];
  }
  const foodName = foodinfo.name;
  const time = foodinfo.time;
  const cal = parseFloat(foodinfo.calories);
  const protein = parseFloat(foodinfo.protein);
  const carb = parseFloat(foodinfo.carb);
  const fat = parseFloat(foodinfo.fat);
  const [number, setnumber] = useState(100);
  const [meal, setMeal] = useState({});
  const [savedMeals, setSavedMeals] = useState([]);
  const [saveMealsFlag, setSaveMealsFlag] = useState(false);
  const plus = () => {
    setnumber((current) => Math.min(current + 10, 1500));
  };
  const minus = () => {
    setnumber((current) => Math.max(current - 10, 0));
  };
  useEffect(() => {
    const newMeal = {
      new_calories: ((parseFloat(cal) * number) / 100).toFixed(2),
      new_carbs: ((parseFloat(carb) * number) / 100).toFixed(2),
      new_protein: ((parseFloat(protein) * number) / 100).toFixed(2),
      new_fat: ((parseFloat(fat) * number) / 100).toFixed(2),
      time: time,
    };
    setMeal(newMeal);
  }, [cal, carb, protein, fat, number]);

  useEffect(() => {
    const loadedMeals = JSON.parse(localStorage.getItem("savedMeals")) || []; // <-- 변경된 부분
    setSavedMeals(loadedMeals);
  }, []);

  const onclick = (e) => {
    e.preventDefault();
    setSavedMeals((prevMeal) => {
      const updatedMeals = [...prevMeal, meal];
      localStorage.setItem("savedMeals", JSON.stringify(updatedMeals));
      setSaveMealsFlag(true);
      return updatedMeals;
    });
    // navigate("/home/food_search");
  };

  useEffect(() => {
    if (saveMealsFlag) {
      navigate("/home");
    }
  }, [saveMealsFlag]);

  return (
    <>
      <section id="ingredientModalSection">
        <div className="foodTitle">
          <h4>{foodName}</h4>
        </div>
        <ul className="ingredientInfo">
          <li className="kcalInfo">
            <p>칼로리</p>
            <div>
              <p>{meal.new_calories}</p>
              <p>kcal</p>
            </div>
          </li>
          <li className="carbInfo">
            <p>탄수화물</p>
            <div>
              <p>{meal.new_carbs}</p>
              <p>g</p>
            </div>
          </li>
          <li className="proteinInfo">
            <p>단백질</p>
            <div>
              <p>{meal.new_protein}</p>
              <p>g</p>
            </div>
          </li>
          <li className="lipidInfo">
            <p>지방</p>
            <div>
              <p>{meal.new_fat}</p>
              <p>g</p>
            </div>
          </li>
        </ul>
        <div className="addContainer">
          <div className="quantityControl">
            <button className="minusQuantity" onClick={minus}>
              -
            </button>
            <p className="quantity">{number}g</p>
            <button className="plusQuantity" onClick={plus}>
              +
            </button>
          </div>
          <button className="addBtn" onClick={onclick}>
            추가
          </button>
        </div>
      </section>
    </>
  );
};

export default IngredientModal;
