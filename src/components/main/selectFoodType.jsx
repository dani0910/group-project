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
  //inputBtnContent 버튼 누르면 모달 창 띄워주고 뒷 배경 #000 opacity: 0.2주세여
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
      <div className="ModalContainer">
        <h2 className="modalTitle">식사 종류</h2>
        <form action="" onSubmit={onsubmit}>
          <div className="morningType">
            <input
              type="radio"
              className=""
              name="option"
              id="breakfast"
              value="breakfast"
              onChange={getTime}
            />
            <label className="morningTxt" htmlFor="breakfast">
              아침
            </label>
          </div>
          <div className="lunchType">
            <input
              type="radio"
              className=""
              name="option"
              id="lunch"
              value="lunch"
              onChange={getTime}
            />
            <label className="lunchTxt" htmlFor="lunch">
              점심
            </label>
          </div>
          <div className="dinnerType">
            <input
              type="radio"
              className=""
              name="option"
              id="dinner"
              value="dinner"
              onChange={getTime}
            />
            <label className="dinnerTxt" htmlFor="dinner">
              저녁
            </label>
          </div>
          <div className="snackType">
            <input
              type="radio"
              className=""
              name="option"
              id="snacks"
              value="snacks"
              onChange={getTime}
            />
            <label className="snackTxt" htmlFor="snacks">
              간식
            </label>
          </div>
          <button type="submit">선택</button>
        </form>
        <h2 className="cancelBtn">취소</h2>
        <div id="bg"></div>
      </div>
    </section>
  );
};

export default SelectFoodType;
