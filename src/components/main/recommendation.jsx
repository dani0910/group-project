import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./css/recommendation.css";
import { Header, MenuBar } from "./main";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Recommendation = () => {
  /* 로그인 안했을 때 작동되도록 임시
  const location = useLocation();
  const dailyMeals = 850;
  // const dailyMeals = location.state.daily;
  const re_cal = location.state.re_cal;
  const re_carb = location.state.re_carb;
  const re_prot = location.state.re_prot;
  const re_fat = location.state.re_fat;

  const required_info = {
    total_calories: parseFloat(dailyMeals.total_calories),
    total_carbs: parseFloat(dailyMeals.total_carbs),
    total_fat: parseFloat(dailyMeals.total_fat),
    total_protein: parseFloat(dailyMeals.total_protein),
    recommended_carbs: parseFloat(re_carb),
    recommended_calories: parseFloat(re_cal),
    recommended_protein: parseFloat(re_prot),
    recommended_fat: parseFloat(re_fat),
  }; */

  const required_info = {
    total_calories: 1800,
    total_carbs: 655,
    total_fat: 456,
    total_protein: 56,
    recommended_carbs: 1543,
    recommended_calories: 453,
    recommended_protein: 435,
    recommended_fat: 34535,
  };
  const [response, setResponse] = useState({});
  console.log("navigated : ", required_info);

  const onRecommend = async () => {
    const baseURL = "http://rollforward.xyz:3001/api/nutrition/recommend/";
    try {
      const response = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(required_info),
      });

      if (!response.ok) {
        alert(`서버에서 오류가 발생했습니다. 상태 코드: ${response.status}`);
        return;
      }

      const data = await response.json();
      console.log("response received", data);
      setResponse(data);
    } catch (error) {
      console.error("Error occurred during error:", error);
      alert("Error occurred " + error.message);
    }
  };

  useEffect(() => {
    onRecommend();
  }, []);

  useEffect(() => {
    console.log(response.recommendations);
  }, [response]);

  const recommendations = response.recommendations || [];

  {
    /*
  const onDeficit = () => {
    if (response.deficit === "calories") {
      return `칼로리 과잉 1865 / 621)`;
    } else if (response.deficit === "carbs") {
      return `탄수화물 부족 52 / 80)`;
    } else if (response.deficit === "protein") {
      return `단백질 부족 22 / 30)`;
    } else if (response.deficit === "fat") {
      return `지방 부족 5 / 8)`;
    }
  };
  */
  }
  const onDeficit = () => {
    if (response.deficit === "calories") {
      return `칼로리 과잉`;
    } else if (response.deficit === "carbs") {
      return `탄수화물 부족 `;
    } else if (response.deficit === "protein") {
      return `단백질 부족 `;
    } else if (response.deficit === "fat") {
      return `지방 부족`;
    }
  };

  const settings = {
    arrows: true, //양 끝 화살표
    dots: true, // 슬라이드 점
    infinite: true,
    speed: 500,
    slidesToShow: 1, //한번에 표시할 슬라이드 개수
    slidesToScroll: 1, //옆으로 스크롤할 때 보여줄 슬라이드 개수
    autoplay: true,
    autoplaySpeed: 2500, 
  };

  const navigate = useNavigate();
  const goBack = () => navigate("/home");

  // const sliderItem = [
  //   {img : "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMjJfMjM4%2FMDAxNjk3OTc3MDYwMDM4.I-I7SQBu_oO_fcqn8F2IpLWM2bNwdfPngOKUNPBDKisg.YiYCt8Z9qQl_paHfeM7y7bzBUMcg62oVBxI9AhUtAhog.JPEG.tkstoo%2F20231021%25A3%25DF185831.jpg&type=sc960_832", p: "닭도리탕"},
  //   {img : "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAzMjFfNDAg%2FMDAxNzEwOTkyMDUwNzIy.mptnk4LN5hYNRkyQTZxCi08Ae8MWZGXmjQrgV6BTTdgg.PytnxQ7L-BaE1DLJUxjZDgBvTigsmzNf_RTMAr5TZlUg.JPEG%2F%25B7%25F9%25BC%25F6%25BF%25B5%25B1%25E8%25C4%25A1%25C2%25EE%25B0%25B3-%25BD%25E6%25B3%25D7%25C0%25CF.jpg&type=sc960_832", p: "김치찌개"},
  //   {img : "https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxODA5MTNfOTUg%2FMDAxNTM2ODA3MTI0NjE5.bfnzCsPyjIeiH4b-2Hfq23lYXyYRXfb4GC8meCp4npQg.2DOvyXchOjCQoWjnof-3c1R9ifdKomXevxsK2HcAtm0g.GIF.seokju09%2FexternalFile.gif&type=a340", p: "배고파"},
  // ]

  return (
    <>
      <Header />
      <main className="main recMain">
        <h4 className="prevBtnFood" onClick={goBack}>
          &lt; 식단 추천 받기
        </h4>
        <section className="recommendationSection">
          <div className="nutritionWarningBox">
            <h4 className="h4Txt">현재 나의 영양 문제</h4>
            <div>
              <p>{onDeficit()}</p>
            </div>
          </div>
          <div className="recFoodContainer">
            <h4 className="h4Txt">추천 식단</h4>
            <Slider {...settings}>
            {recommendations.map((item) => (
                <div key={item.id} className="slideRecItem">
                  <img src={`/foodImg/${item.name}.jpg`} alt={item.name} />
                  <p>{item.name}</p>
                  <a href="#">해당 식단 레시피 보러 가기 &gt;</a>
                </div>
              ))}
            </Slider>
            <Link to="/community">레시피 검색하러 가기 &gt;</Link>
          </div>
        </section>
      </main>
      <MenuBar />
    </>
  );
};

export default Recommendation;

