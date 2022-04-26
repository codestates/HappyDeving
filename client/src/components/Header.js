import React from "react";

const Header = () => {
  return (
    <header>
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
      <div id="circle"></div>
    </header>
  );
};

export default Header;
