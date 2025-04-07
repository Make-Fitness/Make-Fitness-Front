/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MENUS } from '../../../constants/menu';

function MainHeader() {
  const navigate = useNavigate();

  // 역할 매핑: Spring Security 권한 문자열 → 프론트 용 간단한 역할명
  const roleMapping = {
    ROLE_CUSTOMER: 'customer',
    ROLE_MANAGER: 'manager',
    ROLE_MASTER: 'master',
    ROLE_ANONYMOUS: 'anonymous',
  };

  // 로그인 상태와 역할 저장
  const [nickname, setNickname] = useState('');
  const [role, setRole] = useState('anonymous');

  // 로컬 스토리지 기반 상태 초기화
  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname') || '';
    const storedRole = localStorage.getItem('roleName') || 'ROLE_ANONYMOUS';
    const mappedRole = roleMapping[storedRole] || 'anonymous';

    setNickname(storedNickname);
    setRole(mappedRole);
  }, []);

  // 로그인 시 처리 함수 (사용 안하는 경우 삭제 가능)
  const handleLogin = async (email, password) => {
    try {
      const res = await axios.post('/auth/signin', { email, password });
      const { nickname, token, roleName, roll_name } = res.data;

      const resolvedRole = roll_name || roleName;

      localStorage.setItem('nickname', nickname);
      localStorage.setItem('roleName', resolvedRole);
      localStorage.setItem('accessToken', token);

      setNickname(nickname);
      setRole(roleMapping[resolvedRole] || 'anonymous');

      window.location.reload(); // 로그인 후 전체 리렌더링
    } catch (err) {
      console.error('로그인 실패:', err);
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.clear();
    setNickname('');
    setRole('anonymous');
    navigate('/auth/signin');
    window.location.reload(); // 상태 초기화 후 새로고침
  };

  return (
    <div>
      {/* 상단 헤더 */}
      <div css={s.header}>
        <div css={s.logo}>
          <img
            src="/main/logo.png"
            alt="메인 로고"
            onClick={() => navigate('/')}
          />
        </div>

        {/* 로그인 or 환영 메시지 */}
        <div css={s.signinbox}>
          {nickname ? (
            <span css={s.welcome}>
              {nickname}님 환영합니다{' '}
              <button onClick={handleLogout} css={s.logout}>
                로그아웃
              </button>
            </span>
          ) : (
            <>
              <span css={s.sign} onClick={() => navigate('/auth/signin')}>
                로그인
              </span>
              <span css={s.sign} onClick={() => navigate('/auth/signup')}>
                회원가입
              </span>
            </>
          )}
        </div>
      </div>

      {/* 네비게이션 메뉴 */}
      <div css={s.navigation}>
        <ul>
          {(MENUS[role] || []).map((menu) => (
            <li key={menu.id}>
              <Link to={menu.path}>{menu.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MainHeader;
