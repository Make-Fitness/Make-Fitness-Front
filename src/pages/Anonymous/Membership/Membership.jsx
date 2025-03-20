/**@jsxImportSource @emotion/react */
import { Link, useNavigate } from 'react-router-dom';
import { FaDumbbell, FaShoppingCart, FaClipboardList } from 'react-icons/fa';
import * as s from './style';
import React, { useState, useEffect } from 'react';
import HeaderPage from '../../../common/HeaderPage/HeaderPage';

function Membership() {
   const navigate = useNavigate();


  return (
    <div css={s.root}>
      <div css={s.container}>
         <HeaderPage />
        <div css={s.main}>
            <h1 css={s.title}>MAKE YOUR BODY, MAKE YOUR LIFE. 몸이 변하면 인생이 변한다.</h1>
          <div css={s.cardContainer}>
            <div css={s.card}>
              <FaDumbbell size={40} />
              <h3>1회 이용권</h3>
              <p>15,000원</p>
            </div>
            <div css={s.card}>
              <FaClipboardList size={40} />
              <h3>헬스 멤버십 구매</h3>
              <p></p>
            </div>
            <button css={s.card}>
                <FaDumbbell size={40} />
              <h3>그룹 필라테스</h3>
              <p>혼자보다 강하게! 그룹 필라테스로 최상의 시너지!</p>
            </button>
            <div css={s.card}>
              <FaDumbbell size={40} />
              <h3>1:1 PT</h3>
              <p>PT 홍보</p>
            </div>
          </div>
        </div>
        
        <div css={s.footer}>
          <p>© MAKE FITNESS. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Membership;
