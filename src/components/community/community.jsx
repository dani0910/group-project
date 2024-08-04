import React, { useEffect, useState} from "react";
import "./css/community.css";
import { Header, MenuBar } from '../main/main';
import { Link, useLocation } from "react-router-dom"
import Pagination from "react-js-pagination";

const Community = () => {
    const [currentTab, setCurrentTab] = useState('recipe');

    return(
        <>
            <Header />
            <main className="communityMain main">
                <section className="sectionBBS commuSection">
                    <div className="tabsBBS commuHeader">
                        <button className={`recipeBtn ${currentTab === 'recipe' ? 'active' : ''}`} onClick={()=> setCurrentTab('recipe')}>레시피 게시판</button>
                        <button className={`freeBtn ${currentTab === 'free' ? 'active' : ''}`} onClick={()=> setCurrentTab('free')}>자유 게시판</button>
                    </div>
                    <div className="contentBBS">
                        {currentTab == "recipe" ? <RecipePostBBS /> : <FreePostBBS />}
                    </div>
                </section>
            </main>
            <MenuBar />
        </>
    );
}

const RecipePostBBS = () => {
    const [recipePost, setRecipePost] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const newPost = location.state?.newPost;

    const fetchPosts = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/boards/");
            if (response.ok) {
                const result = await response.json();
                setRecipePost(result.recipePost || []); // 서버에서 게시글 목록을 가져옴
            } else {
                throw new Error('Failed to fetch posts');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => { // 컴포넌트 마운트 시 서버에서 게시글을 가져옴
        fetchPosts();
    }, []);

    useEffect(() => {
        const post = [
            {id: "1", title: '레시피1', content: '내용물1', author: '작성자', date: '7/28', img:''},
            {id: "2", title: '레시피2', content: '내용물2', author: '작성자', date: '7/25', img:''},
        ]; // 잘뜨나 시험용으로 만든 리스트
        setRecipePost(post);
        if (newPost) {
            setRecipePost(prevPosts => [newPost , ...prevPosts]); 
        }
    }, [newPost]);


    // 검색어를 기준으로 레시피를 필터링
    const filteredRecipePost = recipePost.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    console.log(newPost)
    console.log(recipePost)

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <>
            <form className="recipeForm commuForm">
                <input 
                    type="text" 
                    className="searchInput" 
                    placeholder="레시피 검색" 
                    value={searchQuery}
                    onChange={handleSearchChange} // 검색어 입력 처리
                />
                <button type="submit" className="searchBtn">
                    <span className="material-symbols-outlined">search</span>
                </button>
            </form>
            <ul className="recipeBox commuBox">
                {filteredRecipePost.map((post, i) => (
                    <li key={i} className="recipeList commuList">
                        <Link 
                            to={`/community/detail/${i}`}
                            state={{post}}
                            className="txtBox"
                        >
                            <h4 className="recipeTitle commuTitle">{post.title}</h4>
                            <p className="recipeContent commuContent">{post.content}</p>
                            <div className="recipeEtc commuEtc">
                                <p className="recipeAuthor commuAuthor">{post.author}</p>
                                <p className="recipeDate commuDate">{post.date}</p>
                            </div>
                        </Link>
                        <img src={post.img || "https://via.placeholder.com/50"} alt="" />
                    </li>
                ))}
            </ul>
            <Link to="/community/write">
                <button className="writingBtn">
                    <span className="material-symbols-outlined">edit</span>
                </button>
            </Link>
        </>
    );
};

const FreePostBBS = () => { /* 아직 값 안넣음 */
    const [freePost, setFreePost] = useState([]);
    useEffect(()=>{
        const allFreePost = [
            {title: '자유게시물1', content: '내용물1', author: '작성자', date: '7/28', img:''},
            {title: '자유게시물2', content: '내용물2', author: '작성자', date: '7/25', img:''},
        ];
        setFreePost(allFreePost);
    }, []);
    
    return(
        <>
            <form className="freeForm commuForm">
                <input type="text" className="searchInput" placeholder="게시글 검색"/>
                <button className="searchBtn"><span class="material-symbols-outlined">search</span></button>
            </form>
            <ul className="freeBox commuBox">
                {freePost.map((post,i)=>{
                    return(
                        <li key={i} className="freeList commuList">
                            <div className="txtBox">
                                <h4 className="freeTitle commuTitle">{post.title}</h4>
                                <p className="freeContent commuContent">{post.content}</p>
                                <div className="freeEtc commuEtc">
                                    <p className="freeAuthor commuAuthor">{post.author}</p>
                                    <p className="freeDate commuDate">{post.date}</p>
                                </div>
                            </div>
                            <img src={post.img || "https://via.placeholder.com/50"} alt="" />
                        </li>
                    )
                })}
            </ul>
            <button className="writingBtn"><span class="material-symbols-outlined">edit</span></button>
        </>
    );
}
 
export default Community