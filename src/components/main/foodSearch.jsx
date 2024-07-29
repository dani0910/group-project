import React from "react";
import { Header, MenuBar } from './main'
import "./css/foodSearch.css";
import { useState } from "react";

const FoodSearch = () => { //css 개판으로 해놔서 수정해야함

  return (
    <>
        <Header/>
        <main class="main foodMain">
            <h4 className="prevBtnFood">&lt; 아침</h4>
            <div className="searchContainer">
              <input type="text" placeholder="음식 검색" />
              <button className="searchBtn"><span class="material-symbols-outlined">search</span></button>
            </div>
            <section className="resultContainer">
              <div className="tabs">
                <button className="allBtn"><span>전체</span></button>
                <button className="bookmarkBtn"><span>즐겨찾기</span></button>
                <button className="selfAddBtn"><span>직접 추가</span></button>
              </div>
              <ul className="foodResultBox">
                <li>
                  <input type="checkbox" />
                  <div className="foodName">
                    <p className="foodTxt">사과</p>
                    <p className="gram">1개 (250개)</p>
                  </div>
                  <p className="foodKcal">142kcal</p>
                  <button className="addBtn">추가</button>
                </li>
              </ul>
            </section>
        </main>
        <MenuBar/>
    </>
  );
};


export default FoodSearch;
