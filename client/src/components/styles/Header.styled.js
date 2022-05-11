import styled from "styled-components";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "../styles/Search.styled";
import { IoIosArrowBack } from "react-icons/io";
import LocationModal from "./Modals/LocationModal";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  languageModal,
  locationModal,
  dateModal,
  reset,
} from "../../features/Search/searchModalSlice";
import CalenderDate from "../Calendar.js";
import LanguageModal from "./Modals/LanguageModal";

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
  left: 0;
  right: 0;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 10px 3px 10px rgba(0, 0, 0, 0.1);
  grid-row: 1/3;
  height: 80px;
  padding: 10px 0px 0px 15px;
  font-family: "Bold";
  display: flex;
  height: 100px;
  justify-content: space-between;
  align-items: center;
  z-index: 10;

  @media only screen and (max-width: 768px) {
    grid-column: 2/ 14;
  }

  > .logo {
    line-height: 100%;
    align-items: center;
    margin-bottom: 10px;
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

const Modal = styled.div`
  @media screen and (max-width: 768px) {
    display: ${(props) => (props.click ? "block" : "none")};
  }
  display: none;
  width: 100%;
  height: 100vh;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
`;

const Location = styled.div`
  margin-top: 60px;
  display: flex;
  margin-top: 60px;
  display: flex;
  .icon {
    position: absolute;
    top: 75px;
    left: 10px;
    cursor: pointer;
  }
`;

const Date = styled.div`
  .icon {
    position: absolute;
    top: 75px;
    left: 10px;
    cursor: pointer;
  }
  width: 100%;
  height: 100%;

  @media screen and (min-width: 500px) {
    margin: 12% 15%;
  }

  margin: 12% 20%;

  @media screen and (min-width: 505px) {
    margin: 12% 25%;
  }
`;

const Language = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: red;
  .language {
    width: 50%;
    margin: 0 auto;
  }
`;

const Info = styled.div`
  width: 60vw;
  height: 90px;
  background-color: white;
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.contents.boxShadow};
  display: flex;
  align-items: center;
  span {
    font-family: "Medium";
    font-size: 16px;
    margin: 0 auto;
    display: inline-flex;
  }
  .marker {
    margin-top: 5px;
    margin-right: 5px;
  }
`;

const Header = ({ drop }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { location, date, language } = useSelector((store) => store.search);
  const { locationData, dateData, languageData } = useSelector(
    (store) => store.searchData
  );

  const [click, setClick] = useState(false);
  console.log(drop);

  const goToHome = () => {
    navigate("/");
  };

  console.log(drop);

  return (
    <>
      <StyledHeader drop={drop}>
        <img onClick={goToHome} className="logo" src={icons.logo} />
        <StyleSearch drop={drop} onClick={() => setClick(true)}>
          <Search className="search" />
        </StyleSearch>
        <div className="links">
          <Link to="/write">
            <span className="link">write</span>
          </Link>
          {user ? (
            <Link to="/profile">
              <span className="link"> mypage</span>
            </Link>
          ) : (
            <Link to="/signin">
              <span className="link">signin</span>
            </Link>
          )}
        </div>
      </StyledHeader>
      <Modal click={click}>
        {location ? (
          <Location>
            <div className="icon" onClick={() => setClick(false)}>
              <IoIosArrowBack />
            </div>
            <LocationModal />
          </Location>
        ) : null}

        {date ? (
          <Date>
            <div className="icon" onClick={() => dispatch(locationModal())}>
              <IoIosArrowBack />
            </div>
            <CalenderDate />
            <Info>
              <span>
                <FaMapMarkerAlt className="marker" />
                {locationData}
              </span>
            </Info>
          </Date>
        ) : null}
        {language ? (
          <Language>
            <div className="language">
              <LanguageModal />
            </div>
          </Language>
        ) : null}
      </Modal>
    </>
  );
};

export default Header;
