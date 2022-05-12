import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin } from "../features/user/userSlice";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoadingIndicator from "../components/LoadingIndicator";
// import Container from "../components/styles/Container.styled";
// import Content from "../components/styles/Content.styled";
import axios from "axios";
import { GoogleLoginApi } from "../api/socialAuth";
import { GoogleLogin } from "react-google-login";
import {
  GOOGLE_CLIENT_ID,
  KAKAO_CLIENT_ID,
  GITHUB_CLIENT_ID,
  NAVER_CLIENT_ID,
  NAVER_STATE,
  github_redirect_url,
  kakaoNaver_redirect_url,
  Kakao_url,
  Github_url,
  Naver_url,
} from "../config";
//
// import google from "../static/images/google.png";
import github from "../static/images/github.png";
import naver from "../static/images/naver.png";
import kakao from "../static/images/kakao.png";

const Background = styled.div`
  grid-column: 4/ 12;
  /* grid-row: 6/12; */
  /* min-height: 80%; */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 20% auto;
  font-size: 18px;
  font-weight: 500;
`;

const SigninWrap = styled.div`
  display: flex;
  min-width: 400px;
  height: 100%;
  padding: 20px;
  /* grid-column: 4/12; */
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
    margin-bottom: 40px;
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
  margin-bottom: 40px;
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
    top: 2px;
  }
`;
const SocialLoginButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  /* border-radius: 10px; */
  /* width: 80px; */
  /* box-shadow: 3px 3px 10px gray; */
  cursor: pointer;
  div {
    margin: 10px;
    box-shadow: 3px 3px 10px gray;
    border-radius: 10px;
    overflow: hidden;
    &:active {
      position: relative;
      top: 2px;
    }
  }
`;
const KakaoButton = styled.div`
  width: 80px;
  background-color: yellow;
`;
const GitButton = styled.div`
  background-color: black;
  width: 80px;
`;
const GoogleButton = styled.div`
  border-radius: 10px;
  background-color: white;
  width: 80px;
`;
const NaverButton = styled.div`
  background-color: green;
  border-radius: 10px;
  width: 80px;
`;
const AlertBox = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
`;
const Resister = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #c593fe;
  padding-bottom: 20px;
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
  // const [gitOrKakao, setSocial] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    // dispatch(reset()); // 상태(로딩or성공or실패) 모두 리셋
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  useEffect(() => {
    const whichone = localStorage.getItem("login");
    if (whichone === "kakao") {
      const url = new URL(window.location.href);
      const authorizationCode = url.searchParams.get("code");
      if (authorizationCode) {
        getKakaoAccessToken(authorizationCode);
      }
    }
    if (whichone === "naver") {
      const url = new URL(window.location.href);
      const authorizationCode = url.searchParams.get("code");
      if (authorizationCode) {
        getNaverAccessToken(authorizationCode);
      }
    }
    if (whichone === "github") {
      const url = new URL(window.location.href);
      const authorizationCode = url.searchParams.get("code");
      if (authorizationCode) {
        getGithubAccessToken(authorizationCode);
      }
    }
  }, []);

  const handleInputValue = (key) => (e) => {
    setUserData({ ...userData, [key]: e.target.value });
  };

  const getNaverAccessToken = async (authorizationCode) => {
    let resp = await axios.post(Naver_url, {
      authorizationCode: authorizationCode,
    });

    const { user } = resp.data;
    const { accessToken } = resp.data;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(accessToken));
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
    navigate("/");
    window.location.reload();
  };

  const getKakaoAccessToken = async (authorizationCode) => {
    let resp = await axios.post(Kakao_url, {
      authorizationCode: authorizationCode,
    });
    const { user } = resp.data;
    const { accessToken } = resp.data;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(accessToken));
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
    navigate("/");
    window.location.reload();
  };

  const getGithubAccessToken = async (authorizationCode) => {
    let resp = await axios.post(Github_url, {
      authorizationCode: authorizationCode,
    });
    const { user } = resp.data;
    const { accessToken } = resp.data;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(accessToken));
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
    navigate("/");
    window.location.reload();
  };

  const socialLoginHandler = async (social) => {
    if (social === "kakao") {
      localStorage.setItem("login", "kakao");
      const redirect_url = kakaoNaver_redirect_url;
      const kakaoURI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${redirect_url}`;
      window.location.assign(kakaoURI);
    }
    if (social === "github") {
      localStorage.setItem("login", "github");
      const redirect_url = github_redirect_url;
      const GITHUB_LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_url=${redirect_url}`;
      window.location.assign(GITHUB_LOGIN_URL);
    }
    if (social === "naver") {
      localStorage.setItem("login", "naver");
      const redirect_url = kakaoNaver_redirect_url;
      const naverURI = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${redirect_url}&state=${NAVER_STATE}`;
      window.location.assign(naverURI);
    }
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
            <SocialLoginButton>
              <KakaoButton
                type="button"
                onClick={() => socialLoginHandler("kakao")}
              >
                <img src={kakao} alt="kakao" />
              </KakaoButton>
              <GoogleButton>
                <GoogleLogin
                  style={{ width: "100px" }}
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      G
                    </button>
                  )}
                  buttonText=""
                  clientId={GOOGLE_CLIENT_ID}
                  onSuccess={handleGoogleLogin}
                  onFailure={handleGoogleLoginFailure}
                  cookiePolicy={"single_host_origin"}
                >
                  {/* <img src={google} alt="google" /> */}
                </GoogleLogin>
              </GoogleButton>
              <NaverButton>
                <img
                  src={naver}
                  alt="naver"
                  onClick={() => socialLoginHandler("naver")}
                />
              </NaverButton>
              <GitButton>
                <img
                  src={github}
                  alt="github"
                  onClick={() => socialLoginHandler("github")}
                />
              </GitButton>
            </SocialLoginButton>
            <AlertBox className="alert-box">{errorMessage}</AlertBox>
          </form>
        </SigninWrap>
      </Background>
    </>
  );
}

export default Signin;
