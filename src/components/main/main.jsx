import React from "react";
import "./css/mainPage.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
const MainPage = () => {
  //css 개판으로 해놔서 수정해야함
  const requiredIntake = localStorage.getItem("required_intake");
  const [requiredCarbs, setRequiredCarbs] = useState(
    localStorage.getItem("re_carbs") ||
      ((parseFloat(requiredIntake) * 0.5) / 4).toFixed(1)
  );
  const [requiredProtein, setRequiredProtein] = useState(
    localStorage.getItem("re_prot") ||
      ((parseFloat(requiredIntake) * 0.15) / 4).toFixed(1)
  );
  const [requiredFat, setRequiredFat] = useState(
    localStorage.getItem("re_fat") ||
      ((parseFloat(requiredIntake) * 0.22) / 9).toFixed(1)
  );

  useEffect(() => {
    // localStorage에 값이 없으면 저장
    if (!localStorage.getItem("re_carbs")) {
      localStorage.setItem("re_carbs", requiredCarbs);
      localStorage.setItem("re_prot", requiredProtein);
      localStorage.setItem("re_fat", requiredFat);
    }
  }, [requiredCarbs, requiredProtein, requiredFat]);
  return (
    <>
      <Header />
      <MainPageContent
        re_cal={requiredIntake}
        re_carb={requiredCarbs}
        re_prot={requiredProtein}
        re_fat={requiredFat}
      />
      <MenuBar />
    </>
  );
};

const Header = () => {
  return (
    <header id="header">
      <div className="headerInner">
        <span className="logoImg"></span>
        <span className="noticeIcon"></span>
      </div>
    </header>
  );
};

const MainPageContent = ({ re_cal, re_carb, re_prot, re_fat }) => {
  return (
    <main className="main mainContainer">
      <section id="inputSection">
        <h3>식단 입력</h3>
        <div className="innerBox">
          <div className="inputBox">
            <p>식단 입력</p>
            <button className="inputBtnContent">
              <Link to="/food_search">
                <p className="inputTxt">입력하러 가기 &gt;</p>
                <span className="inputIcon"></span>
              </Link>
            </button>
          </div>
          <div className="caloriesBox">
            <div>
              <p>식사 별 칼로리</p>
              <button className="editBtn">
                <span class="material-symbols-outlined">edit</span>
              </button>
            </div>
            <ul>
              <li className="morningList">
                <p>아침</p>
                <p>0 kcal</p>
              </li>
              <li className="afternoonList">
                <p>점심</p>
                <p>120 kcal</p>
              </li>
              <li className="eveningList">
                <p>저녁</p>
                <p>80 kcal</p>
              </li>
              <li className="etcList">
                <p>기타</p>
                <p>0 kcal</p>
              </li>
            </ul>
            <p>식단 별 자세한 영양 섭취량 확인하기 &gt;</p>
          </div>
        </div>
      </section>
      <section id="analysisSection">
        <h3>현재 섭취량 / 하루 권장 섭취량</h3>
        {/*유저 권장 섭취량이 표시되도록 병경*/}
        <ul className="detailBox">
          <li className="kcalContent">
            <span></span>
            <p className="kcalTxt">칼로리</p>
            <p className="kcalData">0 / {re_cal} kcal</p>
          </li>
          <li className="carbohydrateContent">
            <span></span>
            <p className="carbohydrateTxt">탄수화물</p>
            <p className="carbohydrateData">0 /{re_carb} g </p>
          </li>
          <li className="proteinContent">
            <span></span>
            <p className="proteinTxt">단백질</p>
            <p className="proteinData">0 / {re_prot} g</p>
          </li>
          <li className="lipidContent">
            <span></span>
            <p className="lipidTxt">지방</p>
            <p className="lipidData">0 / {re_fat} g</p>
          </li>
          <p>자세히 보기 &gt;</p>
        </ul>
      </section>
      <section id="recommendationSection">
        <h3>나에게 맞는 식단 추천 받으러 가기</h3>
        <span class="material-symbols-outlined">arrow_forward_ios</span>
      </section>
    </main>
  );
};

const MenuBar = () => {
  return (
    <div id="menuBox">
      <ul className="menuBar">
        <li className="homeList">
          <a href="#" className="homeLink">
            <span className="homeIcon"></span>
          </a>
          <p className="homeTxt">홈</p>
        </li>
        <li>
          <a href="#" className="calenderLink">
            <span className="calenderIcon"></span>
          </a>
          <p className="calenderTxt">캘린더</p>
        </li>
        <li>
          <a href="#" className="communityLink">
            <span className="communityIcon"></span>
          </a>
          <p className="communityTxt">커뮤니티</p>
        </li>
        <li>
          <a href="#" className="myPageLink">
            <span className="myIcon"></span>
          </a>
          <p className="myPageTxt">마이 페이지</p>
        </li>
      </ul>
    </div>
  );
};

export default MainPage;
export { Header, MainPageContent, MenuBar };
