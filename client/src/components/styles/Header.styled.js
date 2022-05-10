import styled from "styled-components";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "../styles/Search.styled";

const icons = {
  logo: "https://cdn.discordapp.com/attachments/965506579564732419/967356348390076427/happylogo2.png",
  write:
    "https://cdn.discordapp.com/attachments/965506579564732419/968872695011885076/7.png",
  login:
    "https://cdn.discordapp.com/attachments/965506579564732419/968872695255142420/8.png",
  mypage:
    "https://cdn.discordapp.com/attachments/965506579564732419/969043355067617321/9.png",
};

const StyleSearch = styled.div`
  display: ${(props) => (props.drop ? "block" : "none")};

  @media only screen and (max-width: 768px) {
    display: block;
    grid-column: 3/14;
    margin: 0px 10px;
  }
`;

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  /* width: 100% */
  left: 0;
  right: 0;
  width: 100%;
  background-color: black;
  grid-row: 1/3;
  height: 80px;
  padding: 10px 0px 0px 15px;
  font-family: "Bold";
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;

  @media only screen and (max-width: 768px) {
    grid-column: 2/ 14;
  }

  > .logo {
    @media screen and (min-width: 1024px) {
      width: 200px;
    }
    @media screen and (max-width: 768px) {
      grid-column: 1/2;
      margin-left: -15px;
    }
    width: 20vw;

    &:hover {
      cursor: pointer;
    }
  }

  > .links {
    color: #5e17eb;
    text-align: center;
    font-size: 25px;
    display: flex;
    align-items: center;

    .link {
      display: ${(props) => (props.drop ? "none" : "block")};

      @media screen and (min-width: 1024px) {
        font-size: 22px;
      }

      @media screen and (max-width: 768px) {
        display: none;
      }
      margin-right: 20px;
      font-size: 16px;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const Header = ({ drop }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log(drop);

  const goToHome = () => {
    navigate("/");
  };

  console.log(drop);

  return (
    <StyledHeader drop={drop}>
      <img onClick={goToHome} className="logo" src={icons.logo} />
      <StyleSearch drop={drop}>
        <Search />
      </StyleSearch>
      <div className="links">
        <Link to="/write">
          <span className="link">write</span>
          {/* <img className="write" src={icons.write} /> */}
        </Link>
        {user ? (
          <Link to="/profile">
            <span className="link"> mypage</span>
            {/* <img className="mypage" src={icons.mypage} /> */}
          </Link>
        ) : (
          <Link to="/signin">
            <span className="link">signin</span>
            {/* <img className="login" src={icons.login} /> */}
          </Link>
        )}
      </div>
    </StyledHeader>
  );
};

export default Header;
