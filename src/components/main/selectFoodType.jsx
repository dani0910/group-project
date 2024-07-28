import React from "react";
import { Header, MainPageContent, MenuBar } from './main'
import "./css/selectFood.css";
import { useState } from "react";

const SelectFoodType = () => { //css 개판으로 해놔서 수정해야함

  return (
    <>
        {/* <Header/>
        <MainPageContent/>        
        <MenuBar/> */}
        <TypeOfMealsModal/>
        <div id="bg"></div>
    </>
  );
};

const TypeOfMealsModal = () => {  //inputBtnContent 버튼 누르면 모달 창 띄워주고 뒷 배경 #000 opacity: 0.2주세여
    return( 
        <section id="selectModal">
            <div className="ModalContainer">
                <h2 className="modalTitle">식사 종류</h2>
                <form action="">
                    <div className="morningType">
                        <input type="radio" className="" />
                        <label className="morningTxt">아침</label>
                    </div>
                    <div className="lunchType">
                        <input type="radio" className="" />
                        <label className="lunchTxt">점심</label>
                    </div>
                    <div className="dinnerType">
                        <input type="radio" className="" />
                        <label className="dinnerTxt">저녁</label>
                    </div>
                    <div className="snackType">
                        <input type="radio" className="" />
                        <label className="snackTxt">간식</label>
                    </div>
                </form>
                <h2 className="cancelBtn">취소</h2>
                <div id="bg"></div>
            </div>
        </section>
    )
}

export default SelectFoodType;