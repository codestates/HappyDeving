import styled from "styled-components";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "../styles/Search.styled";
import { IoIosArrowBack } from "react-icons/io";
import LocationModal from "./Modals/LocationModal";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { getStudiesMapApi } from "../../api/study";
import { setStudiesData } from "../../features/studies/studiesSlice";
import { resetData } from "../../features/Search/searchDataSlice";
import { BsFillCalendarDateFill, BsFileEarmarkCodeFill } from "react-icons/bs";
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
  write: "https://cdn.discordapp.com/attachments/965506579564732419/968872695011885076/7.png",
  login: "https://cdn.discordapp.com/attachments/965506579564732419/968872695255142420/8.png",
  mypage: "https://cdn.discordapp.com/attachments/965506579564732419/969043355067617321/9.png",
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

    .profile {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .link {
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
`;

const Date = styled.div`
  .date {
    position: absolute;
    top: 55px;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translateX(-35%);
  }
`;

const Language = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;

  .language {
    position: absolute;
    top: 75px;
    width: 60%;
    left: 20%;
  }
`;

const Info = styled.div`
  position: absolute;
  width: 60%;
  left: 20%;
  height: 90px;
  background-color: white;
  bottom: 100px;
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.contents.boxShadow};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  div {
    font-family: "Medium";
    font-size: 16px;
    margin: 0 auto;
    display: inline-flex;
    width: 40%;
  }

  .marker {
    margin-top: 5px;
    margin-right: 10px;
  }
`;

const InfoFinal = styled(Info)`
  top: 40%;
  transform: translateY(-50%);
  height: 30%;
`;

const Icon = styled.div`
  position: absolute;
  top: 75px;
  left: 20px;
  cursor: pointer;
`;

const Header = ({ drop }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { location, date, language } = useSelector((store) => store.search);
  const { locationData, dateData, languageData } = useSelector((store) => store.searchData);
  const { calenderDateValue } = useSelector((store) => store.calender);

  const [click, setClick] = useState(false);
  console.log(drop);

  const goToHome = () => {
    navigate("/");
  };

  console.log(drop);
  const guType = locationData.split(" ")[0];
  const dongType = locationData.split(" ")[1];

  return (
    <>
      <StyledHeader drop={drop}>
        <img onClick={goToHome} className="logo" src={icons.logo} />
        <StyleSearch drop={drop} onClick={() => setClick(true)}>
          <Search className="search" />
        </StyleSearch>
        <div className="links">
          {user ? (
            <Link to="/profile">
              <img src={user.image} className="profile" />
            </Link>
          ) : (
            <Link to="/signin">
              <span className="link">로그인</span>
            </Link>
          )}
        </div>
      </StyledHeader>
      <Modal click={click}>
        {location ? (
          <Location>
            <Icon onClick={() => setClick(false)}>
              <IoIosArrowBack />
            </Icon>
            <LocationModal />
          </Location>
        ) : null}

        {date ? (
          <Date>
            <Icon onClick={() => dispatch(locationModal())}>
              <IoIosArrowBack />
            </Icon>
            <div className="date">
              <CalenderDate />
            </div>
            <Info>
              <div className="locationData">
                <FaMapMarkerAlt className="marker" />
                {locationData}
              </div>
            </Info>
          </Date>
        ) : null}
        {language ? (
          <Language>
            <Icon onClick={() => dispatch(dateModal())}>
              <IoIosArrowBack />
            </Icon>
            <div className="language">
              <LanguageModal />
            </div>

            <Info>
              <div>
                <FaMapMarkerAlt className="marker" />
                {locationData}
              </div>
              <div>
                <BsFillCalendarDateFill className="marker" />
                {calenderDateValue}
              </div>
            </Info>
          </Language>
        ) : null}
        {languageData ? (
          <>
            <Icon onClick={() => dispatch(languageModal())}>
              <IoIosArrowBack />
            </Icon>
            <InfoFinal>
              <div>
                <FaMapMarkerAlt className="marker" />
                {locationData}
              </div>
              <div>
                <BsFillCalendarDateFill className="marker" />
                {calenderDateValue}
              </div>
              <div>
                <BsFileEarmarkCodeFill className="marker" />
                {languageData}
              </div>
            </InfoFinal>
            <Info
              onClick={() => {
                setClick(false);
                getStudiesMapApi({
                  guType,
                  dongType,
                  languageData,
                  dateData,
                }).then((res) => {
                  console.log(res.data);
                  dispatch(setStudiesData(res.data));
                });
                //res.data.studies를 markerdata로,  map api : 해당 동으로 center 지정,
                navigate("/map");
                dispatch(resetData());
                dispatch(reset());
              }}
            >
              <div>
                검색
                <FaSearch className="marker" />
              </div>
            </Info>
          </>
        ) : null}
      </Modal>
    </>
  );
};

export default Header;
