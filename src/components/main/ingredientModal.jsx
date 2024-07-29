import React from "react";
import { Header, MenuBar } from "./main";
import "./css/ingredientModal.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const IngredientModal = () => {
  //css 개판으로 해놔서 수정해야함
  const location = useLocation();
  const foodinfo = JSON.parse(location.state.foodinfo);
  const foodName = foodinfo[0];
  const cal = foodinfo[1];
  const protein = foodinfo[3];
  const carb = foodinfo[2];
  const fat = foodinfo[4];
  const [number, setnumber] = useState(0);
  const plus = () => {
    setnumber((current) => Math.min(current + 50, 1500));
  };
  const minus = () => {
    setnumber((current) => Math.max(current - 50, 0));
  };
  const [gram, setGram] = useEffect(1);

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
              <p>{cal}</p>
              <p>kcal</p>
            </div>
          </li>
          <li className="carbInfo">
            <p>탄수화물</p>
            <div>
              <p>{carb}</p>
              <p>g</p>
            </div>
          </li>
          <li className="proteinInfo">
            <p>단백질</p>
            <div>
              <p>{protein}</p>
              <p>g</p>
            </div>
          </li>
          <li className="lipidInfo">
            <p>지방</p>
            <div>
              <p>{fat}</p>
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
          <button className="addBtn">추가</button>
        </div>
      </section>
    </>
  );
};

export default IngredientModal;
