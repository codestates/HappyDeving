import React from "react";
import "./Counter.css";

const Counter = () => {
  return (
    <div className="background">
      {/* screens: {
        mobile : 520px
      md: "768px",
        tablet 
      lg: "1024px",
        desktop
      */}

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

      {/* <button id="button" style={{ marginTop: "-50px", marginRight: "0px" }}>
    
      </button>
      <button id="button" style={{ marginTop: "-50px", marginRight: "0px" }}>
        Button
      </button> */}

      <input type="checkbox" />
      <div id="circle"></div>

      <div id="content">
        <div id="grid">
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>

        <main></main>

        <section></section>
        {/* <aside>Aside</aside>
        <nav>Nav</nav> */}
        <footer>Footer</footer>
      </div>
    </div>
  );
};

export default Counter;
