/**@jsxImportSource @emotion/react */
import * as s from './style';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MENUS } from '../../../constants/menu';

function MainHeader(props) {
  const roleMapping = {
    "ROLE_CUSTOMER": "customer",
    "ROLE_MANAGER": "manager",
    "ROLE_MASTER": "master",
    "ROLE_ANONYMOUS": "anonymous",
  };

  const navigate = useNavigate();
  const [nickname, setNickname] = useState(localStorage.getItem("nickname") || ""); 
  const [role, setRole] = useState(() => {
    const storedRole = localStorage.getItem("roleName") || "ROLE_ANONYMOUS";
    return roleMapping[storedRole] || "anonymous";
  });

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname") || "";
    const storedRole = localStorage.getItem("roleName") || "ROLE_ANONYMOUS";
    const mappedRole = roleMapping[storedRole] || "anonymous";

    console.log("LocalStorage roleName:", storedRole);
    console.log("Mapped Role:", mappedRole);
    console.log("MENUS[role]:", MENUS[mappedRole]);

    setNickname(storedNickname);
    setRole(mappedRole);
  }, []); // ✅ 한 번 실행 후, 상태 업데이트 발생 시 다시 실행됨

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("/auth/signin", { email, password });
      const { nickname, token, roll_name, roleName } = response.data;

      localStorage.setItem("nickname", nickname);
      localStorage.setItem("roleName", roll_name || roleName);  // ✅ roleName으로 저장
      localStorage.setItem("accessToken", token);

      setNickname(nickname);
      setRole(roleMapping[(roll_name || roleName)] || "anonymous");

      // 강제 새로고침 (페이지 상태를 확실히 반영)
      window.location.reload();
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setNickname("");
    setRole("anonymous");
    navigate("/auth/signin");
    window.location.reload(); // 로그아웃 후 새로고침
  };

  return (
      <div>
        <div css={s.header}>
          <div css={s.logo}>
            <img src="/main/logo.png" alt="메인 로고" onClick={() => navigate("/")} />
          </div>
          <div css={s.signinbox}>
            {nickname ? (
              <span css={s.welcome}>
                {nickname}님 환영합니다 <button onClick={handleLogout} css={s.logout}>로그아웃</button>
              </span>
            ) : (
              <>
                <span css={s.sign} onClick={() => navigate("/auth/signin")}>로그인</span>
                <span css={s.sign} onClick={() => navigate("/auth/signup")}>회원가입</span>
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
            )) || <li>메뉴 없음</li>}  {/* 만약 undefined이면 기본값 표시 */}
          </ul>
        </div>
      </div>
  );
}

export default MainHeader;
