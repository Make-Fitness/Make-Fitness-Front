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
  const joinMutaion = useJoinMutation();

  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderChange = (gender) => {
    setInputValue((prev) => ({
        ...prev,
        gender: prev.gender === gender ? "" : gender, 
    }));
    console.log(gender);
  };

  const [ inputValue, setInputValue ] = useState({
    nickname: "",
    gender: "",
    username: "",
    password: "",
    passwordCheck: "",
    ph: "",
    email: "",
  }); 

  const handleInputOnChange = (e) => {
    setInputValue(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
    }));
  }

  const [ inputValidError, setInputValidError ] = useState({
    nickname: false,
    gender: null,
    username: false,
    password: false,
    passwordCheck: false,
    ph: false,
    email: false,
  });

  const isErrors = () => {
    const isEmpty = Object.values(inputValue).map(value => !!value).includes(false);
    const isValid = Object.values(inputValidError).includes(true);
    return isEmpty || isValid;
} 

  const handlePasswordOnFocus = () => {
    setInputValue(prev => ({
        ...prev,
        password: "",
        passwordCheck: "",
    }));
  }

  const handleJoinOnClick = () => {
    if(isErrors()) {
        alert("가입 정보를 다시 확인해주세요.");
        return;
  }

    joinMutaion.mutateAsync({
      username: inputValue.username, 
      email: inputValue.email, 
      password: inputValue.password,
  }).then(response => {
      alert("가입해 주셔서 감사합니다.");
      navigate(`/auth/login?username=${response.data.username}`);
  }).catch(error => {
      if(error.status === 400){
          setInputValidError(prev => ({
              ...prev,
              username: true,
          }));
      }
  })
}


  return (
    <div css={s.container}>
      <img src="/logo.png" alt="MAKE FITNESS" css={s.logo} onClick={() => navigate("/auth")} />

      <form css={s.form}>
      <label css={s.label}>이름을 입력하세요</label>
    <ValidInput 
        name="nickname" 
        value={inputValue.nickname} 
        onChange={handleInputOnChange} 
        type="text" 
        placeholder="이름 입력" 
        css={s.input} 
        regexp={/^[가-힣a-zA-Z]{2,10}$/} 
        inputValidError={inputValidError}
        setInputValidError={setInputValidError}
        errorMessage="이름은 한글 또는 영어 2~10자 이내로 입력하세요."
    />

    <label css={s.label}>성별을 선택해주세요</label>
    <div css={s.genderContainer}>
      <label css={s.genderBox}>
        남성 
        <ValidInput 
            name="gender" 
            value={inputValue.gender} 
            type="radio" 
            checked={inputValue.gender === "남자"} 
            onChange={() => handleGenderChange("남자")} 
            regexp={ /^(남자|여자)$/}
            inputValidError={inputValidError}
            setInputValidError={setInputValidError}
            errorMessage="성별을 선택해주세요."
        />
      </label>
      <label css={s.genderBox}>
        여성 
        <ValidInput 
            name="gender" 
            value={inputValue.gender} 
            type="radio" 
            checked={inputValue.gender === "여자"} 
            onChange={() => handleGenderChange("여자")} 
            regexp={ /^(남자|여자)$/}
            inputValidError={inputValidError}
            setInputValidError={setInputValidError}
            errorMessage="성별을 선택해주세요."
        />
      </label>
    </div>

    <label css={s.label}>ID를 입력하세요</label>
    <ValidInput 
        name="username" 
        value={inputValue.username}
        onChange={handleInputOnChange} 
        type="text" 
        placeholder="ID 입력" 
        css={s.input}
        regexp={/^[a-zA-Z0-9]{5,12}$/}
        inputValidError={inputValidError}
        setInputValidError={setInputValidError}
        errorMessage="아이디는 영문 또는 숫자로 5~12자 입력하세요."
    />

    <label css={s.label}>비밀번호를 입력하세요</label>
    <ValidInput 
        name="password" 
        value={inputValue.password} 
        onChange={handleInputOnChange} 
        onFocus={handlePasswordOnFocus} 
        type="password" 
        placeholder="비밀번호 입력" 
        css={s.input} 
        regexp={/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/} 
        inputValidError={inputValidError}
        setInputValidError={setInputValidError}
        errorMessage="비밀번호는 영문, 숫자, 특수문자를 포함한 8~16자로 입력하세요."
    />

    <label css={s.label}>비밀번호 확인</label>
    <ValidInput 
        name="passwordCheck" 
        value={inputValue.passwordCheck} 
        onChange={handleInputOnChange}
        type="password" 
        placeholder="비밀번호 확인" 
        css={s.input} 
        inputValidError={inputValidError}
        setInputValidError={setInputValidError}
        errorMessage={
            inputValue.password !== inputValue.passwordCheck
                ? "비밀번호가 일치하지 않습니다."
                : ""
        }
    />

    <label css={s.label}>휴대폰번호</label>
    <ValidInput 
        name="ph" 
        value={inputValue.ph} 
        type="text" 
        onChange={handleInputOnChange} 
        placeholder="휴대폰번호 입력" 
        css={s.input} 
        regexp={/^01[016789]-?\d{3,4}-?\d{4}$/} 
        inputValidError={inputValidError}
        setInputValidError={setInputValidError}
        errorMessage="휴대폰번호는 010-1234-5678 형식으로 입력하세요."
    />

    <label css={s.label}>이메일주소</label>
    <ValidInput 
        name="email" 
        value={inputValue.email} 
        onChange={handleInputOnChange} 
        type="email" 
        placeholder="이메일 입력" 
        css={s.input} 
        regexp={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
        inputValidError={inputValidError}
        setInputValidError={setInputValidError}
        errorMessage="올바른 이메일 형식을 입력하세요."
    />
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