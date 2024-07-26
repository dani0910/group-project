import React from "react";
import { Header, MenuBar } from './main'
import "./css/foodSearch.css";
import { useState } from "react";

const FoodSearch = () => { //css 개판으로 해놔서 수정해야함

  return (
    <>
        <Header/>
        <main class="main foodMain">
            <section id="foodSearchSection">
                <h4 className="prevBtn">&lt; 아침</h4>
                <div className="searchContainer">
                  <input type="text" placeholder="음식 검색" />
                  <button className="searchBtn"><span class="material-symbols-outlined">search</span></button>
                </div>
                <div className="resultContainer">
                  <div className="tabs">
                    <button className="allBtn">전체</button>
                    <button className="bookmarkBtn">즐겨찾기</button>
                    <button className="selfAddBtn">직접 추가</button>
                  </div>
                  <ul className="foodResultBox">
                    <li>
                      <input type="checkbox" />
                      <div className="foodName">
                        <p className="foodTxt">사과</p>
                        <p className="gram">1개 (250개)</p>
                      </div>
                      <p className="foodKcal">142kcal</p>
                    </li>
                  </ul>
                </div>
            </section>
        </main>
        <MenuBar/>
    </>
  );
};


export default FoodSearch;
