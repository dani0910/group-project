import React from "react";
import { Header, MainPageContent, MenuBar } from "./main";
import "./css/selectFood.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SelectFoodType = () => {
  //css 개판으로 해놔서 수정해야함

  return (
    <>
      {/* <Header/>
        <MainPageContent/>        
        <MenuBar/> */}
      <TypeOfMealsModal />
      <div id="bg"></div>
    </>
  );
};

const TypeOfMealsModal = () => {
  const type = [
    { text: "아침", className: "아침" },
    { text: "점심", className: "점심" },
    { text: "저녁", className: "저녁" },
    { text: "간식", className: "간식" },
  ];

  const [time, setTime] = useState("");
  const navigate = useNavigate();
  const getTime = (e) => setTime(e.target.value);
  const goBack = () => {
    navigate("/home");
  };
  const onsubmit = (e) => {
    e.preventDefault();
    console.log(time);
    if (!time) {
      alert("식사 종류를 선택해 주세요.");
      return;
    } else {
      navigate("/home/food_search", { state: { time } });
    }
  };

  return (
    <section id="selectModal">
      <h3 className="modalTitle">식사 종류</h3>
      <form action="" onSubmit={onsubmit}>
        {type.map((type, i) => {
          return (
            <div className={`${type.test}Type inputBox`} key={i}>
              <input
                type="radio"
                name="option"
                id={type.className}
                value={type.className}
                onChange={getTime}
              />
              <label
                className={`${type.className}Txt`}
                htmlFor={type.className}
              >
                {type.text}
              </label>
            </div>
          );
        })}
        <div className="btnBox">
          <button type="submit" className="selectBtn">
            선택
          </button>
          <button type="button" onClick={goBack} className="cancelBtn">
            취소
          </button>
        </div>
      </form>
      <div id="bg" style={{ display: "none" }}></div>
    </section>
  );
};

export default SelectFoodType;
