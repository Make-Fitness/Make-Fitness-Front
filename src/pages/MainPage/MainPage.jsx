/**@jsxImportSource @emotion/react */
import * as s from './style';
import React from 'react';

function MainPage(props) {
  
  return (
    <div css={s.container}>
        <div css={s.header}>
          <div css={s.logo}><img src="/logo.png" alt="메인 로고" /></div>
          <div css={s.auth}>로그인 / 회원가입</div>
        </div>
        <div css={s.navigation}>
          <ul>
            <li>PT / 필라테스</li>
            <li>위치</li>
            <li>멤버십</li>
            <li>강사진</li>
            <li>리뷰</li>
          </ul>
        </div>
        <div css={s.mainImgs}>
          <div css={s.mainImg}><img src="/Main.png" alt="메인 이미지" /></div>
          <div css={s.mainImg}><img src="/main2.png" alt="메인2 이미지" /></div>
          <div css={s.mainImg}><img src="/main3.png" alt="메인2 이미지" /></div>
        </div>
        
        <div css={s.footer}>
          <p>© MAKE FITNESS. All rights reserved.</p>
        </div>
    </div>
  );
}

export default MainPage;