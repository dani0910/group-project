import React from "react";
import { Header, MenuBar } from "./main";
import "./css/ingredientModal.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const IngredientModal = () => {
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

  const ingredient = [
    {text: '칼로리' , value: 'calories', unit: 'kacl'},
    {text: '탄수화물' , value: 'carbs', unit: 'g'},
    {text: '단백질' , value: 'protein', unit: 'g'},
    {text: '지방' , value: 'fat', unit: 'g'}
  ]

  return (
    <>
      <section id="ingredientModalSection">
        <div className="foodTitle">
          <h4>{foodName}</h4>
          <p className="ingredientTxt">1개 {number}g 기준</p>
          <button><span class="material-symbols-outlined">favorite</span></button>
        </div>
        <ul className="ingredientInfo">
          {ingredient.map((ingredient,i)=>{
            return(
              <li className={`${ingredient.value}List`} key={i}>
                <p className="ingredientTxt">{ingredient.text}</p>
                <div>
                  <p>{meal[`new_${ingredient.value}`]}</p>
                  <p className="ingredientTxt">{ingredient.unit}</p>
                </div>
              </li>
            )
          })}
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
