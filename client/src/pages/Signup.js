import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, reset } from "../features/user/userSlice.js";
import styled from "styled-components";
import { openModal } from "../features/modal/modalSlice.js";

const SignupContainer = styled.div`
  grid-column: 4/ 12;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 18px;
  font-weight: 600;

  @media screen and (max-width: 1024px) {
    grid-column: 3 / 13;
    transition: 1s;
  }
  @media screen and (max-width: 764px) {
    grid-column: 2 / 14;

    transition: 1s;
  }
`;

const SignupWrap = styled.div`
  display: flex;
  box-shadow: 0px 1px 3px darkgray;
  min-width: 400px;
  width: 600px;
  padding: 20px;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  form {
    display: flex;
    width: 90%;
    flex-direction: column;
  }

  input {
    background-color: rgba(233, 193, 255, 20%);
    border-radius: 5px;
    height: 40px;
    width: 100%;
    font-size: 16px;
    padding: 10px;
    height: 50px;
    margin-bottom: 20px;
    cursor: pointer;
    @media screen and (max-width: 768px) {
      font-size: 14px;
      width: 100%;
    }
    &:hover {
      outline: none;
    }

    &:focus {
      outline: none;
      border-bottom: 1.5px solid #6733e5;
    }
  }
  @media screen and (max-width: 1024px) {
    width: 80%;
    transition: 0.5s;
    box-shadow: none;
  }
`;
const Title = styled.h1`
  display: flex;
  font-family: "Binggrae";
  color: #6733e5;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  font-size: 35px;
  font-weight: 900;
  text-shadow: 1px 1px 1px #c593fe;
`;
const Text = styled.div`
  margin-right: 10px;
  margin-bottom: 5px;
  color: gray;
  font-size: 15px;
`;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;

  margin-bottom: 20px;
  margin-top: 10px;
`;
const ConfirmButton = styled.button`
  display: flex;
  font-family: "Binggrae";
  justify-content: center;
  width: 100%;
  padding: 5px 5px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #5e17eb;
  font-size: 20px;
  transition: 1ms;
  &:hover {
    color: #5e17eb;
    font-weight: 600;
    background-color: rgba(233, 193, 255, 10%);
    position: relative;
    top: -2px;
  }
  &:active {
    position: relative;
    top: 0px;
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

  const { user, isError, isSuccess, message } = useSelector((state) => state.user);

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
      setErrorMessage(
        "알파벳 소문자, 대문자, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 설정해 주세요."
      );
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다");
      return;
    }

    dispatch(signup(userData));
    navigate("/signin");
  };

  const handleSendEmail = () => {
    dispatch(
      openModal({
        name: "EmailVerification",
      })
    );
  };

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
              <ConfirmButton onClick={handleSendEmail} type="submit">
                회원가입
              </ConfirmButton>
            </ButtonWrap>
            <AlertBox className="alert-box">{errorMessage}</AlertBox>
          </form>
        </SignupWrap>
      </SignupContainer>
    </>
  );
}

export default Signup;