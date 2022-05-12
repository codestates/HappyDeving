import React, { useEffect } from "react";
import shareKakao from "../static/images/icon-kakao.png";

function KakaoShareButton() {
  useEffect(() => {
    createKakaoButton();
  }, []);

  const createKakaoButton = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init("a9df31a0b2916ea0fef94e26ec626886");
      }
      kakao.Link.createDefaultButton({
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: "우리동네 스터디, 해피데빙!",
          description: "해피데빙에서 같이 스터디 하자!",
          imageUrl: "https://i.ibb.co/drfYYBp/Study.png", // i.e. process.env.FETCH_URL + '/logo.png'
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: "스터디 참여하기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    }
  };
  return (
    <div className="kakao-share-button" href="#">
      <button id="kakao-link-btn">
        <img src={shareKakao} alt="kakao-share-icon" />
      </button>
    </div>
  );
}
export default KakaoShareButton;
