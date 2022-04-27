import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, reset } from "../../features/auth/authSlice";
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
const Resister = styled.p`
  font-style: italic;
`;

function SigninModal() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userData;

  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    // if (isSuccess || user) {
    //   navigate("/"); 모달창이니까 안 해도 될 것 같다.
    // }
    dispatch(reset()); // 상태(로딩or성공or실패) 모두 리셋
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleInputValue = (key) => (e) => {
    setUserData({ ...userData, [key]: e.target.value });
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    if (Object.values(userData).includes("")) {
      setErrorMessage("모든 항목을 입력해 주세요.");
      return;
    }
    const signinData = {
      email,
      password,
    };
    dispatch(signin(signinData));
    dispatch(openSigninModal(false));
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <ModalBackdrop>
        <ModalView>
          <CloseButton>
            <Icon
              onClick={() => dispatch(openSigninModal(false))}
              className="fa-solid fa-xmark"
            ></Icon>
          </CloseButton>
          <Container>
            <SigninContainer>
              <form onSubmit={handleSignin}>
                <Title>
                  <h1 className="text-grey-600 underline">Sign In</h1>
                </Title>
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

                <InputWrap className="underline">
                  <Resister onClick={() => dispatch(openSignupModal(true))}>
                    아직 아이디가 없으신가요?
                  </Resister>
                </InputWrap>
                <ButtonWrap>
                  <button
                    className="cursor-pointer px-3 py-2 text-sm text-blue-100 bg-purple-500 rounded hover:bg-purple-400"
                    type="submit"
                  >
                    로그인
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

export default SigninModal;
