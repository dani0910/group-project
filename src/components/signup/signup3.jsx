import React from "react";
import "./css/signup3.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUpPage3 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const savedSignup = location.state.savedSignup;
  const username = savedSignup.name;
  const savedSignup2 = location.state.savedSignup2;

  const [range, setRange] = useState(0);
  const baseURL = "http://13.125.65.66:8000/api/register/";

  const getRange = (e) => setRange(e.target.value);

  const onSignup3 = async (e) => {
    e.preventDefault();

    if (!range) {
      alert("한 가지 항목을 선택해 주십시오.");
      return;
    } else {
      const gender = savedSignup2.gender;
      const height = savedSignup2.height;
      const standard_weight =
        gender === "female"
          ? (Math.pow(parseInt(height) / 100, 2) * 21).toFixed(2)
          : (Math.pow(parseInt(height) / 100, 2) * 22).toFixed(2);
      const requiredIntake = (standard_weight * parseInt(range)).toFixed(2);

      console.log(`표준체중: ${standard_weight}`);
      console.log(`권장섭취량: ${requiredIntake}`);

      try {
        const response = await fetch(baseURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: savedSignup.email,
            name: savedSignup.name,
            activity_level: range,
            height: height,
            weight: savedSignup2.weight,
            required_intake: requiredIntake,
            username: savedSignup.username,
            password: savedSignup.password,
          }),
        });

        if (!response.ok) {
          if (response.status === 400) {
            alert("이미 존재하는 ID입니다");

            return;
          } else {
            alert("서버에서 오류가 발생했습니다.");

            return;
          }
        }

        const data = await response.json();
        console.log("response received", data);
        alert("회원가입이 완료되었습니다. 다시 로그인 해주세요.");
        navigate("/");
      } catch (error) {
        console.error("Error occurred during signup:", error);
        alert("Error occurred" + error.message);
      }
    }
  };

  const activity = [
    { text: "가벼운", type: "light", value: 25 },
    { text: "중등도", type: "moderate", value: 30 },
    { text: "강한", type: "strong", value: 35 },
    { text: "아주 강한", type: "veryStrong", value: 40 },
  ];

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
      <section className="page3Section signupSection">
        <h4>{username}님의 하루 활동량</h4>
        <form onSubmit={onSignup3} className="form">
          {activity.map((item, i) => {
            return (
              <div className={`${item.type}Content contentBox`} key={i}>
                <input
                  type="radio"
                  name="activity"
                  id={item.type}
                  value={item.value}
                  onChange={getRange}
                />
                <label className={`${item.type}Txt`}>{item.text} 활동</label>
              </div>
            );
          })}

          <div id="graphContainer">
            <div className="level">
              <span className="circle"></span>
              <h5>25</h5>
              <h6 className="type">가벼운</h6>
              <p className="detail">앉아서 하는 일</p>
              <p className="detailEX">일반사무, 자녀가 없는 주부 등</p>
            </div>
            <div className="level">
              <span className="circle"></span>
              <h5>30</h5>
              <h6 className="type">중등도</h6>
              <p className="detail">서서 하는 일</p>
              <p className="detailEX">서비스업, 어린 자녀가 있는 주부 등</p>
            </div>
            <div className="level">
              <span className="circle"></span>
              <h5>35</h5>
              <h6 className="type">강한</h6>
              <p className="detail">활동량이 많은 일</p>
              <p className="detailEX">농업, 어업, 건설 등</p>
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
