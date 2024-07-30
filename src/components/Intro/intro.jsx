import React from "react";
import "./intro.css";
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const IntroPage = () => {
  const [password, setPassword] = useState("");
  const [ID, setID] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const baseURL = `http://rollforward.xyz:3000/api/login/`;
  const getId = (e) => {
    setID(e.target.value);
  };
  const getPassWord = (e) => {
    setPassword(e.target.value);
  };
  const onLogin = async (e) => {
    e.preventDefault();
    /*입력값 저장*/
    const savedInfo = { username: ID, password: password };
    console.log(savedInfo);
    /*유효성 검사 */
    if (!ID || !password) {
      alert("모든 입력칸을 채워주십시오");
      return;
    } else {
      try {
        const response = await fetch(baseURL, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(savedInfo),
        });

        if (!response.ok) {
          if (response.status === 401) {
            alert("아이디 또는 패스워드가 틀렸습니다.");
          } else {
            alert("서버에서 오류가 발생했습니다.");
          }
        }

        const data = await response.json();
        console.log("response received", data);
        setMessage(data.message);
        localStorage.setItem("token", data.token);
        navigate("/home");
      } catch (error) {
        console.error("Error occurred during login:", error);
        alert("Error occurred" + error.message);
      }
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
            <span className="signupTxt">로그인</span>
          </div>
        </button>

        <div className="guestLogin">
          <Link to="/signup1">
            <a href="#">화원가입</a>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default IntroPage;
