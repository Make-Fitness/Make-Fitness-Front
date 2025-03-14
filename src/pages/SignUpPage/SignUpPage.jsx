import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
/**@jsxImportSource @emotion/react */
import * as s from './style';
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  return (
    <div css={s.container}>
      <img src="/logo.png" alt="MAKE FITNESS" css={s.logo} onClick={() => navigate("/auth")}/>

      <form css={s.form}>
        <label>ID를 입력하세요</label>
        <input type="text" placeholder="ID 입력" />

        <label>비밀번호를 입력하세요</label>
        <input type="password" placeholder="비밀번호 입력" />

        <label>비밀번호 확인</label>
        <input type="password" placeholder="비밀번호 확인" />

        <label>휴대폰번호</label>
        <input type="text" placeholder="휴대폰번호 입력" />

        <label>이메일주소</label>
        <input type="email" placeholder="이메일 입력" />

      </form> 
          <div css={s.socialLogin}>
            <button css={s.googleLogin}>
              <span><FcGoogle /></span>
              구글로 시작
            </button>
            <button css={s.naverLogin}>
              <img src="/navericon.png" alt="" />
              네이버로 시작
            </button>
          </div>
        

          <button css={s.signUpButton}>회원가입</button>

          <div css={s.signinContainer}>
              <span css={s.qtext}>계정이 이미 있으신가요?</span>
              <span css={s.highlightedText} onClick={() => navigate("/auth/signin")}>
                가입하기
              </span>
          </div>
    </div>
    
  );
};


export default SignUpPage;