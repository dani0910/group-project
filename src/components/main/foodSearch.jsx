import React from "react";
import { Header, MenuBar } from './main'
import "./css/foodSearch.css";
import { useState } from "react";

const FoodSearch = () => { //css 개판으로 해놔서 수정해야함

  return (
    <>
        <Header/>
        <main id="main">
            <section id="foodSearchSection">
                <button className="prevBtn">&lt; 아침</button>
                
            </section>
        </main>
        <MenuBar/>
    </>
  );
};


export default FoodSearch;
