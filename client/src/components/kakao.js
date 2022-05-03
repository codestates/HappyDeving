import React, { useEffect } from "react";
import shareKakao from "../static/images/shareKakao.png";
// import icon-kakao
function KakaoShareButton() {
  useEffect(() => {
    createKakaoButton();
  }, []);

  const createKakaoButton = () => {
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    if (window.Kakao) {
      const kakao = window.Kakao;
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // javascript key
        kakao.init("a9df31a0b2916ea0fef94e26ec626886");
      }
      kakao.Link.createDefaultButton({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: "스터디 제목 변수 값",
          description: "내용 변수 값",
          imageUrl:
            "'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png', ", // i.e. process.env.FETCH_URL + '/logo.png'
          link: {
            // window 객체에서 현재 url 가져오기
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: "자세히 보기",
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
