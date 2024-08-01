import "./css/signup2.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SignUpPage2 = () => {
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("female");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [savedSignup2, setSavedSignup2] = useState({});
  const getAge = (e) => setAge(e.target.value);
  const getHeight = (e) => setHeight(e.target.value);
  const getGender = (e) => setGender(e.target.value);
  const getWeight = (e) => setWeight(e.target.value);
  const location = useLocation();
  const navigate = useNavigate();
  const savedInfo = {
    age: age,
    gender: gender,
    height: height,
    weight: weight,
  };

  const savedSignup = location.state?.savedSignup || {};
  const username = savedSignup.name;
  console.log(savedSignup);
  const onSignup2 = (e) => {
    e.preventDefault();

    console.log(savedSignup2);
    if (!age || !gender || !height || !weight) {
      alert("모든 입력칸을 채워주십시오");
      return;
    } else {
      navigate("/signup3", { state: { savedSignup, savedSignup2 } });
    }
  };
  useEffect(() => setSavedSignup2(savedInfo), [age, gender, height, weight]);

  return (
    <>
      <header>
        <button className="material-symbols-outlined">
          <Link to="/signup1">
            <div>arrow_back_ios</div>
          </Link>
        </button>
        <span className="logoIcon"></span>
      </header>
      <section className="page2Section signupSection">
        <h4>{username}님의 정보를 입력해주세요</h4>
        <form action="" className="formContainer" onSubmit={onSignup2}>
          <div className="ageBox">
            <label className="ageTxt">나이</label>
            <div className="outlineBox outlineAge">
              <input
                type="number"
                onChange={getAge}
                className="ageInput"
                min={1}
                max={120}
              />{" "}
              세
            </div>
          </div>
          <div className="genderBox">
            <label className="genderTxt">성별</label>
            <div className="outlineBox outlineGender">
              여자{" "}
              <input
                type="radio"
                name="gender"
                onChange={getGender}
                value="female"
                id="female"
              />
              남자{" "}
              <input
                type="radio"
                name="gender"
                onChange={getGender}
                value="male"
                id="male"
              />
            </div>
          </div>
          <div className="heightBox">
            <label className="heightTxt">키</label>
            <div className="outlineBox">
              <input
                type="number"
                className="heightInput"
                min={100}
                max={200}
                onChange={getHeight}
              />{" "}
              cm
            </div>
          </div>
          <div className="weightBox">
            <label className="weightTxt">몸무게</label>
            <div className="outlineBox">
              <input
                type="number"
                className="weightInput"
                onChange={getWeight}
                min={30}
                max={200}
              />{" "}
              kg
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

export default SignUpPage2;
