import React from "react";
import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton } from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import KakaoShareButton from "../kakao";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  position: absolute;

  h1 {
    font-size: 14px;
    color: #323232;
    margin-bottom: 10px;
    text-align: center;
    span {
      font-size: 12px;
      color: gray;
    }
  }
  box-shadow: 2px 2px 5px gray;
  width: 200px;
  height: 100px;
  top: 40px;
  left: -90px;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1024px) {
    width: 180px;

    left: -80px;
  }

  @media screen and (max-width: 768px) {
    width: 180px;
    left: -90px;
  }
`;
const FlexContainer = styled.div`
  display: flex;
  padding: 0px;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  .button {
    padding: 0px;
    &:hover,
    &:active {
      position: relative;
      top: -2px;
    }
  }
  .btn {
    margin-right: 10px;
  }
`;

const URLShareButton = styled.button`
  width: 29px;
  height: 29px;
  color: white;
  border-radius: 24px;
  border: 0px;
  font-weight: 800;
  font-size: 14px;
  cursor: pointer;
  background-color: #7362ff;
`;

const KakaoButton = styled.div`
  padding: 0px;
  margin: 0px;
`;
function ShareSocialButton(title) {
  const currentUrl = window.location.href;

  return (
    <>
      <Div>
        <h1>
          <span>함께 학습할 친구에게</span>
          <br />
          스터디를 공유하세요!
        </h1>
        <FlexContainer>
          <KakaoButton className="button">
            <KakaoShareButton />
          </KakaoButton>
          <FacebookShareButton url={currentUrl} title={title}>
            <FacebookIcon
              className="button btn"
              size={30}
              round={true}
              borderRadius={24}
            ></FacebookIcon>
          </FacebookShareButton>
          <TwitterShareButton url={currentUrl}>
            <TwitterIcon
              className="button btn"
              size={30}
              round={true}
              title={title}
              borderRadius={24}
            ></TwitterIcon>
          </TwitterShareButton>

          <CopyToClipboard className="button btn" text={currentUrl}>
            <URLShareButton>URL</URLShareButton>
          </CopyToClipboard>
        </FlexContainer>
      </Div>
    </>
  );
}
export default ShareSocialButton;
