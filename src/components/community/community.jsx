import React, { useEffect, useState} from "react";
import "./css/community.css";
import { Header, MenuBar } from '../main/main';
import { Link, useLocation } from "react-router-dom"
import Pagination from "react-js-pagination";

const Community = () => {
    const [currentTab, setCurrentTab] = useState('recipe');
    const [tabChanged, setTabChanged] = useState(false);

    useEffect(()=>{
        if (tabChanged) {
            setTabChanged(false);
        }
    }, [tabChanged])

    const handleTabClick = (tab) => {
        setCurrentTab(tab);
        setTabChanged(true); // 상태 변경을 트리거
        console.log('currentTab', tab);
    };
    
    // api 연동되면 풀기
    // const handleTabClick = async (boardType) => {
    //     try { //게시판 타입 (레시피 / 자유) 
    //         const response = await fetch(`/api/boards/`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 "title": boardType,
    //                 "description": `${boardType} 게시판`,
    //             }),
    //         });
    //         if (response.ok) {
    //             setCurrentTab(boardType);
    //         } else {
    //             throw new Error('Failed to switch board');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // }

    return(
        <>
            <Header />
            <main className="communityMain main">
                <section className="sectionBBS commuSection">
                    <div className="tabsBBS commuHeader">
                        <button 
                            className={`recipeBtn ${currentTab === 'recipe' ? 'active' : ''}`} 
                            onClick={()=> {
                                handleTabClick('recipe')
                                console.log('currentTab',currentTab)
                            }}
                            // onClick={() => handleTabClick('recipe')}
                        >레시피 게시판</button>
                        <button 
                            className={`freeBtn ${currentTab === 'free' ? 'active' : ''}`} 
                            onClick={()=> {
                                handleTabClick('free')
                                console.log('currentTab',currentTab)
                            }
                            }
                            // onClick={() => handleTabClick('free')}
                        >자유 게시판</button>
                    </div>
                    {/* <div className="contentBBS">
                        {currentTab == "recipe" ? 
                        <RecipePostBBS createBoard={createBoard}/> 
                        : <FreePostBBS createBoard={createBoard}/>}
                    </div> */}
                    <div className="contentBBS">
                        <PostBBS 
                            key = {currentTab}
                            boardType={currentTab === "recipe" ? "레시피" : "자유 게시판" }
                            boardTitle={currentTab === "recipe" ? "recipe" : "free" }
                        />
                    </div>
                    {/* api 연동되면 풀기 */}
                    {/* <div className="contentBBS">
                        <PostBBS boardType={currentTab} boardTitle={currentTab === "recipe" ? "레시피" : "자유 게시판"} />
                    </div> */}
                </section>
            </main>
            <MenuBar />
        </>
    );
}


