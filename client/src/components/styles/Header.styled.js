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

const StyledHeader = styled.header`
  grid-column: 3/13;
  grid-row: 2/3;
  font-family: "Bold";
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: ${(props) => (props.drop ? "fixed" : "relative")};
  margin: ${(props) => (props.drop ? "0 15%" : "0 auto")};
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

  > .search {
    @media only screen and (max-width: 768px) {
      display: block;
      grid-column: 3/14;
      margin: 0px 10px;
    }
    display: ${(props) => (props.drop ? "block" : "none")};
  }

  > .links {
    color: #5e17eb;
    text-align: center;
    font-size: 25px;
    display: flex;
    align-items: center;

    span {
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

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const [drop, setDrop] = useState(false);
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  window.onscroll = function () {
    let windowTop = window.scrollY;
    if (windowTop >= 20) {
      setDrop(true);
    } else {
      setDrop(false);
    }
  };

  return (
    <StyledHeader drop={drop}>
      <img onClick={goToHome} className="logo" src={icons.logo} />
      <div className="search">
        <Search />
      </div>
      <div className="links">
        <Link to="/write">
          <span>write</span>
          {/* <img className="write" src={icons.write} /> */}
        </Link>
        {user ? (
          <Link to="/profile">
            <span> mypage</span>
            {/* <img className="mypage" src={icons.mypage} /> */}
          </Link>
        ) : (
          <Link to="/signin">
            <span>signin</span>
            {/* <img className="login" src={icons.login} /> */}
          </Link>
        )}
      </div>
    </StyledHeader>
  );
};

export default Header;
