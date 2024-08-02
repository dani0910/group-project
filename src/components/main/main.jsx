import React from "react";
import "./css/mainPage.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link, NavLink } from "react-router-dom";
const MainPage = () => {
  const [profile, setProfile] = useState({});
  const location = useLocation();
  const token = localStorage.getItem("token");
  const getProfile = async (e) => {
    if (!token) {
      alert("No token found");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/profile/", {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        console.log(data);
      } else {
        const errorData = await response.json();
        alert(errorData);
      }
    } catch (error) {
      console.error("Fetch error: " + error.message);
    }
  };

  useEffect(() => {
    getProfile();
    console.log("savedmeals : ", savedMeals);
  }, []);

  const requiredIntake = profile.required_intake || 0;
  const requiredCarbs =
    ((parseFloat(requiredIntake) * 0.5) / 4).toFixed(1) || 0;
  const requiredProtein =
    ((parseFloat(requiredIntake) * 0.15) / 4).toFixed(1) || 0;
  const requiredFat = ((parseFloat(requiredIntake) * 0.22) / 9).toFixed(1) || 0;
  const initialMeals = location.state?.savedMeals || {};
  const [savedMeals, setSavedMeals] = useState(initialMeals);

  useEffect(() => {
    // location.state?.savedMeals가 변경될 때 상태를 업데이트
    setSavedMeals(location.state?.savedMeals || {});
  }, [location.state?.savedMeals]);

  /*const totalIntake = {
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
  }; */

  return (
    <>
      <Header />
      <MainPageContent
        re_cal={requiredIntake}
        re_carb={requiredCarbs}
        re_prot={requiredProtein}
        re_fat={requiredFat}
        savedMeals={savedMeals}
        setSavedMeals={setSavedMeals}
        token={token}
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

const MainPageContent = ({
  re_cal,
  re_carb,
  re_prot,
  re_fat,
  savedMeals,
  token,
  setSavedMeals,
}) => {
  console.log("Saved meals in MainPageContent:", savedMeals, token);
  const foodType = [
    { text: "아침", value: "breakfast" },
    { text: "점심", value: "lunch" },
    { text: "저녁", value: "dinner" },
    { text: "기타", value: "snack" },
  ];
  const [deleteFlag, setDeleteFlag] = useState(false);
  const baseURL = "http://127.0.0.1:8000/api/food-intake/";
  const ondelete = async (e) => {
    e.preventDefault();

    const confirmedDelete = window.confirm(
      "그동안의 모든 식단 데이터를 삭제하시겠습니까?"
    );
    if (confirmedDelete) {
      try {
        const response = await fetch(baseURL, {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            alert("삭제할 데이터가 없습니다.");
            return;
          } else if (response.state === 401) {
            alert("인증이 필요합니다.");
            return;
          } else {
            alert("서버에서 오류가 발생했습니다.");
            return;
          }
        }

        alert("모든 식단 데이터가 삭제되었습니다.");
        setDeleteFlag(true);
      } catch (error) {
        console.error("Error occurred during delete:", error);
        alert("Error occurred " + error.message);
      }
    }
  };

  return (
    <main className="main mainContainer">
      <section id="inputSection">
        <h3>식단 입력</h3>
        <div className="innerBox">
          <div className="inputBox">
            <p>식단 입력</p>
            <Link to="/home/food_type_select" className="inputBtnContent">
              <p className="inputTxt">입력하러 가기 &gt;</p>
              <span className="inputIcon"></span>
            </Link>
          </div>
          <div className="caloriesBox">
            <div>
              <p>식사 별 칼로리</p>
              <button className="editBtn" onClick={ondelete}>
                <span class="material-symbols-outlined">edit</span>
              </button>
            </div>
            <ul>
              {foodType.map((type, i) => {
                return (
                  <li className={`${type.value}List`} key={i}>
                    <p>{type.text}</p>
                    <p>
                      {deleteFlag
                        ? 0
                        : savedMeals[type.value]?.total_calories || 0}
                      kcal
                    </p>
                  </li>
                );
              })}
            </ul>
            <p>식단 별 자세한 영양 섭취량 확인하기 &gt;</p>
          </div>
        </div>
      </section>
      <section id="analysisSection">
        <h3>현재 섭취량 / 하루 권장 섭취량</h3>

        <ul className="detailBox">
          <li className="kcalContent">
            <span></span>
            <p className="kcalTxt">칼로리</p>
            <p className="kcalData">
              {deleteFlag ? 0 : savedMeals.daily?.total_calories || 0} /{" "}
              {re_cal} kcal
            </p>
          </li>
          <li className="carbohydrateContent">
            <span></span>
            <p className="carbohydrateTxt">탄수화물</p>
            <p className="carbohydrateData">
              {deleteFlag ? 0 : savedMeals.daily?.total_carbs || 0} /{re_carb} g{" "}
            </p>
          </li>
          <li className="proteinContent">
            <span></span>
            <p className="proteinTxt">단백질</p>
            <p className="proteinData">
              {deleteFlag ? 0 : savedMeals.daily?.total_protein || 0} /{" "}
              {re_prot} g
            </p>
          </li>
          <li className="lipidContent">
            <span></span>
            <p className="lipidTxt">지방</p>
            <p className="lipidData">
              {deleteFlag ? 0 : savedMeals.daily?.total_fat || 0} / {re_fat} g
            </p>
          </li>
          <p>자세히 보기 &gt;</p>
        </ul>
      </section>
      <section id="recommendationSection">
        <Link to="/home/food_recommendation">
          <h3>나에게 맞는 식단 추천 받으러 가기</h3>
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </Link>
      </section>
    </main>
  );
};

const MenuBar = () => {
  const [menuItem, setMenuItem] = useState([
    { text: "홈", className: "home" },
    { text: "캘린더", className: "calender" },
    { text: "커뮤니티", className: "community" },
    { text: "마이 페이지", className: "myPage" },
  ]);

  return (
    <div id="menuBox">
      <div className="menuBar">
        {menuItem.map((item, i) => {
          return (
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
          );
        })}
      </div>
    </div>
  );
};

export default MainPage;
export { Header, MainPageContent, MenuBar };
