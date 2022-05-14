import React from "react";
import styled from "styled-components";
import Content from "../Content.styled";
import { langImg } from "../../../static/images/langImg";
import { setLanguageData } from "../../../features/Search/searchDataSlice";
import { reset } from "../../../features/Search/searchModalSlice";
import { useDispatch } from "react-redux";

const StyledLanguageModal = styled(Content)`
  @media screen and (min-width: 768px) {
    grid-column: 7/11;
  }
  width: 100%;
  height: 500px;
  overflow: scroll;
  border-radius: 10px;
  position: relative;
  z-index: 10;
  background-color: white;
  box-shadow: ${(props) => props.theme.contents.boxShadow};

  > .elements {
    color: black;
    text-align: center;
    padding: 5%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    font-family: "Medium";
    &:hover {
      box-shadow: ${(props) => props.theme.contents.boxShadow};
      cursor: pointer;
      color: ${(props) => props.theme.colors.purple};
    }
    &:active {
      box-shadow: 10px 5px 10px 0.1px rgba(0, 0, 0, 0.1);
    }
  }
`;

const LanguageModal = () => {
  const dispatch = useDispatch();
  return (
    <StyledLanguageModal>
      {Object.keys(langImg).map((el, idx) => (
        <div
          key={idx}
          className="elements"
          onClick={() => {
            dispatch(setLanguageData(el));
            dispatch(reset());
          }}
        >
          {el}
        </div>
      ))}
    </StyledLanguageModal>
  );
};

export default LanguageModal;
