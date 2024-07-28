import React from "react";
import { Header, MenuBar } from './main'
import "./css/ingredientModal.css";
import { useState } from "react";

const IngredientModal = () => { //css 개판으로 해놔서 수정해야함

  return (
    <>
      <section id="ingredientModalSection">
        <div className="foodTitle">
          <h4>사과</h4>
          <p>1개 (250g) 기준</p>
        </div>
        <ul className="ingredientInfo">
          <li className="kcalInfo">
            <p>칼로리</p>
            <div>
              <p>142</p>
              <p>kcal</p>
            </div>
          </li>
          <li className="carbInfo">
            <p>탄수화물</p>
            <div>
              <p>35.3</p>
              <p>g</p>
            </div>
          </li>
          <li className="proteinInfo">
            <p>단백질</p>
            <div>
              <p>0.5</p>
              <p>g</p>
            </div>
          </li>
          <li className="lipidInfo">
            <p>지방</p>
            <div>
              <p>1.6</p>
              <p>g</p>
            </div>
          </li>
        </ul>
        <div className="addContainer">
          <div className="quantityControl">
            <button className="minusQuantity">-</button>
            <p className="quantity">250 g</p>
            <button className="plusQuantity">+</button>
          </div>
          <button className="addBtn">추가</button>
        </div>
      </section>
    </>
  );
};


export default IngredientModal;