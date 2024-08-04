import React from "react";
import "./css/mainPage.css";
import  TypeOfMealsModal  from "./typeOfMealsModal";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link, NavLink } from "react-router-dom";

const MainPage = () => {
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
  const savedMeals = JSON.parse(localStorage.getItem("savedMeals") || "[]");
  const totalIntake = {
    breakfast: { calories: 0, carbs: 0, protein: 0, fat: 0 },
    lunch: { calories: 0, carbs: 0, protein: 0, fat: 0 },
    dinner: { calories: 0, carbs: 0, protein: 0, fat: 0 },
    snacks: { calories: 0, carbs: 0, protein: 0, fat: 0 },
    total: { calories: 0, carbs: 0, protein: 0, fat: 0 },
  };
  savedMeals.forEach((meal) => {
    const calories = parseFloat(meal.new_calories) || 0;
    const carbs = parseFloat(meal.new_carbs) || 0;
    const protein = parseFloat(meal.new_protein) || 0;
    const fat = parseFloat(meal.new_fat) || 0;

    const time = meal.time || "";

    if (totalIntake[time]) {
      totalIntake[time].calories += calories;
      totalIntake[time].carbs += carbs;
      totalIntake[time].protein += protein;
      totalIntake[time].fat += fat;
    }

    totalIntake.total.calories += calories;
    totalIntake.total.carbs += carbs;
    totalIntake.total.protein += protein;
    totalIntake.total.fat += fat;
  });
  const totalInfo = {
    total_breakfast: totalIntake.breakfast.calories,
    total_lunch: totalIntake.lunch.calories,
    total_dinner: totalIntake.dinner.calories,
    total_snacks: totalIntake.snacks.calories,
    total_calories: totalIntake.total.calories,
    total_carbs: totalIntake.total.carbs,
    total_protein: totalIntake.total.protein,
    total_fat: totalIntake.total.fat,
  };

  useEffect(() => {
    // localStorage에 값이 없으면 저장
    if (!localStorage.getItem("re_carbs")) {
      localStorage.setItem("re_carbs", requiredCarbs);
      localStorage.setItem("re_prot", requiredProtein);
      localStorage.setItem("re_fat", requiredFat);
    }
  }, [requiredCarbs, requiredProtein, requiredFat]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <>
      <Header />
      <MainPageContent
        re_cal={requiredIntake}
        re_carb={requiredCarbs}
        re_prot={requiredProtein}
        re_fat={requiredFat}
        totalInfo={totalInfo}
        onOpen = {handleModalOpen}
      />
      <MenuBar />
      {isModalOpen && (
        <>
        <div className="bg" onClick={handleModalClose}></div>
        <TypeOfMealsModal onClose={handleModalClose}/>
        </>
      )}
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

const MainPageContent = ({ re_cal, re_carb, re_prot, re_fat, totalInfo, onOpen}) => {
  const foodType = [
    {text: '아침', value: 'breakfast'},
    {text: '점심', value: 'lunch'},
    {text: '저녁', value: 'dinner'},
    {text: '기타', value: 'snacks'},
  ]
  const nutrition = [
    {text: '칼로리', value: 'calories', unit: 'kal', recommended: "re_cal"},
    {text: '탄수화물', value: 'carbs', unit: 'g', recommended: "re_carb"},
    {text: '단백질', value: 'protein', unit: 'g', recommended: "re_prot"},
    {text: '지방', value: 'fat', unit: 'g', recommended: "re_fat"}
  ]
  const recommendedValues = {re_cal,re_carb,re_prot,re_fat};

  return (
    <main className="main mainContainer">
      <section id="inputSection">
        <h3 className="h3Txt">식단 입력</h3>
        <div className="innerBox">
          <div className="inputBox">
            <p>식단 입력</p>
            <div className="inputBtnContent" onClick={onOpen}>
              <p className="inputTxt">입력하러 가기 &gt;</p>
              <span className="inputIcon"></span>
            </div>
          </div>
          <div className="caloriesBox">
            <div>
              <p>식사 별 칼로리</p>
              <button className="refreshBtn">
                <span class="material-symbols-outlined">refresh</span>
              </button>
            </div>
            <ul>
              {foodType.map((type,i)=>{
                return(
                  <li className={`${type.value}List`} key={i}>
                    <p>{type.text}</p>
                    <p>{totalInfo[`total_${type.value}`]} kcal</p>
                  </li>
                )
              })}
            </ul>
            <p>식단 별 자세한 영양 섭취량 확인하기 &gt;</p>
          </div>
        </div>
      </section>
      <section id="analysisSection">
        <h3 className="h3Txt">현재 섭취량 / 하루 권장 섭취량</h3>
        <ul className="detailBox">
          {nutrition.map((item,i)=>{
            return(
              <li className={`${item.value}Content`}>
                <p className={`${item.value}Txt itemTxt`}>{item.text}</p>
                <p className={`${item.value}Data`}>{totalInfo[`total_${item.value}`]} / {recommendedValues[item.recommended]} {item.unit}</p>
              </li>
            )
          })}
        </ul>
      </section>
      <section id="recommendationSection">
        <Link to='/home/food_recommendation'>
          <h3 className="h3Txt">나에게 맞는 식단 추천 받으러 가기</h3>
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </Link>
      </section>
    </main>
  );
};

const MenuBar = () => {
  const [menuItem, setMenuItem] = useState([
    {text: '홈', className: 'home'},
    {text: '캘린더', className: 'calender'},
    {text: '커뮤니티', className: 'community'},
    {text: '마이 페이지', className: 'myPage'}
  ])

  return ( 
    <div id="menuBox">
      <div className="menuBar">
        {menuItem.map((item,i)=>{
          return(
            <NavLink 
              key={i}
              to={`/${item.className}`} 
              className={`${item.className}Link menuLink`}
              activeClassName="activeNav"
            > 
              <span className={`${item.className}Icon`}></span>
              <p className={`${item.className}Txt`}>{item.text}</p>
          </NavLink>
          /* 해당 링크 활성화 됐을 때 background 색 변경 안먹음 */
          )
        })}
      </div>
    </div>
  );
};


export default MainPage;
export { Header, MainPageContent, MenuBar };
