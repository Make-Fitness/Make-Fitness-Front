import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
/**@jsxImportSource @emotion/react */
import * as s from './style';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ValidInput from "../../components/auth/ValidInput";
import { useJoinMutation } from "../../mutations/authMutation";

const SignUpPage = () => {
    const navigate = useNavigate();
    const joinMutation = useJoinMutation();

    const [inputValue, setInputValue] = useState({
        nickname: "",
        gender: "",
        username: "",
        password: "",
        passwordCheck: "",
        ph: "",
        email: "",
    });

    const handleGenderChange = (gender) => {
        setInputValue(prev => ({
            ...prev,
            gender,
        }));
    };

    const handleInputOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const isErrors = () => {
        return Object.values(inputValue).some(value => value.trim() === "");
    };

    const handleJoinOnClick = () => {
        if (isErrors()) {
            alert("가입 정보를 다시 확인해주세요.");
            return;
        }

        joinMutation.mutate(inputValue, {
            onSuccess: (response) => {
                alert("가입해 주셔서 감사합니다.");
                navigate(`/auth/login?username=${response.data.username}`);
            },
            onError: (error) => {
                console.error("회원가입 오류:", error.response || error);
                alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        });
    };

    return (
        <div css={s.container}>
            <img src="/logo.png" alt="MAKE FITNESS" css={s.logo} onClick={() => navigate("/auth")} />
            <form css={s.form}>
                <label css={s.label}>이름을 입력하세요</label>
                <ValidInput name="nickname" value={inputValue.nickname} onChange={handleInputOnChange} type="text" placeholder="이름 입력" css={s.input} />

                <label css={s.label}>성별을 선택해주세요</label>
                <div css={s.genderContainer}>
                    <label css={s.genderBox}>남성
                        <input type="radio" name="gender" value="남자" checked={inputValue.gender === "남자"} onChange={() => handleGenderChange("남자")} />
                    </label>
                    <label css={s.genderBox}>여성
                        <input type="radio" name="gender" value="여자" checked={inputValue.gender === "여자"} onChange={() => handleGenderChange("여자")} />
                    </label>
                </div>

                <label css={s.label}>ID를 입력하세요</label>
                <ValidInput name="username" value={inputValue.username} onChange={handleInputOnChange} type="text" placeholder="ID 입력" css={s.input} />
                
                <label css={s.label}>비밀번호를 입력하세요</label>
                <ValidInput name="password" value={inputValue.password} onChange={handleInputOnChange} type="password" placeholder="비밀번호 입력" css={s.input} />
                
                <label css={s.label}>비밀번호 확인</label>
                <ValidInput name="passwordCheck" value={inputValue.passwordCheck} onChange={handleInputOnChange} type="password" placeholder="비밀번호 확인" css={s.input} />
                
                <label css={s.label}>휴대폰번호</label>
                <ValidInput name="ph" value={inputValue.ph} type="text" onChange={handleInputOnChange} placeholder="휴대폰번호 입력" css={s.input} />
                
                <label css={s.label}>이메일주소</label>
                <ValidInput name="email" value={inputValue.email} onChange={handleInputOnChange} type="email" placeholder="이메일 입력" css={s.input} />
            </form>
            
            <div css={s.socialLogin}>
                <button css={s.googleLogin}>
                    <span><FcGoogle /></span>
                    구글로 시작
                </button>
                <button css={s.naverLogin}>
                    <SiNaver size={20} /> 네이버로 시작
                </button>
            </div>
            
            <button css={s.signUpButton} onClick={handleJoinOnClick}>회원가입</button>
            
            <div css={s.signinContainer}>
                <span css={s.qtext}>계정이 이미 있으신가요?</span>
                <span css={s.highlightedText} onClick={() => navigate("/auth/signin")}>
                    로그인하기
                </span>
            </div>
        </div>
    );
};

export default SignUpPage;
