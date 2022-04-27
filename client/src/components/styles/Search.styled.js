import styled from "styled-components";
import Content from "../styles/Content.styled";
import React, { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { langImg } from "../../static/images/langImg";

const StyledSearch = styled(Content)`
  grid-column: 3/ 13;
  border-radius: 50px;
  height: 80px;
  font-family: "hanna";
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  margin-bottom: 0px;
  //grid가 상속이 안됨 왜??
  div {
    box-shadow: none;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #f0f0e5;
      opacity: 0.7;
    }
    &:active {
      box-shadow: ${(props) => props.theme.contents.boxShadow};
    }

    .title {
      font-family: "Bold";
      font-size: 1.5vw;
      margin-bottom: 0.5vw;
    }

    .desc {
      font-family: "Light";
      font-size: 1.5vw;
    }
  }
`;

const Location = styled(Content)`
  grid-column: 1/4;
  height: 80px;
`;

const Date = styled(Content)`
  grid-column: 4/7;
  height: 80px;
`;

const Language = styled(Content)`
  grid-column: 7/10;
  height: 80px;
`;

const Icon = styled.span`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  line-height: 50px;
  text-align: center;
  margin: 15px 0px 15px 20px;
  background-color: ${(props) => props.theme.colors.purple};

  &:hover {
    background-color: ${(props) => props.theme.colors.lavender};
    opacity: 0.7;
  }
  &:active {
    box-shadow: ${(props) => props.theme.contents.boxShadow};
  }
`;

// const Icon = styled.span`
//   grid-column: 11/12;
//   height: 8vw;
//   border-radius: 50%;
//   padding: 3vw;
//   box-sizing: border-box;
//   background-color: ${(props) => props.theme.colors.purple};
// `;

// const [modal, setModal] = useState(1 / 2);

// const clickHandler = (id) => {
//   switch (id) {
//     case "location":
//       setModal({
//         ...modal,
//         location: true,
//       });
//       break;
//     case "date":
//       setModal({
//         ...modal,
//         date: true,
//       });
//       break;

//     case "language":
//       setModal({
//         ...modal,
//         date: true,
//       });
//       break;
//   }
// };

// const Modal = styled(Content)`
//   display: ${(props) => (props.modal ? "block" : "none")};
//   grid-column: ${(props) => props.modal};
//   z-index: 1;
//   position: relative;
//   &:after {
//     content: "";
//     display: block;
//     padding-bottom: 100%;
//   }
// `;

const LocationModal = styled(Content)`
  grid-column: 2/8;
  display: ${(props) => (props.modal === "location" ? "block" : "none")};

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const DateModal = styled(Content)`
  grid-column: 5/11;
  display: ${(props) => (props.modal === "date" ? "block" : "none")};

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const LanguageModal = styled(Content)`
  grid-column: 8/14;
  display: ${(props) => (props.modal === "language" ? "block" : "none")};
  position: relative;
  display: flex;
  justify-content: space-around;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  > img {
    position: absolute;
    display: block;
    width: 30%;
    margin: 5%;
  }
`;

const langIcons = () => {
  let keyArr = Object.keys(langImg);
  return keyArr.map((key, idx) => <img src={langImg[key]} key={idx} />);
};

const Search = () => {
  const [modal, setModal] = useState(null);
  //display : none으로 위에서 막아버림

  const clickHandler = (id) => {
    setModal(id);
    // switch (id) {
    //   case "location":
    //     setModal("2/8");
    //     //이상하게 styled-component는 props 이용 조건부 렌더링 시 string으로 해야 먹힌다
    //     break;
    //   case "date":
    //     setModal("5/11");
    //     break;

    //   case "language":
    //     setModal("8/14");
    //     break;
    //   case "search":
    //     setModal(null);
    //     break;
    // }
  };

  return (
    <>
      <StyledSearch>
        <Location id="location" onClick={(e) => clickHandler(e.target.id)}>
          <span className="title">location</span>
          <span className="desc"> location</span>
        </Location>
        <Date id="date" onClick={(e) => clickHandler(e.target.id)}>
          <span className="title">Start Date</span>
          <span className="desc"> Start Date</span>
        </Date>
        <Language id="language" onClick={(e) => clickHandler(e.target.id)}>
          <span className="title">Language</span>
          <span className="desc"> Language</span>
        </Language>
        <Icon id="search" onClick={(e) => clickHandler(e.target.id)}>
          <FontAwesomeIcon icon={faSearch} size="1.5x" color="white" />
        </Icon>
      </StyledSearch>
      <LocationModal modal={modal} />
      <DateModal modal={modal} />
      <LanguageModal modal={modal}>{langIcons()}</LanguageModal>
    </>
  );
};

export default Search;
