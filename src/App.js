/* import './App.css'; */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import IntroPage from "./components/Intro/intro";
import SignUpPage1 from "./components/signup/signup1";
import SignUpPage2 from "./components/signup/signup2";
import SignUpPage3 from "./components/signup/signup3";
import MainPage from "./components/main/main";
import FoodSearch from "./components/main/foodSearch";
import Recommendation from "./components/main/recommendation";

import WritePage from "./components/community/writePage";
import PostDetail from "./components/community/detailPost";
import Editpost from "./components/community/edit";
import Calender from "./components/calender/calender";

import Community from "./components/community/community";
import Mypage from "./components/mypage/mypage";

function App() {
  const [profile, setProfile] = useState({});
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<IntroPage />}></Route>
          <Route path="/signup1" element={<SignUpPage1 />}></Route>
          <Route path="/signup2" element={<SignUpPage2 />}></Route>
          <Route path="/signup3" element={<SignUpPage3 />}></Route>

          <Route
            path="/home"
            element={<MainPage profile={profile} setProfile={setProfile} />}
          ></Route>

          <Route path="/home/food_search" element={<FoodSearch />}></Route>
          <Route
            path="/home/food_recommendation"
            element={<Recommendation />}
          ></Route>

          <Route path="/community" element={<Community />}></Route>
          <Route path="/community/write" element={<WritePage />}></Route>
          <Route path="/community/detail/:i" element={<PostDetail />}></Route>
          <Route path="/calender" element={<Calender />}></Route>
          <Route path="/community/edit" element={<Editpost />}></Route>

          <Route path="/mypage" element={<Mypage profile={profile} />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
