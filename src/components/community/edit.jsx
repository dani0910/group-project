import React, { useEffect, useState } from "react";
import "./css/writePage.css";
import { Header, MenuBar } from "../main/main";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Editpost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const baseURL = "http://127.0.0.1:8000/api/posts/";
  const post = location.state?.post || {};
  const postID = post.id;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const editPost = {
      // 객체 형식으로 변경 (다연)
      title: title,
      content: content,
      imgages: " ",
      delete_images: " ",
      // 이미지 관해서는 아직 처리 안됨
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/posts/${postID}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        alert("서버에 오류가 발생하였습니다.");
        return;
      }
      const data = await response.json();
      console.log(data);
      navigate("/community");
    } catch (error) {
      console.error("Error occurred during delete:", error);
      alert("Error occurred " + error.message);
    }
  };

  return (
    <>
      <Header />
      <main className="writeMain main communityMain">
        <form onSubmit={handleSubmit} className="writeSection commuSection">
          <div className="writeHeader commuHeader">
            <Link to="/community">&lt;</Link>
            <span>게시글 수정</span>
          </div>

          <div className="writeContainer">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목 입력"
            />
            <div className="optionBox">
              <div className="photoOption">
                <p>사진 변경</p>
                <span></span>
              </div>
              <div className="photoOption">
                <p>사진 삭제</p>
                <span></span>
              </div>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              name="text"
              placeholder="본문 입력"
            ></textarea>
          </div>
          <button type="submit" className="writingBtn registerBtn">
            <span class="material-symbols-outlined">check</span>
          </button>
        </form>
      </main>
      <MenuBar />
    </>
  );
};
export default Editpost;
