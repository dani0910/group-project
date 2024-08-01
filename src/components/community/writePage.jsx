import React, { useEffect, useState} from "react";
import "./css/writePage.css";
import { Header, MenuBar } from '../main/main';
import { Link, useNavigate } from "react-router-dom"

const WritePage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [img, setImg] = useState('');
    const navigate = useNavigate();
    const [ recipePost, setRecipePost ] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost  = {
            title, 
            content, 
            author:'작성자',
             date: new Date().toLocaleDateString('ko-KR'), 
             img:''
        }

        setRecipePost((prevPosts) => {
                const recipePost = [...prevPosts, newPost];
                console.log('추가된 post', newPost);
                console.log('전체 post', recipePost);
                return recipePost;
        })
        navigate("/community", { state: { recipePost} }); // 페이지 넘어갈 때 값 전달이 안됨 
    };

    return(
        <>
            <Header/>
            <main className="writeMain main communityMain">
                <form onSubmit={handleSubmit}className="writeSection commuSection">
                    <div className="writeHeader commuHeader">
                        <Link to='/community'>&lt;</Link>
                        <select name="typeBBS" id="typeBBS">
                            <option value="recipeBBS">게시판 - 레시피</option>
                            <option value="freeBBS">게시판 - 자유</option>
                        </select>
                    </div>

                    <div className="writeContainer">
                        <input 
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder="제목 입력" />
                        <div className="optionBox">
                            <div className="photoOption">
                                <p>사진 추가</p>
                                <span></span>
                            </div>
                            <div className="tagOption">
                                <p>태그 등록</p>
                                <span></span>
                            </div>
                        </div>
                        <textarea 
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            name="text" 
                            placeholder="본문 입력"></textarea>
                    </div>
                    <button type="submit"className="writingBtn registerBtn"><span class="material-symbols-outlined">check</span></button>
                </form>
            </main>
            <MenuBar/>
        </>
    )
}

export default WritePage;