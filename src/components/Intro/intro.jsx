import React from "react";
import "./intro.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const IntroPage = () => {
  const [password, setPassword] = useState("");
  const [ID, setID] = useState("");
  const getId = (e) => {
    setID(e.target.value);
  };
  const getPassWord = (e) => {
    setPassword(e.target.value);
  };
  const onLogin = (e) => {
    e.preventDefault();
    /*입력값 저장*/
    const savedInfo = [{ id: ID }, { password: password }];
    console.log(savedInfo);
    /*유효성 검사 */
    if (!ID || !password) {
      alert("모든 입력칸을 채워주십시오");
      return;
    }
  };

  return (
    <section className="container">
      <div className="logoBox">
        <span></span>
      </div>
      <form className="loginBox" onSubmit={onLogin}>
        <p className="loginTxt">Login</p>
        <div className="ID">
          <p className="idTxt">ID</p>
          <input
            type="text"
            className="idInput"
            max={20}
            required
            onChange={getId}
          />
        </div>
        <div className="password">
          <p className="pwdTxt">Password</p>
          <input
            type="password"
            className="pwdInput"
            max={20}
            required
            onChange={getPassWord}
          />
        </div>

        <button className="signupBtn" type="submit">
          <div>
            <span className="signupIcon"></span>
            <span className="signupTxt">회원가입</span>
          </div>
        </button>

        <div className="guestLogin">
          <a href="#">로그인 없이 둘러보기</a>
        </div>
      </form>
    </section>
  );
};

export default IntroPage;
