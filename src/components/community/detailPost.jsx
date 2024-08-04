import React, { useEffect, useState} from "react";
import "./css/postDetail.css";
import { Header, MenuBar } from '../main/main';
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

const PostDetail = () => {
    const {postId} = useParams();
    const location = useLocation();
    const post = location.state?.post;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    }
    const handleModalClose = () => {
        setIsModalOpen(false);
    }
    console.log('post',post)

    return(
        <>
            <Header/>
            <main className="detailMain main communityMain">
                <section className="detailSection commuSection">
                    <div className="detailHeader commuHeader">
                        <Link to='/community'>&lt;</Link>
                        <h4>레시피 게시판</h4>
                    </div>
                    <div className="detailContainer">
                        <h2 className="detailTitle">{post.title}</h2>
                        <p>{post.author} {post.date}</p>
                        <div className="detailContent">
                            {post.content}
                        </div>
                        {post.img && <img src={post.img} alt="Post" />}
                    </div>
                    <div className="commentBox" onClick={handleModalOpen}>
                        <span class="material-symbols-outlined">sms</span>
                        <button className="commentTitle">댓글</button>
                    </div>
                    {isModalOpen && <Modal onClose={handleModalClose}/>}
                </section>
            </main>
            <MenuBar/>
            {isModalOpen && <div className="bg" onClick={handleModalClose}></div> }
        </>
    )
}

const Modal = ({onClose}) => {
    console.log('modal open')
    const [comments, setComments] = useState([])
    useEffect(()=>{
        const comment = [
            {profile: '', author: '작성자', date: new Date().toLocaleDateString('ko-KR'), content: '~~'},
            {profile: '', author: '작성자', date: new Date().toLocaleDateString('ko-KR'), content: '~~'},
            {profile: '', author: '작성자', date: new Date().toLocaleDateString('ko-KR'), content: '~~'},
            {profile: '', author: '작성자', date: new Date().toLocaleDateString('ko-KR'), content: '~~'},
        ];
        setComments(comment);
    },[])

    return(
        <div className="modalOverlay">
            <section className="modalContent commentModal">
                <div className="commentHeader">
                    <div>
                        <span class="material-symbols-outlined">sms</span>
                        <p className="commentTitle">댓글</p>
                    </div>
                    <button className="closeModalBtn" onClick={onClose}>x</button>
                </div>
                <ul className="commentLists">
                    {comments.map((item,i)=>{
                        return(
                            <li key={i}>
                                <div>
                                    <p className="commentAuthor">{item.author}</p>
                                    <p className="commentDate">{item.date}</p>
                                </div>
                                <p className="commentContent">{item.content}</p>
                            </li>
                        )
                    })}
                </ul>
                <form action="" className="commentForm">
                        <input type="text" placeholder="댓글 달기" />
                        <button type="submit" className="submitBtn"><span class="material-symbols-outlined">near_me</span></button>
                    </form>
            </section>
        </div>
    )
}

export default PostDetail;