import React, { useEffect, useState } from "react";
import "./css/postDetail.css";
import { Header, MenuBar } from "../main/main";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

const PostDetail = () => {
  const { postId } = useParams();
  const location = useLocation();
  const post = location.state?.post;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const onEdit = () => {
    navigate("/community/edit", { state: { post } });
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  console.log("post", post);

  return (
    <>
      <Header />
      <main className="detailMain main communityMain">
        <section className="detailSection commuSection">
          <div className="detailHeader commuHeader">
            <Link to="/community">&lt;</Link>
            <h4>레시피 게시판</h4>
          </div>
          <div className="detailContainer">
            <div>
              <h2 className="detailTitle">{post.title}</h2>
              <div className="detailPostBtn">
                {" "}
                {/* 버튼에 온클릭 추가*/}
                <button className="detailEditBtn detailBtn" onClick={onEdit}>
                  <span class="material-symbols-outlined ">edit_square</span>
                </button>
                <button className="detailDeleteBtn detailBtn">
                  <span class="material-symbols-outlined">
                    {" "}
                    <span class="material-symbols-outlined">delete</span>
                  </span>
                </button>
              </div>
            </div>
            <p>
              {post.author} {post.date}
            </p>
            <div className="detailContent">{post.content}</div>
            {post.img && <img src={post.img} alt="Post" />}
          </div>
          <div className="commentBox" onClick={handleModalOpen}>
            <span class="material-symbols-outlined">sms</span>
            <button className="commentTitle">댓글</button>
          </div>
          {isModalOpen && (
            <CommentModal postId={postId} onClose={handleModalClose} />
          )}
        </section>
      </main>
      <MenuBar />
      {isModalOpen && <div className="bg" onClick={handleModalClose}></div>}
    </>
  );
};

const CommentModal = ({ postId, onClose }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const comment = [
      /* 테스트용 */
      {
        author: "작성자",
        date: new Date().toLocaleDateString("ko-KR"),
        content: "~~",
      },
      {
        author: "작성자",
        date: new Date().toLocaleDateString("ko-KR"),
        content: "~~",
      },
      {
        author: "작성자",
        date: new Date().toLocaleDateString("ko-KR"),
        content: "~~",
      },
      {
        author: "작성자",
        date: new Date().toLocaleDateString("ko-KR"),
        content: "~~",
      },
    ];
    setComments(comment);
  }, []);

  useEffect(() => {
    // API를 호출하여 댓글을 가져오는 함수
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/comments/${postId}/comments`
        );
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      author: "작성자",
      date: new Date().toLocaleDateString("ko-KR"),
      content,
    };
    // try {
    //     const response = await fetch(`http://127.0.0.1:8000/api/boards/${postId}/comments`,{
    //         method: "POST",
    //         headers: {
    //             "Content-Type" : "application/json",
    //             "Authorization": `Bearer ${token}`,
    //         },
    //         body: JSON.stringify(newComment),
    //     })
    //     if (response.ok) {
    //         const createdComment = await response.json();
    //         setComments(prev => [...prev, newComment]);
    //         setContent('')
    //     }else{
    //         console.error("Failed to post comment");
    //     }
    // }catch(error){
    //     console.error("Error posting comment:", error);
    // }
    setComments((prev) => [...prev, newComment]); //연동 못해서 우선 이 코드로 올라가는거 확인
    console.log(comments);
  };

  return (
    <div className="modalOverlay">
      <section className="modalContent commentModal">
        <div className="commentHeader">
          <div>
            <span class="material-symbols-outlined">sms</span>
            <p className="commentTitle">댓글</p>
          </div>
          <button className="closeModalBtn" onClick={onClose}>
            x
          </button>
        </div>
        <ul className="commentLists">
          {comments.map((item, i) => {
            return (
              <li key={i}>
                <div>
                  <p className="commentAuthor">{item.author}</p>
                  <p className="commentDate">{item.date}</p>
                </div>
                <p className="commentContent">{item.content}</p>
              </li>
            );
          })}
        </ul>
        <form onSubmit={handleSubmit} className="commentForm">
          <input
            type="text"
            value={content}
            placeholder="댓글 달기"
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit" className="submitBtn">
            <span class="material-symbols-outlined">near_me</span>
          </button>
        </form>
      </section>
    </div>
  );
};

export default PostDetail;
