import React from 'react';
import './intro.css';
import { useState } from 'react';

const IntroPage = () => {


    return (
        <section className='container'>
            <div className='logoBox'>
                <span></span>
            </div>
            <div className="loginBox">
                <p className="loginTxt">Login</p>
                <div className="ID">
                    <p className="idTxt">ID</p>
                    <input type="text" className="idInput" />
                </div>
                <div className="password">
                    <p className="pwdTxt">Password</p>
                    <input type="password" className="pwdInput" />
                </div>
                <button className="signupBtn">
                    <span className="signupIcon"></span>
                    회원가입
                </button>
                <div className="guestLogin">
                    <a href="#">로그인 없이 둘러보기</a>
                </div>
            </div>
        </section>
    );
}

export default IntroPage;
