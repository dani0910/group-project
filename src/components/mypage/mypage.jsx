import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Header, MenuBar } from "../main/main";
import "./mypage.css";
import ProfileImg from "./profile.jpg";

const Mypage = ({ profile }) => {
  console.log("profile in mypage :", profile);
  return (
    <>
      <Header />
      <MainMypage profile={profile} />
      <MenuBar />
    </>
  );
};

const MainMypage = ({ profile }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const activity = () => {
    if (profile.activity_level === 25) {
      return "가벼운 활동";
    } else if (profile.activity_level === 30) {
      return "중증도 활동";
    } else if (profile.activity_level === 35) {
      return "강한 활동";
    } else if (profile.activity_level === 40) {
      return "아주 강한 활동";
    }
  };

  const requiredIntake = profile.required_intake || 0;
  const requiredCarbs =
    ((parseFloat(requiredIntake) * 0.5) / 4).toFixed(1) || 0;
  const requiredProtein =
    ((parseFloat(requiredIntake) * 0.15) / 4).toFixed(1) || 0;
  const requiredFat = ((parseFloat(requiredIntake) * 0.22) / 9).toFixed(1) || 0;

  const onConfirm = async (e) => {
    e.preventDefault();

    const confirmedLogout = window.confirm("로그아웃 하시겠습니까?");
    if (confirmedLogout) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/logout/", {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          alert("로그아웃에 실패했습니다.");
          return;
        }

        alert("계정에서 로그아웃 되었습니다.");
        localStorage.removeItem("token");
        navigate("/");
      } catch (error) {
        console.error("Error occurred during delete:", error);
        alert("Error occurred " + error.message);
      }
    }
  };

  return (
    <div id="screen">
      <main>
        <div>
          <h4 className="prevBtnFood">&lt; 마이페이지</h4>
        </div>
        <div id="profile">
          <img id="profile_img" src={ProfileImg} alt="Profile" />

          <span id="nickname">{profile.name}</span>
          <span id="id">{profile.username}</span>
        </div>

        <div id="userInfo-container">
          <UserInfo
            infoKey="키"
            infoValue={` ${profile.height} cm`}
            colors="one"
          />
          <UserInfo
            infoKey="체중"
            infoValue={` ${profile.weight} kg`}
            colors="two"
          />
          <UserInfo infoKey="활동량" infoValue={activity()} colors="three" />
          <UserInfo
            infoKey="e-mail"
            infoValue={` ${profile.email}`}
            colors="four"
          />
        </div>

        <section id="intake-container">
          <h1 id="intake-header">하루 권장 섭취량</h1>
          <ul id="intake_ul">
            <div className="intake-line">
              <UserIntakeInfo
                intakeKey="칼로리"
                intakeValue={`${requiredIntake} kcal`}
              />
              <UserIntakeInfo
                intakeKey="탄수화물"
                intakeValue={`${requiredCarbs} g`}
              />
            </div>
            <div className="intake-line">
              <UserIntakeInfo
                intakeKey="단백질"
                intakeValue={`${requiredProtein} g`}
              />
              <UserIntakeInfo
                intakeKey="지방"
                intakeValue={`${requiredFat} g`}
              />
            </div>
          </ul>
        </section>
        <div id="btn-container">
          <button id="logoutBtn" onClick={onConfirm}>
            로그아웃
          </button>
        </div>
      </main>
    </div>
  );
};

const UserInfo = ({ infoKey, infoValue, colors }) => {
  return (
    <div id="user_info">
      <div className="userInfo_column">
        <div id="dot" className={colors}></div>
        <span id="userInfo_txt">{infoKey}</span>
      </div>
      <div className="userInfo_column">
        <span>{infoValue}</span>
      </div>
    </div>
  );
};

const UserIntakeInfo = ({ intakeKey, intakeValue }) => {
  return (
    <li className="intakeContent">
      <p className="intakeTxt">{intakeKey}</p>
      <p className="intakeData">{intakeValue}</p>
    </li>
  );
};

export default Mypage;
