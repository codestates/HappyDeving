import styled from "styled-components";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconContext } from "react-icons";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "../styles/Search.styled";
import { IoIosArrowBack } from "react-icons/io";
import LocationModal from "./Modals/LocationModal";
import CalenderDate from "../Calendar.js";
import LanguageModal from "./Modals/LanguageModal";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { getStudiesMapApi } from "../../api/study";
import { setStudiesData } from "../../features/studies/studiesSlice";
import { resetData } from "../../features/Search/searchDataSlice";
import { BsFillCalendarDateFill, BsFileEarmarkCodeFill } from "react-icons/bs";
import {
  locationModal,
  dateModal,
  languageModal,
  reset,
} from "../../features/Search/searchModalSlice";
import HeaderLanguageModal from "./Modals/HeaderLanguageModal";
import HeaderDateModal from "./Modals/HeaderDateModal";
import HeaderLocationModal from "./Modals/HeaderLocationModal";

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
  position: fixed;
  background-color: white;
  box-shadow: 10px 3px 10px rgba(0, 0, 0, 0.1);
  font-family: "Bold";
  display: grid;
  grid-template-columns: repeat(14, 1fr);
  z-index: 10;
  height: 100px;
  width: 100%;
  line-height: 100px;

  @media only screen and (max-width: 768px) {
    grid-column: 2/ 14;
    height: 100px;
  }

  @media screen and (min-width: 768px) {
    height: ${(props) => (props.header ? "200px" : "100px")};
  }
`;

const Logo = styled.div`
  grid-column: 2/ 4;
  width: 100%;
  position: ${(props) => (props.header ? "absolute" : "relative")};
  top: ${(props) => (props.header ? "20px" : "0px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  img {
    @media screen and (min-width: 900px) {
      width: 150px;
    }

    @media screen and (max-width: 900px) {
      min-width: 100px;
    }
  }
`;

const Links = styled.div`
  grid-column: 13/14;
  position: absolute;
  position: absolute;
  top: 30px;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;

  .profile {
    border-radius: 50%;
    min-width: 40px;
    height: 40px;
  }

  .signin {
    min-width: 40px;
    height: 40px;
    line-height: 40px;
    color: #5e17eb;
    @media screen and (max-width: 630px) {
      font-size: 13px;
    }

    &:hover {
      color: #c593fe;
      cursor: pointer;
      position: relative;
      top: 2px;
    }
  }
`;

const SearchDiv = styled.div`
  grid-column: ${(props) => (props.header ? "4/13" : "5/12")};
  padding-top: ${(props) => (props.header ? "120px" : "25px")};
`;

export const StyledSearch = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-family: "Medium";
  color: gray;
  border-radius: 30px;
  display: flex;
  height: 50px;
  line-height: 50px;
  .searchbar {
    flex: 15;
    text-align: center;
  }
  &:hover {
    color: rgb(94, 23, 235);
    cursor: pointer;
  }
`;

const SearchIcon = styled.div`
  position: relative;
  flex: 1;

  .icon {
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 20px;
    width: 20px;
    line-height: 20px;
  }
  height: 40px;
  min-width: 40px;
  max-width: 40px;
  border-radius: 50%;
  margin: 4px 5px 0px 0px;
  background-color: ${(props) => props.theme.colors.purple};
  &:hover {
    background-color: ${(props) => props.theme.colors.lavender};
    opacity: 0.7;
    cursor: pointer;
    top: 2px;
  }
  &:active {
    box-shadow: ${(props) => props.theme.contents.boxShadow};
    top: 2px;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DesktopModal = styled.div`
  height: 50%;
  width: 50%;
  transform: translateY(90px);
  border-radius: 10px;
  background-color: white;
  overflow: scroll;

  @media screen and (min-width: 1024px) {
    width: 500px;
  }
`;

const Modal = styled.div`
  @media screen and (max-width: 768px) {
    display: ${(props) => (props.header ? "block" : "none")};
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
  width: 100%;
  height: 100%;
  .date {
    position: absolute;
    top: 55px;
    padding: 0 10%;
    left: 50%;
    transform: translateX(-50%);
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

const LocationWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
`;
const DateWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10% 15%;
`;
const LanguageWrapper = styled.div`
  width: 100%;
  height: 100%;
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

  .searchIcon {
    font-family: "Medium";
    font-size: 16px;
    margin: 0 auto;
    display: flex;
    width: 30%;
    .marker {
      margin-left: 30px;
    }
  }
`;

const InfoFinal = styled(Info)`
  top: 40%;
  transform: translateY(-50%);
  height: 30%;
`;

const Icon = styled.div`
  position: absolute;
  top: 80px;
  left: 20px;
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { location, date, language } = useSelector((store) => store.search);
  const { locationData, dateData, languageData } = useSelector(
    (store) => store.searchData
  );
  const { calenderDateValue } = useSelector((store) => store.calender);

  const [header, setHeader] = useState(false);

  console.log(header);

  const goToHome = () => {
    navigate("/");
  };

  const guType = locationData.split(" ")[0];
  const dongType = locationData.split(" ")[1];

  return (
    <>
      {header ? (
        <Backdrop onClick={() => setHeader(false)}>
          <DesktopModal onClick={(e) => e.stopPropagation()}>
            {location ? (
              <LocationWrapper>
                <HeaderLocationModal />
              </LocationWrapper>
            ) : null}
            {date ? (
              <DateWrapper>
                <CalenderDate />
              </DateWrapper>
            ) : null}
            {language ? (
              <LanguageWrapper onClick={() => setHeader(false)}>
                <HeaderLanguageModal />
              </LanguageWrapper>
            ) : null}
          </DesktopModal>
        </Backdrop>
      ) : null}
      <StyledHeader header={header}>
        <Logo onClick={goToHome} header={header}>
          <img src={icons.logo} />
        </Logo>
        <SearchDiv header={header}>
          {header ? (
            // 헤더 모달창은 Search 안에 있다
            <Search setHeader={setHeader} />
          ) : (
            <StyledSearch
              onClick={() => {
                setHeader(true);
                dispatch(locationModal());
              }}
            >
              <div className="searchbar" onClick={() => setHeader(true)}>
                검색 시작하기
              </div>
              <SearchIcon>
                <IconContext.Provider value={{ className: "icon" }}>
                  <FaSearch />
                </IconContext.Provider>
              </SearchIcon>
            </StyledSearch>
          )}
        </SearchDiv>
        <Links>
          {user ? (
            <Link to="/profile">
              <img src={user.image} className="profile" />
            </Link>
          ) : (
            <Link to="/signin">
              <div className="signin">로그인</div>
            </Link>
          )}
        </Links>
      </StyledHeader>

      {/* 모바일 모달창 */}
      <Modal header={header}>
        {location ? (
          <Location>
            <Icon
              onClick={() => {
                setHeader(false);
              }}
            >
              <IoIosArrowBack />
            </Icon>
            <LocationModal />
          </Location>
        ) : null}

        {date ? (
          <Date>
            <Icon
              onClick={() => {
                dispatch(locationModal());
              }}
            >
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
                setHeader(false);
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
              <div className="searchIcon">
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
