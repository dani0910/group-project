import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./css/recommendation.css";
import { Header, MenuBar } from "./main";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* 아직 api 연동 안되서 코드만 미리 작성해놓고 주석 처리 해놨어영 */

const Recommendation = () => {
  const location = useLocation();
  const dailyMeals = location.state.dailyMeals;
  const re_cal = location.state.re_cal;
  const re_carb = location.state.re_carb;
  const re_prot = location.state.re_prot;
  const re_fat = location.state.re_fat;

  const required_info = {
    total_calories: dailyMeals.total_calories,
    total_carbs: dailyMeals.total_carbs,
    total_fat: dailyMeals.total_fat,
    total_protein: dailyMeals.total_protein,
    recommended_carbs: re_carb,
    recommended_calories: re_cal,
    recommended_protein: re_prot,
    recommended_fat: re_fat,
  };
  const [response, setResponse] = useState({});
  console.log("navigated : ", required_info);
  /*
  const onRecommend = async()=> {
    const baseURL = 'http://127.0.0.1:8000/api/nutrition/';
    try {
      const response = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(required_info),
      });

      if (!response.ok) {
        alert("서버에서 오류가 발생했습니다.");
        return;
      }

      const data = await response.json();
      console.log("response received", data);
      setResponse(data);
      
    } catch (error) {
      console.error("Error occurred during login:", error);
      alert("Error occurred " + error.message);
    }

  }

  const deficit = response.deficit;
  const recommendations = response.recommendations;

  const onDeficit= ()=>{
    if(deficit===calories){
      return(
        `칼로리 과잉 (${dailyMeals.total_calories} / ${re_cal})`
      );
    }else if(deficit===carbs){
      return(
        `탄수화물 부족 (${dailyMeals.total_carbs} / ${re_carb})`
      );
    }else if(deficit===protein){
      return(
        `단백질 부족 (${dailyMeals.total_protein} / ${re_prot})`
      );
    }else if(deficit===fat){
      return(
        `지방 부족 (${dailyMeals.total_fat} / ${re_fat})`
      );
    }
  };  */

  const settings = {
    arrows: true, //양 끝 화살표
    dots: true, // 슬라이드 아래에 개수를 점 형태로
    infinite: true,
    speed: 500,
    slidesToShow: 1, //한번에 표시할 슬라이드 개수
    slidesToScroll: 1, //옆으로 스크롤할 때 보여줄 슬라이드 개수
    autoplay: true,
    autoplaySpeed: 2500,
  };

  const navigate = useNavigate();
  const goBack = () => navigate("/home");

  return (
    <>
      <Header />
      <main className="main recMain">
        <h4 className="prevBtnFood" onClick={goBack}>
          &lt; 식단 추천 받기
        </h4>

        <section className="recommendationSection">
          <div className="nutritionWarningBox">
            <h4>현재 나의 영양 문제</h4>
            {/*}    <p> {onDeficit()}</p>  */}
          </div>
          <div className="recFoodContainer">
            <h4>추천 식단</h4>
            <Slider {...settings}>
              {" "}
              {/*}
            {recommendations.map((item) => (
                <div key={item.id} className="slideRecItem">
                    <img src="" alt={item.name} />
                    <p>{item.name}</p>
                    <a href="#">해당 식단 레시피 보러 가기 &gt;</a>
                </div>
            ))}  */}
            </Slider>
          </div>
        </section>
      </main>
      <MenuBar />
    </>
  );
};

export default Recommendation;
