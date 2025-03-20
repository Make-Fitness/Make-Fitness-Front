/**@jsxImportSource @emotion/react */
import { Link, useNavigate } from 'react-router-dom';
import * as s from './style';
import React, { useState } from 'react';
import { MENUS } from "../../constants/menu";



function TrainerPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("customer");

  return (
    <div css={s.root}>
        <div css={s.container}>

        <div css={s.header}>
          <div css={s.logo}>
            <img
              src="/Main/logo.png"
              alt="메인 로고"
              onClick={() => navigate("/auth")}
            />
          </div>
          <div css={s.signinbox}>
            <span css={s.signin} onClick={() => navigate("/auth/signin")}>로그인</span>
            <span css={s.signup} onClick={() => navigate("/auth/signup")}>회원가입</span>
          </div>
        </div>

        
        <div css={s.navigation}>
          <ul>
            {MENUS[role]?.map(menu => (
              <li key={menu.id}>
                <Link to={menu.path}>{menu.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div css={s.topimg}>
          <img src="/Trainer/ppmain.jpg" alt="메인 이미지1" />
        </div>
        <div css={s.topGroup}>
          <div css={s.toptext1}>START YOUR FIT</div>
          <div css={s.toptext2}>근력운동 시작을 위한 모든것</div>
      
          <h2 css={s.managerIntroduceTitle}>
            강사진 소개
          </h2>
          <div css={s.toptext5}>
            <div css={s.mainImgs4}><img src="/Trainer/park.jpeg" alt="강사진 이미지" /></div>
            <div css={s.topTextGroup6}>
              <div css={s.toptext7}>박재훈</div>
              <div css={s.toptext6}>동국대학교 사회체육학과 졸업</div>
              <div css={s.toptext6}>2023 IFBB TEXAS Pro 클래식 피지크 우승</div>
              <div css={s.toptext6}>2023 MR.OLYMPIA 클래식 피지크 TOP10</div>
              <div css={s.toptext6}>2023 TAIWAN Pro 클래식 피지크 우승</div>
            </div>
          </div>
        
        <div css={s.toptext5}>
            <div css={s.mainImgs4}><img src="/Trainer/jang.jpg" alt="강사진 이미지" /></div>
            <div css={s.topTextGroup6}>
              <div css={s.toptext7}>장성엽</div>
              <div css={s.toptext6}>계명문화대 체육학과 학사졸업</div>
              <div css={s.toptext6}>퍼스널 트레이닝 2급</div>
              <div css={s.toptext6}>스포츠마사지 2급</div>
              <div css={s.toptext6}>유아체육지도자 2급</div>
              <div css={s.toptext6}>생활체육지도자 3급(보디빌딩)</div>
              <div css={s.toptext6}>펑셔널 트레이닝 마스터과정 수료</div>
            </div>
          </div>

          <div css={s.toptext5}>
            <div css={s.mainImgs4}><img src="/Trainer/kang.jpg" alt="강사진 이미지" /></div>
            <div css={s.topTextGroup6}>
              <div css={s.toptext7}>강두혁</div>
              <div css={s.toptext6}>한국체육대학교 운동건강관리학과 보디빌딩 학사</div>
              <div css={s.toptext6}>스포츠 테이핑사 1급</div>
              <div css={s.toptext6}>스포츠마사지 1급</div>
              <div css={s.toptext6}>유아체육지도자 1급</div>
              <div css={s.toptext6}>체형관리사 1급</div>
            </div>
          </div>

          <div css={s.toptext5}>
            <div css={s.mainImgs4}><img src="/Trainer/shin.jpg" alt="강사진 이미지" /></div>
            <div css={s.topTextGroup6}>
              <div css={s.toptext7}>신소영</div>
              <div css={s.toptext6}>리더십 지도자 1급</div>
              <div css={s.toptext6}>레크레이션지도사 1급</div>
              <div css={s.toptext6}>스포츠마사지 1급</div>
              <div css={s.toptext6}>유아체육지도자 1급</div>
              <div css={s.toptext6}>CPR(긴급구조심폐소생술)교육 수료</div>
            </div>
          </div>
          
          <div css={s.toptext5}>
            <div css={s.mainImgs4}><img src="/Trainer/kim.jpg" alt="강사진 이미지" /></div>
            <div css={s.topTextGroup6}>
              <div css={s.toptext7}>김지영</div>
              <div css={s.toptext6}>muscle care pliates level 1 trapeze</div>
              <div css={s.toptext6}>muscle care pliates level 2 reformer</div>
              <div css={s.toptext6}>muscle care pliates level 3 mat</div>
              <div css={s.toptext6}>수중재활자격증</div>
              <div css={s.toptext6}>테이핑자격증</div>
              <div css={s.toptext6}>한국재활필라테스 자격증</div>
            </div>
          </div>
        </div>
          
        <div css={s.mainImgs2}>
          <div css={s.mainImgs}><img src="/Trainer/ppmain_3.jpg" alt="메인 이미지3" /></div>
          <div css={s.mainImgs}><img src="/Trainer/ppmain_3.jpg" alt="메인 이미지3" /></div>
          <div css={s.mainImgs}><img src="/Trainer/ppmain_3.jpg" alt="메인 이미지3" /></div>
          <div css={s.mainImgs}><img src="/Trainer/ppmain_3.jpg" alt="메인 이미지3" /></div>
        </div>
        
        <div css={s.footer}>
          <p>© MAKE FITNESS. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
}

export default TrainerPage;
