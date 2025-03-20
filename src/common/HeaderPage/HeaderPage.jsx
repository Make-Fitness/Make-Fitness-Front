/**@jsxImportSource @emotion/react */
import * as s from './style';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MENUS } from '../../constants/menu';




function HeaderPage(props) {
 
  // 역할(role)과 해당하는 사용자 그룹을 매핑하는 객체
const roleMapping = {
  "ROLE_CUSTOMER": "customer", // 고객 역할
  "ROLE_MANAGER": "manager", // 관리자 역할
  "ROLE_MASTER": "master", // 최고 관리자 역할
  "ROLE_ANONYMOUS": "anonymous", // 로그인하지 않은 사용자 역할
};

  const navigate = useNavigate(); // 페이지 이동을 위한 훅 사용
  const [nickname, setNickname] = useState(() => localStorage.getItem("nickname") || ""); 
  const [role, setRole] = useState(() => {
    const storedRole = localStorage.getItem("rolename");
    return storedRole in roleMapping ? roleMapping[storedRole] : "anonymous";
  });

  // 페이지가 로드될 때 localStorage에서 사용자 정보를 불러옴
  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname") || "";
    const storedRole = localStorage.getItem("rolename") || "ROLE_ANONYMOUS";

    // 현재 상태와 다를 때만 업데이트 (불필요한 상태 변경 방지)
    if (nickname !== storedNickname) setNickname(storedNickname);
    if (role !== roleMapping[storedRole]) setRole(roleMapping[storedRole]);
  }, []); // 의존성 배열을 빈 배열로 유지하여 최초 실행 시에만 동작

  // 로그인 함수 - 서버에 로그인 요청을 보내고 사용자 정보를 저장
  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("/auth/signin", { email, password }); // 서버로 로그인 요청
      const { nickname, roleName, token } = response.data; // 응답에서 필요한 데이터 추출

      localStorage.setItem("nickname", nickname);
      localStorage.setItem("rolename", roleName);
      localStorage.setItem("accessToken", token);

      setNickname(nickname);
      setRole(roleMapping[roleName] || "anonymous");
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  // 로그아웃 함수 - 로컬 스토리지를 초기화하고 로그인 페이지로 이동
  const handleLogout = () => {
    localStorage.clear();
    setNickname("");
    setRole("anonymous");
    navigate("/auth/signin");
  };
  
  return (
    <div css={s.root}>
      <div css={s.container}>
        <div css={s.header}>
          <div css={s.logo}>
            <img src="/logo.png" alt="메인 로고" onClick={() => navigate("/auth")} />
          </div>
          <div css={s.signinbox}>
            {nickname ? (
              <span css={s.welcome}>
                {nickname}님 환영합니다 <button onClick={handleLogout} css={s.logout}>로그아웃</button>
              </span>
            ) : (
              <>
                <span css={s.signin} onClick={() => navigate("/auth/signin")}>로그인</span>
                <span css={s.signup} onClick={() => navigate("/auth/signup")}>회원가입</span>
              </>
            )}
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
      </div>
    </div>
  );
}



export default HeaderPage;