import React from 'react';
import './css/signup1.css'

import { useState } from 'react';

const SignUpPage1 = () => {


    return (
        <>
            <header>
                <button className="material-symbols-outlined">arrow_back_ios</button>
                <span className="logoIcon"></span>
            </header>
            <section>
                <h4>회원가입 정보를 입력하세요</h4>
                <form className="inputContainer">
                    <div className="idBox">
                        <label className='idTxt'>아이디</label>
                        <input type="text" className='idInput'/>
                    </div>
                    <div className="pwdBox">
                        <label className='pwdTxt'>비밀번호</label>
                        <input type="text" className='pwdInput'/>
                    </div>
                    <div className="emailBox">
                        <label className='emailTxt' >Email</label>
                        <input type="email" className='emailInput'/>
                    </div>
                    <div className="nickBox">
                        <label className='nickTxt'>닉네임</label>
                        <input type="text" className='nickInput'/>
                    </div>
                    <button className="checkBtn"><span className="material-symbols-outlined">check</span></button>
                </form>
            </section>
        </>
    );
}

export default SignUpPage1;
