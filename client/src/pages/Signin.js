import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin } from "../features/user/userSlice";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoadingIndicator from "../components/LoadingIndicator";
import Container from "../components/styles/Container.styled";
import Content from "../components/styles/Content.styled";
import axios from "axios";
import { GoogleLoginApi } from "../api/socialAuth";
import GoogleLogin from "react-google-login";
import { GOOGLE_CLIENT_ID } from "../config";


const Background = styled(Container)`
  grid-column: 1/ 15;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  font-size: 18px;
  font-weight: 500;
`;

const SigninWrap = styled(Content)`
  display: flex;
  min-width: 400px;
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
const Resister = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    font-weight: 700;
    color: #6733e5;
  }
`;

function Signin() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.user);

  useEffect(() => {
    // dispatch(reset()); // 상태(로딩or성공or실패) 모두 리셋
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleInputValue = (key) => (e) => {
    setUserData({ ...userData, [key]: e.target.value });
  };

  const getAccessToken = async (authorizationCode) => {
    let resp = await axios.post("https://server.happydeving.com/users/login/kakao", {
      authorizationCode: authorizationCode,
    });


  //   console.log("resp===========", resp);
  // };

  const socialLoginHandler = async () => {
    const kakaoURI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=5928412b923165af1772a78c664c4582&redirect_uri=http://localhost:3000`;
    window.location.assign(kakaoURI);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    if (Object.values(userData).includes("")) {
      setErrorMessage("모든 항목을 입력해 주세요.");
      return;
    }
    dispatch(signin(userData));
    navigate("/");
  };

  const handleGoogleLoginFailure = (result) => {
    console.log(`${JSON.stringify(result)}`);
  };

  const handleGoogleLogin = async (googleData) => {
    // body: {token: googleData.tokenId}
    console.log("googleData", googleData);
    await GoogleLoginApi(googleData.tokenId).then((res) => {
      console.log("google res: ", res);
      localStorage.setItem("user", JSON.stringify(res.data.userInfo));
      localStorage.setItem("token", JSON.stringify(res.data.accessToken));
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + res.data.accessToken,
      };
      navigate("/");
      window.location.reload();
    });
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Background>
        <SigninWrap>
          <form onSubmit={handleSignin}>
            <Title>
              <h1 className="text-grey-600">로그인</h1>
            </Title>
            <Text>이메일</Text>
            <input
              type="email"
              placeholder="이메일을 입력해주세요"
              onChange={handleInputValue("email")}
            />
            <Text>비밀번호</Text>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={handleInputValue("password")}
            />
            <Resister>
              <p>아직 아이디가 없으신가요? </p>
              <Link to="/signup">
                <span>회원가입하기</span>
              </Link>
            </Resister>
            <ButtonWrap>
              <button type="submit">로그인</button>
            </ButtonWrap>
            <ButtonWrap>
              <button type="button" onClick={socialLoginHandler}>
                카카오
              </button>
              <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Google"
                onSuccess={handleGoogleLogin}
                onFailure={handleGoogleLoginFailure}
                cookiePolicy={"single_host_origin"}
              ></GoogleLogin>
              {/* <a type="button" href="http://localhost:4000/users/login/kakao">
                카카오
              </a> */}
            </ButtonWrap>
            <AlertBox className="alert-box">{errorMessage}</AlertBox>
          </form>
        </SigninWrap>
      </Background>
    </>
  );
}

export default Signin;
