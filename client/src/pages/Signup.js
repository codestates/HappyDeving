import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, reset } from "../features/user/userSlice";
import LoadingIndicator from "../components/LoadingIndicator";
import styled from "styled-components";
import Container from "../components/styles/Container.styled";
import Content from "../components/styles/Content.styled";

const SignupContainer = styled(Container)`
  grid-column: 1/ 15;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  font-size: 18px;
  font-weight: 500;
`;

const SignupWrap = styled(Content)`
  display: flex;
  min-width: 400px;
  width: 100%;
  height: 100%;
  padding: 20px;
  grid-column: 4/12;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  form {
    display: flex;
    width: 90%;
    flex-direction: column;
  }
  input {
    display: flex;
    background: transparent;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px 10px;
    width: 100%;
    /* background: white; */
    border: none;
    border-bottom: 3px solid #ccc;
  }
  input:hover {
    outline: none;
    border-bottom: 3px solid #6733e5;
  }
  input:focus {
    outline: none;
    border-bottom: 3px solid #6733e5;
  }
`;
const Title = styled.div`
  display: flex;
  color: #6733e5;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-size: 35px;
  font-weight: 900;
  text-shadow: 1px 1px 1px #c593fe;
`;
const Text = styled.div`
  margin-right: 10px;
  color: #6733e5;
  font-size: 20px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  button {
    cursor: pointer;
    font-size: 25px;
    font-weight: 900;
    border: 3px solid #c593fe;
    padding: 5px 40px;
    width: 100%;
    color: white;
    background-color: #6733e5;
    border-radius: 10px;
    margin-top: 20px;
  }
  button:hover {
    background-color: #c593fe;
    border: 3px solid #6733e5;
  }
  button:active {
    position: relative;
    top: 3px;
  }
`;

const AlertBox = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
`;

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { email, password, confirmPassword } = userData;

  const [errorMessage, setErrorMessage] = useState("");

  const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // 8~24자, 소문자, 대문자, 숫자, 특수문자 1개 이상

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(reset()); // 상태 모두 리셋
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleInputValue = (key) => (e) => {
    setUserData({ ...userData, [key]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const validatedEmail = EMAIL_REGEX.test(email);
    const validatedPassword = PASSWORD_REGEX.test(password);

    if (Object.values(userData).includes("")) {
      setErrorMessage("모든 항목을 입력해 주세요");
      return;
    }
    if (!validatedEmail || !validatedPassword) {
      setErrorMessage("유효한 이메일과 비밀번호를 입력해 주세요");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다");
      return;
    }

    dispatch(signup(userData));
    navigate("/");
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <SignupContainer>
        <SignupWrap>
          <form onSubmit={handleSignup}>
            <Title>
              <h1>회원가입</h1>
            </Title>
            <Text>닉네임</Text>
            <input type="username" placeholder="닉네임" onChange={handleInputValue("username")} />
            <Text>이메일</Text>
            <input type="email" placeholder="이메일" onChange={handleInputValue("email")} />
            <Text>비밀번호</Text>
            <input type="password" placeholder="비밀번호" onChange={handleInputValue("password")} />
            <Text>비밀번호 확인</Text>
            <input
              type="password"
              placeholder="비밀번호 확인"
              onChange={handleInputValue("confirmPassword")}
            />
            <ButtonWrap>
              <button type="submit">회원가입</button>
            </ButtonWrap>
            <AlertBox className="alert-box">{errorMessage}</AlertBox>
          </form>
        </SignupWrap>
      </SignupContainer>
    </>
  );
}

export default Signup;
