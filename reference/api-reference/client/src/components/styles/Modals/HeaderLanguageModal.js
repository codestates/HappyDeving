import React from "react";
import styled from "styled-components";
import Content from "../Content.styled";
import { langImg } from "../../../static/images/langImg";
import { reset } from "../../../features/Search/searchModalSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setLanguageData,
  resetData,
} from "../../../features/Search/searchDataSlice";
import { getStudiesMapApi } from "../../../api/study";
import { setStudiesData } from "../../../features/studies/studiesSlice";
import { useNavigate } from "react-router-dom";

const StyledLanguageModal = styled(Content)`
  @media screen and (min-width: 768px) {
    grid-column: 7/11;
  }
  width: 100%;
  height: auto;
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

const HeaderLanguageModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { locationData, dateData, languageData } = useSelector(
    (store) => store.searchData
  );

  const guType = locationData.split(" ")[0];
  const dongType = locationData.split(" ")[1];
  return (
    <StyledLanguageModal>
      {Object.keys(langImg).map((el, idx) => (
        <div
          key={idx}
          className="elements"
          onClick={() => {
            dispatch(setLanguageData(el));
            getStudiesMapApi({ guType, dongType, languageData, dateData }).then(
              (res) => {
                console.log(res.data);
                dispatch(setStudiesData(res.data));
              }
            );
            //res.data.studies를 markerdata로,  map api : 해당 동으로 center 지정,
            navigate("/map");
            dispatch(resetData());
            dispatch(reset());
          }}
        >
          {el}
        </div>
      ))}
    </StyledLanguageModal>
  );
};

export default HeaderLanguageModal;
