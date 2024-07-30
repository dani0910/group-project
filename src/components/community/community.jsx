import React, { useEffect, useState} from "react";
import "./css/community.css";
import { Header, MenuBar } from '../main/main';

const Community = () => {
    const [activeTab, setActiveTab] = useState('recipe');

    return(
        <>
            <Header />
            <main className="communityMain">
                <section id="sectionBBS">
                    <div className="tabsBBS">
                        <button className="recipeBtn" onClick={()=> setActiveTab('recipe')}>레시피 게시판</button>
                        <button className="freeBtn" onClick={()=> setActiveTab('free')}>자유 게시판</button>
                    </div>
                    <div className="contentBBS">
                        {activeTab == "recipe" ? <RecipePostBBS /> : <FreePostBBS />}
                    </div>
                    <button className="writingBtn">✏️</button>
                </section>
            </main>
            <MenuBar />
        </>
    );
}

const RecipePostBBS = () => {

    
    return(
        <>
            <p>레시피 게시판임</p>
        </>
    );
}

const FreePostBBS = () => {

    return(
        <>
            <p>자유 게시판임</p>
        </>
    );
}


export default Community