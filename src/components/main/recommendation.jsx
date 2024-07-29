import React, { useEffect, useState} from "react";
import "./css/recommendation.css";
import { Header, MenuBar } from './main'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const Recommendation = () => { 

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

  return (
    <>
        <Header/>
        <main className="main recMain">
            <h4 className="prevBtnFood">&lt; 식단 추천 받기</h4>
            <section className="recommendationSection">
                <div className="nutritionWarningBox">
                    <h4>현재 나의 영양 문제</h4>
                    <p>탄수화물 부족 (50g / 161g)</p>
                </div>
                <div className="recFoodContainer">
                    <h4>추천 식단</h4>
                    <Slider {...settings}>
                        <div className="slideRecItem">
                            <img src="" alt="" />
                            <p>닭도리탕</p>
                            <a href="">해당 식단 레시피 보러 가기 &gt;</a>
                        </div>
                        <div className="slideRecItem">
                            <img src="" alt="" />
                            <p>김치찌개</p>
                            <a href="">해당 식단 레시피 보러 가기 &gt;</a>
                        </div>
                        <div className="slideRecItem">
                            <img src="" alt="" />
                            <p>배고파</p>
                            <a href="">해당 식단 레시피 보러 가기 &gt;</a>
                        </div>
                    </Slider>
                </div>
            </section>
        </main>
        <MenuBar/>
    </>
  );
};

export default Recommendation;