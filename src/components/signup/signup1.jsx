import React from "react";
import "./css/signup1.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignUpPage1 = () => {
  const [ID, setID] = useState("");
  const [passW, setpassW] = useState("");
  const [email, setEmail] = useState("");
  const [Nname, setNname] = useState("");
  const getID = (e) => setID(e.target.value);
  const getPassW = (e) => setpassW(e.target.value);
  const getEmail = (e) => setEmail(e.target.value);
  const getNname = (e) => setNname(e.target.value);
  const onSignup = (e) => {
    e.preventDefault();
    const savedSignup = [
      { ID: ID },
      { password: passW },
      { email: email },
      { username: Nname },
    ];
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()]).{8,}$/;

    console.log(savedSignup);
    if (!ID || !passW || !email || !Nname) {
      alert("모든 입력칸을 채워주십시오");
      return;
    } else if (!passwordPattern.test(passW)) {
      alert(
        "비밀번호는 최소 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
      );
      return;
    }
  };
  return (
    <>
      <header>
        <button className="material-symbols-outlined">arrow_back_ios</button>

        <span className="logoIcon"></span>
      </header>
      <section>
        <h4>회원가입 정보를 입력하세요</h4>
        <form className="inputContainer" onSubmit={onSignup}>
          <div className="idBox">
            <label className="idTxt">아이디</label>
            <input
              type="text"
              className="idInput"
              maxLength={10}
              onChange={getID}
            />
          </div>
          <div className="pwdBox">
            <label className="pwdTxt">비밀번호</label>
            <input type="password" className="pwdInput" onChange={getPassW} />
          </div>
          <div className="emailBox">
            <label className="emailTxt">Email</label>
            <input type="email" className="emailInput" onChange={getEmail} />
          </div>
          <div className="nickBox">
            <label className="nickTxt">닉네임</label>
            <input
              type="text"
              className="nickInput"
              maxLength={10}
              onChange={getNname}
            />
          </div>

          <button className="checkBtn">
            <span className="material-symbols-outlined">check</span>
          </button>
        </form>
      </section>
    </>
  );
};

export default SignUpPage1;
