import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Header, MenuBar } from "../main/main";
import "./mypage.css";
import ProfileImg from "./profile.jpg";

const Mypage = ({ profile }) => {
  console.log("profile in mypage :", profile);
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

  const onConfirm = async (e) => {
    e.preventDefault();

    const confirmedLogout = window.confirm("로그아웃 하시겠습니까?");
    if (confirmedLogout) {
      try {
        const response = await fetch(
          "http://rollforward.xyz:3000/api/logout/",
          {
            method: "POST",
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

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
    <>
      <Header />
      <MainMypage
        profile={profile}
        activity={activity()}
        onConfirm={onConfirm}
      />
      <MenuBar />
    </>
  );
};

const MainMypage = ({ profile = {}, onConfirm }) => {
  const { height = 0, weight = 0, activity_level = 0 } = profile;
  const memberInfo = [
    {
      text: "키",
      value: height,
      unit: "cm",
      className: "height",
    },
    {
      text: "체중",
      value: weight,
      unit: "g",
      className: "weight",
    },
    {
      text: "활동량",
      value: activity_level,
      unit: "",
      className: "activity",
    },
  ];

  return (
    <main className="myPageMain main">
      <section className="myPageSection">
        <div className="profileBox">
          <img id="profileImg" src={ProfileImg} alt="Profile" />
          <p className="nicknameTxt">{profile.name || "로그인 해주세요"}</p>
        </div>

        <div className="accountInfoBox">
          <p className="accountTxt">계정 정보</p>
          <div>
            <p className="myPageIdTxt">아이디 : {profile.username || ""}</p>
            <p className="emailTxt">이메일 : {profile.email || ""}</p>
          </div>
        </div>

        <div className="memberInfoBox">
          <p className="memberTxt">회원 정보</p>
          <ul>
            {memberInfo.map((type, i) => {
              return (
                <li key={i}>
                  <p className={`${type.className} beforeTxt`}>{type.text}</p>
                  <div>
                    <p>
                      {type.value} {type.unit}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="logoutBtnBox">
          <button id="logoutBtn" onClick={onConfirm}>
            로그아웃
          </button>
        </div>
      </section>
    </main>
  );
};

export default Mypage;
