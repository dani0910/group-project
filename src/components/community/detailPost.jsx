import React, { useEffect, useState } from "react";
import "./css/postDetail.css";
import { Header, MenuBar } from "../main/main";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

const PostDetail = () => {
  const { postId } = useParams();
  const location = useLocation();
  const post = location.state?.post;
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); 
  const navigate = useNavigate();

  const onEdit = () => { //수정버튼
    navigate("/community/edit", { state: { post } });
  };

  const onDelete = async () => { //모달창 속 삭제
    // try { //api 연동 되면 주석 풀기
    //     const response = await fetch(`http://127.0.0.1:8000//api/posts/`, {
    //       method: 'DELETE',
    //     });
  
    //     if (response.ok) {
    //       console.log('게시글이 삭제되었습니다.');
    //       // 삭제 후에는 목록으로 이동
    //       navigate('/community');
    //     } else {
    //       console.error('게시글 삭제 실패');
    //     }
    // } catch (error) {
    //     console.error('Error:', error);
    // }
    navigate("/community") //api 연동 시 코드 지우기
  }
  
  const handleDeleteModalOpen = () => { // 삭제버튼
    setDeleteModalOpen(true);
    console.log('삭제모달 오픈')
  }
  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false); // Close delete modal
  };

  const handleCommentModalOpen = () => {
    setCommentModalOpen(true);
  };
  const handleCommentModalClose = () => {
    setCommentModalOpen(false);
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
                <button className="detailEditBtn detailBtn" onClick={onEdit}>
                  <span class="material-symbols-outlined ">edit_square</span>
                </button>
                <button 
                    className="detailDeleteBtn detailBtn"
                    onClick={handleDeleteModalOpen}>
                    <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
            <p>
              {post.author} {post.date}
            </p>
            <div className="detailContent">{post.content}</div>
            {post.img && <img src={post.img} alt="Post" />}
          </div>
          <div className="commentBox" onClick={handleCommentModalOpen}>
            <span class="material-symbols-outlined">sms</span>
            <button className="commentTitle">댓글</button>
          </div>
          {commentModalOpen && (
            <CommentModal postId={postId} onClose={handleCommentModalClose} />
          )}
          {deleteModalOpen && (
            <div className="deleteModal">
                <p>게시글을 삭제하시겠습니까?</p>
                <div>
                    <button onClick={onDelete}><span>삭제</span></button>
                    <button onClick={handleDeleteModalClose}><span>취소</span></button>
                </div>
            </div>
            )}
        </section>
      </main>
      <MenuBar />
      {(commentModalOpen || deleteModalOpen) && (
        <div className="bg" onClick={() => {
          if (commentModalOpen) handleCommentModalClose();
          if (deleteModalOpen) handleDeleteModalClose();
        }}></div>
      )}
    </>
  );
};


//댓글
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
    // try { //댓글 data 전송 로직 , api 연동 되면 주석 풀기
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
