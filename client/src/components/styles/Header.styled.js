import styled from "styled-components";
import React from "react";
import { useDispatch } from "react-redux";
import { openSigninModal } from "../../features/modal/modalSlice";
// import "../../static/fonts/font.css";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-column: 3/13;
  position: relative;
  font-family: "hanna";

  > .logo {
    width: 200px;
    margin-left: 0px;
  }
  > div {
    color: #5e17eb;
    text-align: center;
    font-size: 25px;
    font-family: "hanna";

    .write {
      margin-right: 20px;
    }
    .login {
      margin-right: 20px;
    }
  }
`;

const Circle = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 0 0 100% 100%;
  background-color: rgb(255, 255, 0);
  margin-top: -150px;
  margin-bottom: 20px;
  grid-column: 1/15;
`;

const Header = () => {
  const dispatch = useDispatch();
  return (
    <>
      <StyledHeader>
        <img
          className="logo"
          src="https://cdn.discordapp.com/attachments/965506579564732419/967356348390076427/happylogo2.png"
        />
        <div>
          <span onClick={() => console.log("새글쓰기")} className="write">
            새 글 쓰기
          </span>
          <span onClick={() => dispatch(openSigninModal(true))} className="login">
            로그인
          </span>
        </div>
      </StyledHeader>
      <Circle />
    </>
  );
};

export default Header;
{
  /* <header>
<div style={{ display: "flex", justifyContent: "space-between" }}>
  <img
    src="https://cdn.discordapp.com/attachments/965506579564732419/967356348390076427/happylogo2.png"
    style={{ width: "200px", marginLeft: "0px", display: "inline-block" }}
  />
  <div>
    <span style={{ marginRight: "10px" }}>새 글 쓰기</span>
    <span>로그인</span>
  </div>
</div>
</header> */
}
