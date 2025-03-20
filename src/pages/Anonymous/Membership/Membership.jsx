/**@jsxImportSource @emotion/react */
import { GrYoga, GrAccessibility } from "react-icons/gr";
import { FaDumbbell, FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import * as s from './style';
import React from 'react';
import HeaderPage from '../../../common/HeaderPage/HeaderPage';

function Membership() {
   const navigate = useNavigate();

  return (
    <div css={s.root}>
      {/* 네비게이션 바가 화면 상단에 고정되도록 설정 */}
      <div css={s.headerWrapper}>
        <HeaderPage />
      </div>

      <div css={s.container}>
        <div css={s.main}>
          <h1 css={s.title}>MAKE YOUR BODY, MAKE YOUR LIFE. 몸이 변하면 인생이 변한다.</h1>
          
          
          <div css={s.buttonGrid}>
            <button css={s.button} >
              <h3>1회 이용권</h3>
              <p>15,000원</p>
            </button>
            <button css={s.button}>
              <h3>헬스 멤버십</h3>
            </button>
            <button css={s.button} onClick={() => navigate("/makefitness/pilates")}>
              <h3>그룹 필라테스</h3>
              <p>혼자보다 강하게! 그룹 필라테스로 최상의 시너지!</p>
            </button>
            <button css={s.button} onClick={() => navigate("/makefitness/pilates")}>
              <h3>1:1 PT</h3>
              <p>PT 홍보</p>
            </button>
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
