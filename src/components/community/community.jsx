import React, { useEffect, useState} from "react";
import "./css/community.css";
import { Header, MenuBar } from '../main/main';

const Community = () => {
    const [recipePost, setRecipePost] = useState([]);
    const [freePost, setFreePost] = useState([]);
    const [currentTab, setCurrentTab] = useState('recipe');

    useEffect(()=>{
        const allRecipePost = [
            {title: '레시피1', content: '내용물1', author: '작성자', date: '7/27', img:''},
            {title: '레시피1', content: '내용물2', author: '작성자', date: '7/27', img:''},
        ];
        const allFreePost = [
            {title: '자유게시물1', content: '내용물1', author: '작성자', date: '7/28', img:''},
            {title: '자유게시물2', content: '내용물2', author: '작성자', date: '7/25', img:''},
        ];
        setRecipePost(allRecipePost);
        setFreePost(allFreePost);
    }, []);
    


    return(
        <>
            <Header />
            <main className="communityMain main">
                <section id="sectionBBS">
                    <div className="tabsBBS">
                        <button className="recipeBtn" onClick={()=> setCurrentTab('recipe')}>레시피 게시판</button>
                        <button className="freeBtn" onClick={()=> setCurrentTab('free')}>자유 게시판</button>
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
            {title: '레시피1', content: '내용물2', author: '작성자', date: '7/27', img:''},
        ];
        setRecipePost(allRecipePost);
    }, []);
    console.log('a')

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
                                <h4 className="recipeTitle">{post.title}</h4>
                                <p className="recipeContent">{post.content}</p>
                                <div className="recipeEtc">
                                    <p className="recipeAuthor">{post.author}</p>
                                    <p className="recipeAuthor">{post.date}</p>
                                </div>
                            </div>
                            <img src="" alt="" />
                        </li>
                    )
                })}
            </ul>



            <button className="writingBtn"><span class="material-symbols-outlined">edit</span></button>
        </>
    );
}

const FreePostBBS = () => {

    return(
        <>
            {/* <form className="recipeForm commuForm">
                <input type="text" className="searchInput" placeholder="레시피 검색"/>
                <button className="searchBtn"><span class="material-symbols-outlined">search</span></button>
            </form> */}
            <p>자유 게시판임</p>
        </>
    );
}


export default Community