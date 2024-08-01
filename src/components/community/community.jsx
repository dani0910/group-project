import React, { useEffect, useState} from "react";
import "./css/community.css";
import { Header, MenuBar } from '../main/main';
import { Link } from "react-router-dom"
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
                    {/* {currentTab == 'recipe' &&(
                        <>
                            <SearchBar></SearchBar>
                            <PostList></PostList>
                            <Pagination></Pagination>
                        </>
                    )}
                    {currentTab == 'free' &&(
                        <></>
                    )} */}
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
    useEffect(()=>{
        const allRecipePost = [
            {title: '레시피1', content: '내용물1', author: '작성자', date: '7/27', img:''},
            {title: '레시피2', content: '내용물2', author: '작성자', date: '7/27', img:''},
        ];
        setRecipePost(allRecipePost);
    }, []);

    return(
        <>
            <form className="recipeForm commuForm">
                <input type="text" className="searchInput" placeholder="레시피 검색"/>
                <button className="searchBtn"><span class="material-symbols-outlined">search</span></button>
            </form>
            <ul className="recipeBox commuBox">
                {recipePost.map((post,i)=>{
                    return(
                        <li key={i} className="recipeList commuList">
                            <div className="txtBox">
                                <h4 className="recipeTitle commuTitle">{post.title}</h4>
                                <p className="recipeContent commuContent">{post.content}</p>
                                <div className="recipeEtc commuEtc">
                                    <p className="recipeAuthor commuAuthor">{post.author}</p>
                                    <p className="recipeDate commuDate">{post.date}</p>
                                </div>
                            </div>
                            <img src={post.img || "https://via.placeholder.com/50"} alt="" />
                        </li>
                    )
                })}
            </ul>
            <Link to="/community/write"><button className="writingBtn"><span class="material-symbols-outlined">edit</span></button></Link>
        </>
    );
}

const FreePostBBS = () => {
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