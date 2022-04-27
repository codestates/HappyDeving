import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signup, reset } from "../../features/auth/authSlice";
import { openSignupModal, openSigninModal } from "../../features/modal/modalSlice";
import LoadingIndicator from "../LoadingIndicator";
import styled from "styled-components";

// const Footer = styled(Content)`
//   grid-column: 3 / 13;
//   height: 120px;
// `;
const ModalBackdrop = styled.div`
  position: fixed;
  display: flex;
  z-index: 1;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  margin: 0 auto;
  border: 10px solid black;
  /* backdrop-filter: blur(4px); */
`;
const CloseButton = styled.div`
  font-size: 15px;
  justify-content: flex-end;
  display: flex;
  width: 100%;
  cursor: pointer;
  /* border: 1px solid red; */
  z-index: 9999;
`;
const Icon = styled.i`
  margin: 10px;
  padding: 10px;
`;

const ModalView = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 360px;
  background-color: white;
  border-radius: 10px;
  height: 432px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  max-width: 1400px;
  align-items: center;
  margin: auto;
`;

const SigninContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  max-width: 1400px;
  margin: 40px auto 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 5px;
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const Text = styled.div`
  margin-right: 10px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
`;
const AlertBox = styled.div`
  display: flex;
  justify-content: center;
`;

function SignupModal() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { username, email, password, confirmPassword } = userData;

  const [errorMessage, setErrorMessage] = useState("");

  const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // 8~24자, 소문자, 대문자, 숫자, 특수문자 1개 이상

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

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
    const signupData = {
      username,
      email,
      password,
    };

    dispatch(signup(signupData));
    dispatch(openSignupModal(false));
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  useEffect(() => {
    dispatch(reset()); // 상태 모두 리셋
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <>
      <ModalBackdrop>
        <ModalView>
          <CloseButton>
            <Icon
              onClick={() => {
                dispatch(openSigninModal(false));
                dispatch(openSignupModal(false));
              }}
              className="fa-solid fa-xmark"
            ></Icon>
          </CloseButton>
          <Container>
            <SigninContainer>
              <form onSubmit={handleSignup}>
                <Title>
                  <h1 className="text-grey-600 underline">Sign In</h1>
                </Title>
                <InputWrap>
                  <Text>닉네임</Text>
                  <input
                    type="username"
                    placeholder="닉네임"
                    onChange={handleInputValue("username")}
                  />
                </InputWrap>
                <InputWrap>
                  <Text>이메일</Text>
                  <input type="email" placeholder="이메일" onChange={handleInputValue("email")} />
                </InputWrap>
                <InputWrap>
                  <Text>비밀번호</Text>
                  <input
                    type="password"
                    placeholder="비밀번호"
                    onChange={handleInputValue("password")}
                  />
                </InputWrap>
                <InputWrap>
                  <Text>비밀번호 확인</Text>
                  <input
                    type="password"
                    placeholder="비밀번호 확인"
                    onChange={handleInputValue("confirmPassword")}
                  />
                </InputWrap>

                <ButtonWrap>
                  <button
                    className="cursor-pointer px-3 py-2 text-sm text-blue-100 bg-purple-500 rounded hover:bg-purple-400"
                    type="submit"
                  >
                    회원가입
                  </button>
                </ButtonWrap>
                <AlertBox className="alert-box">{errorMessage}</AlertBox>
              </form>
            </SigninContainer>
          </Container>
        </ModalView>
      </ModalBackdrop>
    </>
  );
}

export default SignupModal;
