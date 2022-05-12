import React from "react";
import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton } from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import KakaoShareButton from "../kakao";
import styled from "styled-components";

{
  /* <i class="fa-brands fa-facebook"></i> */
  // <i class="fa-brands fa-twitter-square"></i>
  // <i class="fa-brands fa-facebook"></i>
}
const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
  width: 210px;
  position: absolute;
  top: 50px;
  left: -10px;
  background-color: white;
  box-shadow: 2px 2px 5px gray;
  border-radius: 5px;
  .button {
    &:hover,
    &:active {
      position: relative;
      top: -2px;
    }
  }
`;

// 버튼을 배치시키는 컨테이너
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1%;
  justify-content: center;
  align-items: center;
`;
const URLShareButton = styled.button`
  width: 40px;
  height: 40px;
  color: white;
  border-radius: 24px;
  border: 0px;
  font-weight: 800;
  font-size: 14px;
  cursor: pointer;
  background-color: #7362ff;
`;

const KakaoButton = styled.div`
  margin-top: 12px;
`;
function ShareSocialButton(title) {
  const currentUrl = window.location.href;
  // 제목과 버튼을 감싸는 컨테이너

  return (
    <>
      <FlexContainer>
        <GridContainer>
          <KakaoButton className="button">
            <KakaoShareButton />
          </KakaoButton>
          <FacebookShareButton url={currentUrl} title={title}>
            <FacebookIcon
              className="button"
              size={41}
              round={true}
              borderRadius={24}
            ></FacebookIcon>
          </FacebookShareButton>
          <TwitterShareButton url={currentUrl}>
            <TwitterIcon
              className="button"
              size={41}
              round={true}
              title={title}
              borderRadius={24}
            ></TwitterIcon>
          </TwitterShareButton>

          <CopyToClipboard className="button" text={currentUrl}>
            <URLShareButton>URL</URLShareButton>
          </CopyToClipboard>
        </GridContainer>
      </FlexContainer>
    </>
  );
}
export default ShareSocialButton;
