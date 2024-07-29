import React from "react";
import "./css/signup3.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SignUpPage3 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || "이용자";
  const [range, setRange] = useState(0);
  const getRange = (e) => setRange(e.target.value);
  const onSignup3 = (e) => {
    e.preventDefault();
    const activity_level = { range };
    console.log(activity_level);
    alert("회원가입이 완료되었습니다. 다시 로그인 해주세요.");
    navigate("/home");
  };
  return (
    <>
      <header>
        <button className="material-symbols-outlined">
          <Link to="/signup2">
            <div>arrow_back_ios</div>
          </Link>
        </button>
        <span className="logoIcon"></span>
      </header>
      <section id="page3Section signupSection">
        <h4>{username}님의 하루 활동량</h4>
        <form onSubmit={onSignup3} className="form">
          <div className="lightContent contentBox">
            <input
              type="radio"
              name="activity"
              id="light"
              value={25}
              onChange={getRange}
            />
            <label className="lightTxt">가벼운 활동</label>
          </div>
          <div className="contentBox">
            <input
              type="radio"
              name="activity"
              id="moderate"
              value={30}
              onChange={getRange}
            />
            <label className="moderateTxt">중등도 활동</label>
          </div>
          <div className="contentBox">
            <input
              type="radio"
              name="activity"
              id="strong"
              value={35}
              onChange={getRange}
            />
            <label className="strongTxt">강한 활동</label>
          </div>
          <div className="contentBox">
            <input
              type="radio"
              name="activity"
              id="veryStrong"
              value={40}
              onChange={getRange}
            />
            <label className="veryStrongTxt">아주 강한 활동</label>
          </div>
          <div id="graphContainer">
          <div className="level">
            <span className="circle"></span>
            <h5>25</h5>
            <h6 className="type">가벼운</h6>
            <p className="detail">앉아서 하는 일</p>
            <p className="detailEX">일반사무,</p>
            <p className="detailEX">자녀가 없는 주부 등</p>
          </div>
          <div className="level">
            <span className="circle"></span>
            <h5>30</h5>
            <h6 className="type">중등도</h6>
            <p className="detail">서서 하는 일</p>
            <p className="detailEX">서비스업,</p>
            <p className="detailEX">어린 자녀가 있는 주부 등</p>
          </div>
          <div className="level">
            <span className="circle"></span>
            <h5>35</h5>
            <h6 className="type">강한</h6>
            <p className="detail">활동량이 많은 일</p>
            <p className="detailEX">농업,어업,건설 등</p>
          </div>
          <div className="level">
            <span className="circle"></span>
            <h5>40</h5>
            <h6 className="type">아주 강한</h6>
            <p className="detailEX lastEX">운동선수 등</p>
          </div>
        </div>
          <button className="checkBtn" type="submit">
            <span className="material-symbols-outlined">check</span>
          </button>
        </form>
      </section>
    </>
  );
};

export default SignUpPage3;
