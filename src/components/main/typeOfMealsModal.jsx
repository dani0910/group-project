import React from "react";
import { Header, MainPageContent, MenuBar } from "./main";
import "./css/typeOfMealsModal.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TypeOfMealsModal = ({onClose}) => {
  const type = [
    {text: '아침', className: 'breakfast'},
    {text: '점심', className: 'lunch'},
    {text: '저녁', className: 'dinner'},
    {text: '간식', className: 'snack'},
  ]

  const [time, setTime] = useState("");
  const navigate = useNavigate();
  const getTime = (e) => setTime(e.target.value);
  const onsubmit = (e) => {
    e.preventDefault();
    console.log(time);
    navigate("/home/food_search", { state: { time } });
  };

  return (
    <section id="selectModal">
      <h3 className="modalTitle">식사 종류</h3>
      <form action="" onSubmit={onsubmit}>
        {type.map((type,i)=>{
          return(
            <div className={`${type.test}Type inputBox`} key={i}>
              <input
                type="radio"
                name="option"
                id={type.className}
                value={type.className}
                onChange={getTime}
              />
              <label className={`${type.className}Txt`} htmlFor={type.className}>{type.text}</label>
            </div>
          )
        })}
        <div className="btnBox">
          <button type="submit" className="selectBtn">선택</button>
          <button type="button" className="cancelBtn" onClick={onClose}>취소</button>
        </div>
      </form>
    </section>
  );
}

export default TypeOfMealsModal;
