import React from "react";
import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton } from "react-share";
import KakaoShareButton from "../kakao";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import styled from "styled-components";
function ShareSocialButton(title) {
  const currentUrl = window.location.href;
  // 제목과 버튼을 감싸는 컨테이너
  const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  // 버튼을 배치시키는 컨테이너
  const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 48px);
    grid-column-gap: 8px;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  `;

  const KakaoButton = styled.div`
    margin-top: 8px;
  `;

  return (
    <>
      <FlexContainer>
        <GridContainer>
          <FacebookShareButton url={currentUrl} title={title}>
            <FacebookIcon size={41} round={true} borderRadius={24}></FacebookIcon>
          </FacebookShareButton>
          <TwitterShareButton url={currentUrl}>
            <TwitterIcon size={41} round={true} title={title} borderRadius={24}></TwitterIcon>
          </TwitterShareButton>
          <KakaoButton>
            <KakaoShareButton />
          </KakaoButton>
        </GridContainer>
      </FlexContainer>
    </>
  );
}
export default ShareSocialButton;