const PostBBS = ({ boardType, boardTitle}) => {
    console.log('보드 타입',boardType)
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();
    const newPost = location.state?.newPost;

    useEffect(() => { 
        const post = boardTitle == 'recipe' ? [// 잘뜨는지 시험용으로 만든 리스트
            { id: "1", title: '레시피1', content: '내용물1', author: '작성자', date: '7/28', img: '' },
            { id: "2", title: '레시피2', content: '내용물2', author: '작성자', date: '7/25', img: '' },
            { id: "3", title: '레시피3', content: '내용물2', author: '작성자', date: '7/25', img: '' },
            { id: "4", title: '레시피4', content: '내용물2', author: '작성자', date: '7/25', img: '' },
            { id: "5", title: '레시피5', content: '내용물2', author: '작성자', date: '7/25', img: '' },
            { id: "6", title: '레시피6', content: '내용물2', author: '작성자', date: '7/25', img: '' },
        ] : [
            { id: "1", title: '자유게시물1', content: '내용물1', author: '작성자', date: '7/28', img: '' },
            { id: "2", title: '자유게시물2', content: '내용물2', author: '작성자', date: '7/25', img: '' },
        ];
        setPosts(post);
        if (newPost) {
            setPosts(prevPosts => [newPost, ...prevPosts]);
        }
    }, [newPost]);
    console.log('newPost',newPost)
    console.log('posts',posts)


    // 검색어를 기준으로 게시글을 필터링
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // 현재 페이지에 해당하는 게시물 계산
    const LastPost = currentPage * 5; // 5 => 페이지 당 개수
    const FirstPost = LastPost - 5;
    const currentPosts = filteredPosts.slice(FirstPost, LastPost);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <form className={`${boardTitle}Form commuForm`}>
                <input
                    type="text"
                    className="searchInput"
                    placeholder={`${boardType} 검색`}
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button type="submit" className="searchBtn">
                    <span className="material-symbols-outlined">search</span>
                </button>
            </form>
            <ul className={`${boardTitle}Box commuBox`}>
                {currentPosts.map((post, i) => (
                    <li key={i} className={`${boardTitle}List commuList`}>
                        <Link
                            to={`/community/detail/${post.id}`}
                            className="txtBox"
                            state = {{post}}
                            onChange={() => console.log(post.id)}
                        >
                            <h4 className={`${boardTitle}Title commuTitle`}>{post.title}</h4>
                            <p className={`${boardTitle}Content commuContent`}>{post.content}</p>
                            <div className={`${boardTitle}Etc commuEtc`}>
                                <p className={`${boardTitle}Author commuAuthor`}>{post.author}</p>
                                <p className={`${boardTitle}Date commuDate`}>{post.date}</p>
                            </div>
                        </Link>
                        <img src={post.img || "https://via.placeholder.com/50"} alt="" />
                    </li>
                ))}
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={5}
                    totalItemsCount={filteredPosts.length}
                    pageRangeDisplayed={1}
                    prevPageText={"<"}
                    nextPageText={">"}
                    onChange={handlePageChange}
                />
                <Link 
                    to="/community/write"
                    state={{boardTitle}}
                >
                    <button className="writingBtn">
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                </Link>
            </ul>
        </>
    );
}


//api 연동 버전
// const PostBBS = ({ boardType, boardTitle}) => {
//     const [posts, setPosts] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const location = useLocation();
//     const newPost = location.state?.newPost;

//     const fetchPosts = async () => {
//         try {
//             const response = await fetch(`/api/boards/?type=${boardType}`);
//             if (response.ok) {
//                 const result = await response.json();
//                 setPosts(result || []);
//             } else {
//                 throw new Error('Failed to fetch posts');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     useEffect(() => {
//         fetchPosts();
//     }, [boardType]);

//     // 검색어를 기준으로 게시글을 필터링
//     const filteredPosts = posts.filter(post =>
//         post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.content.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     // 현재 페이지에 해당하는 게시물 계산
//     const LastPost = currentPage * 5; // 5 => 페이지 당 개수
//     const FirstPost = LastPost - 5;
//     const currentPosts = filteredPosts.slice(FirstPost, LastPost);

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     return (
//         <>
//             <form className={`${boardType}Form commuForm`}>
//                 <input
//                     type="text"
//                     className="searchInput"
//                     placeholder={`${boardTitle} 검색`}
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                 />
//                 <button type="submit" className="searchBtn">
//                     <span className="material-symbols-outlined">search</span>
//                 </button>
//             </form>
//             <ul className={`${boardType}Box commuBox`}>
//                 {currentPosts.map((post, i) => (
//                     <li key={i} className={`${boardType}List commuList`}>
//                         <Link
//                             to={`/community/detail/${post.id}`}
//                             className="txtBox"
//                             state = {{post}}
//                             onChange={() => console.log(post.id)}
//                         >
//                             <h4 className={`${boardType}Title commuTitle`}>{post.title}</h4>
//                             <p className={`${boardType}Content commuContent`}>{post.content}</p>
//                             <div className={`${boardType}Etc commuEtc`}>
//                                 <p className={`${boardType}Author commuAuthor`}>{post.author}</p>
//                                 <p className={`${boardType}Date commuDate`}>{post.date}</p>
//                             </div>
//                         </Link>
//                         <img src={post.img || "https://via.placeholder.com/50"} alt="" />
//                     </li>
//                 ))}
//                 <Pagination
//                     activePage={currentPage}
//                     itemsCountPerPage={5}
//                     totalItemsCount={filteredPosts.length}
//                     pageRangeDisplayed={1}
//                     prevPageText={"<"}
//                     nextPageText={">"}
//                     onChange={handlePageChange}
//                 />
//                 <Link to="/community/write">
//                     <button className="writingBtn">
//                         <span className="material-symbols-outlined">edit</span>
//                     </button>
//                 </Link>
//             </ul>
//         </>
//     );
// }
 

export default Community