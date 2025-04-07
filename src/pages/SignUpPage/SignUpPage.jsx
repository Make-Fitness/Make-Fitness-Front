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

    const [errors, setErrors] = useState({
        nickname: "",
        username: "",
        password: "",
        passwordCheck: "",
        ph: "",
        email: "",
    });

    const validateInput = (name, value) => {
        let errorMessage = "";

        switch (name) {
            case "nickname":
                if (!/^[가-힣a-zA-Z]{2,}$/.test(value)) {
                    errorMessage = "이름은 한글 또는 영어 2~20자로 입력하세요.";
                }
                break;
            case "username":
                if (!/^[a-z0-9]{5,15}$/.test(value)) {
                    errorMessage = "아이디는 영소문자 및 숫자로 5~15자여야 합니다.";
                }
                break;
            case "password":
                if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/.test(value)) {
                    errorMessage = "비밀번호는 영문, 숫자, 특수문자를 포함하여 8~20자여야 합니다.";
                }
                break;
            case "passwordCheck":
                if (value !== inputValue.password) {
                    errorMessage = "비밀번호가 일치하지 않습니다.";
                }
                break;
            case "ph":
                if (!/^\d{9,11}$/.test(value)) {
                    errorMessage = "전화번호는 숫자 9~11자여야 합니다.";
                }
                break;
            case "email":
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                    errorMessage = "올바른 이메일 주소를 입력하세요.";
                }
                break;
            default:
                break;
        }

        setErrors(prev => ({ ...prev, [name]: errorMessage }));
    };

    const handleInputOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue(prev => ({ ...prev, [name]: value }));
        validateInput(name, value);
    };

    const isErrors = () => {
        return Object.values(errors).some(error => error !== "") || 
               Object.values(inputValue).some(value => value.trim() === "");
    };

    const handleJoinOnClick = async () => {
        if (isErrors()) {
            alert("가입 정보를 다시 확인해주세요.");
            return;
        }
    
        try {
            const response = await joinMutation.mutateAsync(inputValue); 
            await new Promise((resolve) => setTimeout(resolve, 100)); 
            alert("가입해 주셔서 감사합니다."); 
            navigate("/auth/signin");
        } catch (error) {
            console.error("회원가입 오류:", error.response || error);
            if (error.response && error.response.status === 400) {
                const errorMessages = error.response.data; 
                if (Array.isArray(errorMessages)) {
                    alert(errorMessages[0].message);
                } else {
                    alert(errorMessages.message || "회원가입 중 오류가 발생했습니다.");
                }
                return;
            }
            alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div css={s.container}>
            <img src="/main/logo.png" alt="MAKE FITNESS" css={s.logo} onClick={() => navigate("/")} />
            <form css={s.form}>
                <label css={s.label}>이름을 입력하세요</label>
                <ValidInput name="nickname" value={inputValue.nickname} onChange={handleInputOnChange} type="text" placeholder="이름 입력" css={s.input} />
                {errors.nickname && <p css={s.errorText}>{errors.nickname}</p>}

                <label css={s.label}>성별을 선택해주세요</label>
                <div css={s.genderContainer}>
                    <label css={s.genderBox}>남성
                        <input type="radio" name="gender" value="남성" checked={inputValue.gender === "남성"} onChange={() => setInputValue(prev => ({ ...prev, gender: "남성" }))} />
                    </label>
                    <label css={s.genderBox}>여성
                        <input type="radio" name="gender" value="여성" checked={inputValue.gender === "여성"} onChange={() => setInputValue(prev => ({ ...prev, gender: "여성" }))} />
                    </label>
                </div>

                <label css={s.label}>ID를 입력하세요</label>
                <ValidInput name="username" value={inputValue.username} onChange={handleInputOnChange} type="text" placeholder="ID 입력" css={s.input} />
                {errors.username && <p css={s.errorText}>{errors.username}</p>}

                <label css={s.label}>비밀번호를 입력하세요</label>
                <ValidInput name="password" value={inputValue.password} onChange={handleInputOnChange} type="password" placeholder="비밀번호 입력" css={s.input} />
                {errors.password && <p css={s.errorText}>{errors.password}</p>}

                <label css={s.label}>비밀번호 확인</label>
                <ValidInput name="passwordCheck" value={inputValue.passwordCheck} onChange={handleInputOnChange} type="password" placeholder="비밀번호 확인" css={s.input} />
                {errors.passwordCheck && <p css={s.errorText}>{errors.passwordCheck}</p>}

                <label css={s.label}>휴대폰번호</label>
                <ValidInput name="ph" value={inputValue.ph} onChange={handleInputOnChange} type="text" placeholder="휴대폰번호 입력" css={s.input} />
                {errors.ph && <p css={s.errorText}>{errors.ph}</p>}

                <label css={s.label}>이메일주소</label>
                <ValidInput name="email" value={inputValue.email} onChange={handleInputOnChange} type="email" placeholder="이메일 입력" css={s.input} />
                {errors.email && <p css={s.errorText}>{errors.email}</p>}
            </form>
            
            <button css={s.signUpButton} onClick={handleJoinOnClick}>회원가입</button>
            
            <div css={s.signinContainer}>
                <span>계정이 이미 있으신가요?</span>
                <span css={s.highlightedText} onClick={() => navigate("/auth/signin")}>
                    로그인하기
                </span>
            </div>
        </div>
    );
};

export default SignUpPage;
