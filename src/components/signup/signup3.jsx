import React from 'react';
import './css/signup3.css'

import { useState } from 'react';

const SignUpPage3 = () => {

    return (
        <>
            <header>
                <button className="material-symbols-outlined">arrow_back_ios</button>
                <span className="logoIcon"></span>
            </header>
            <section id='page3Section'>
                <h4>OO님의 하루 활동량</h4>
                <form action="" onsubmit='' className='form'>
                    <div className="lightContent contentBox">
                        <input type="radio" name='activity' id='light'/>
                        <label className="lightTxt">가벼운 활동</label>
                    </div>
                    <div className='contentBox'>
                        <input type="radio" name='activity' id='moderate'/>
                        <label className="moderateTxt">중등도 활동</label>
                    </div>
                    <div className='contentBox'>
                        <input type="radio" name='activity' id='strong'/>
                        <label className="strongTxt">강한 활동</label>
                    </div>
                    <div className='contentBox'>
                        <input type="radio" name='activity' id='veryStrong'/>
                        <label className="veryStrongTxt">아주 강한 활동</label>
                    </div>
                    <button className="checkBtn"><span className="material-symbols-outlined">check</span></button>
                </form>
                <div id="graphContainer">
                    <div className="level">
                        <span className="circle"></span>
                        <h5>25</h5>
                        <h6 className='type'>가벼운</h6>
                        <p className='detail'>앉아서 하는 일</p>
                        <p className='detailEX'>일반사무,</p>
                        <p className="detailEX">자녀가 없는 주부 등</p>
                    </div>
                    <div className="level">
                        <span className="circle"></span>
                        <h5>30</h5>
                        <h6 className='type'>중등도</h6>
                        <p className='detail'>서서 하는 일</p>
                        <p className='detailEX'>서비스업,</p>
                        <p className="detailEX">어린 자녀가 있는 주부 등</p>
                    </div>
                    <div className="level">
                        <span className="circle"></span>
                        <h5>35</h5>
                        <h6 className='type'>강한</h6>
                        <p className='detail'>활동량이 많은 일</p>
                        <p className='detailEX'>농업,어업,건설 등</p>
                    </div>
                    <div className="level">
                        <span className="circle"></span>
                        <h5>40</h5>
                        <h6 className='type'>아주 강한</h6>
                        <p className='detailEX lastEX'>운동선수 등</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SignUpPage3;