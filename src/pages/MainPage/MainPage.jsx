/**@jsxImportSource @emotion/react */
import { Link, useNavigate } from 'react-router-dom';
import * as s from './style';
import React, { useState, useEffect } from 'react';
import { MENUS } from '../../constants/menu';
import axios from 'axios';

function MainPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("customer");

  const roleMapping = {  // roleMapping을 먼저 정의
    "ROLE_CUSTOMER": "customer",
    "ROLE_MANAGER": "manager",
    "ROLE_MASTER": "master",
    "ROLE_ANONYMOUS": "anonymous"
  };
  
  const [role, setRole] = useState(() => {
    const storedRole = localStorage.getItem("role");
    return roleMapping[storedRole] || "anonymous";
  });

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    const storedRole = localStorage.getItem("role");
  
    if (storedNickname) {
      setNickname(storedNickname);
    }
    if (storedRole && roleMapping[storedRole]) {
      setRole(roleMapping[storedRole]);
    }
  }, []); // role을 의존성에서 제거하여 무한 리렌더링 방지

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("/auth/signin", { email, password });
      const { nickname, roleName, token } = response.data;
  
      const mappedRole = roleMapping[roleName] || "anonymous";
  
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("role", roleName);
      localStorage.setItem("accessToken", token);
  
      setNickname(nickname);
      setRole(mappedRole);
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // 모든 저장된 로컬스토리지 데이터 제거
    setNickname(""); 
    setRole("anonymous");
    navigate("/auth/signin"); 
  };

  return (
    <div css={s.root}> {/* 전체 페이지 스타일 적용 */}
      <div css={s.container}> {/* 컨테이너 스타일 적용 */}
        <div css={s.header}> {/* 헤더 영역 */}
          <div css={s.logo}> {/* 로고 영역 */}
            <img src="/main/logo.png" alt="메인 로고" onClick={() => navigate("/")} /> {/* 로고 클릭 시 로그인 페이지로 이동 */}
          </div>
          <div css={s.signinbox}> {/* 로그인/회원가입 또는 환영 메시지 */}
            {nickname ? (
              <span css={s.welcome}> {/* 로그인 시 닉네임 표시 */}
                {nickname}님 환영합니다 <button onClick={handleLogout} css={s.logout}>로그아웃</button>
              </span>
            ) : (
              <>
                <span css={s.signin} onClick={() => navigate("/auth/signin")}>로그인</span> {/* 로그인 버튼 */}
                <span css={s.signup} onClick={() => navigate("/auth/signup")}>회원가입</span> {/* 회원가입 버튼 */}
              </>
            )}
          </div>
        </div>
        <div css={s.navigation}> {/* 네비게이션 영역 */}
          <ul>
            {MENUS[role]?.map(menu => (
              <li key={menu.id}> {/* 역할(role)에 따라 네비게이션 메뉴 출력 */}
                <Link to={menu.path}>{menu.name}</Link> {/* 메뉴 클릭 시 해당 경로로 이동 */}
              </li>
            ))}
          </ul>
        </div>
        <div css={s.mainImgs}> {/* 메인 이미지 영역 */}
          <div css={s.mainImg}><img src="/main/Main.png" alt="메인 이미지" /></div>
          <div css={s.mainImg}><img src="/main/PT_1.jpg" alt="메인2 이미지" /></div>
          <div css={s.mainImg}><img src="/main/PT_2.jpg" alt="메인3 이미지" /></div>
          <div css={s.mainImg}><img src="/main/PT_3.jpg" alt="메인4 이미지" /></div>        
        </div>
        <div css={s.footer}> {/* 푸터 영역 */}
          <p>© MAKE FITNESS. All rights reserved.</p> {/* 저작권 표시 */}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
