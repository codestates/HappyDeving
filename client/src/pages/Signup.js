import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, reset } from "../features/user/userSlice.js";
import LoadingIndicator from "../components/LoadingIndicator";
import styled from "styled-components";
// import Container from "../components/styles/Container.styled";

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
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // 8~24???, ?????????, ?????????, ??????, ???????????? 1??? ??????

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(reset()); // ?????? ?????? ??????
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleInputValue = (key) => (e) => {
    setUserData({ ...userData, [key]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const validatedEmail = EMAIL_REGEX.test(email);
    const validatedPassword = PASSWORD_REGEX.test(password);

    if (Object.values(userData).includes("")) {
      setErrorMessage("?????? ????????? ????????? ?????????");
      return;
    }
    if (!validatedEmail || !validatedPassword) {
      setErrorMessage(
        "????????? ?????????, ?????????, ??????, ??????????????? ????????? 8??? ????????? ??????????????? ????????? ?????????."
      );
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("??????????????? ???????????? ????????????");
      return;
    }

    dispatch(signup(userData));
    navigate("/signin");
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
              <h1>????????????</h1>
            </Title>
            <Text>?????????</Text>
            <input type="username" placeholder="?????????" onChange={handleInputValue("username")} />
            <Text>?????????</Text>
            <input type="email" placeholder="?????????" onChange={handleInputValue("email")} />
            <Text>????????????</Text>
            <input type="password" placeholder="????????????" onChange={handleInputValue("password")} />
            <Text>???????????? ??????</Text>
            <input
              type="password"
              placeholder="???????????? ??????"
              onChange={handleInputValue("confirmPassword")}
            />
            <ButtonWrap>
              <ConfirmButton type="submit">????????????</ConfirmButton>
            </ButtonWrap>
            <AlertBox className="alert-box">{errorMessage}</AlertBox>
          </form>
        </SignupWrap>
      </SignupContainer>
    </>
  );
}

export default Signup;
