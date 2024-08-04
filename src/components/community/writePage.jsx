import React, { useEffect, useState} from "react";
import "./css/writePage.css";
import { Header, MenuBar } from '../main/main';
import { Link, useNavigate } from "react-router-dom"

const WritePage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [img, setImg] = useState('');
    const [selectedBoard, setSelectedBoard] = useState('recipe');
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost  = {
            title, 
            content, 
            author: '작성자',
            date: new Date().toLocaleDateString('ko-KR'), 
            img: ' '
        }
        console.log(newPost)

        try {
            const response = await fetch("http://127.0.0.1:8000/api/posts/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(newPost)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
                // navigate('/community', { state: { newPost: result } }); // 작성된 글을 상태로 전달
            } else {
                throw new Error('Failed to post'); //200번대 응답이 아닐 경우
            }
        } catch (error) {
            console.error('Error:', error);
        }

        navigate('/community', { state: { newPost }}) // 아직 배포가 안돼서 서버 통신 안되도 넘어가도록 해둠

    }

    return(
        <>
            <Header/>
            <main className="writeMain main communityMain">
                <form onSubmit={handleSubmit}className="writeSection commuSection">
                    <div className="writeHeader commuHeader">
                        <Link to='/community'>&lt;</Link>
                        <select 
                            name="selectBBS" 
                            id="selectBBS"
                            onChange={(e) => setSelectedBoard(e.target.value)}
                        >
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