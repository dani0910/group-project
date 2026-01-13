import React from 'react';
import './css/signup2.css'

import { useState } from 'react';

const SignUpPage2 = () => {

    return (
        <>
            <header>
                <button className="material-symbols-outlined">arrow_back_ios</button>
                <span className="logoIcon"></span>
            </header>
            <section id='page2Section'>
                <h4>OO님의 정보를 입력해주세요</h4>
                <form action="" className="formContainer" onsubmit=''>
                    <div className="ageBox">
                        <label className="ageTxt">나이</label>
                        <div className='outlineBox outlineAge'>
                            <input type="number" className='ageInput' /> 세
                        </div>
                    </div>
                    <div className="genderBox">
                        <label className="genderTxt">성별</label>
                        <div className="outlineBox outlineGender">
                            여자 <input type="radio" name='gender' id='female'/>
                            남자 <input type="radio" name='gender' id='male'/>
                        </div>
                    </div>
                    <div className="heightBox">
                        <label className="heightTxt">키</label>
                        <div className='outlineBox'>
                            <input type="number" className='heightInput' /> cm
                        </div>
                    </div>
                    <div className="weightBox">
                        <label className="weightTxt">몸무게</label>
                        <div className='outlineBox'>
                            <input type="number" className='weightInput' /> kg
                        </div>
                    </div>
                    <button className="checkBtn"><span className="material-symbols-outlined">check</span></button>
                </form>
            </section>
        </>
    );
}

export default SignUpPage2;