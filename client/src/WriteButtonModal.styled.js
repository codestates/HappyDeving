import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Content from "./components/styles/Content.styled";

const StyledContainer = styled(Content)`
  min-height: 100%;
  grid-column: 4/12;
  bottom: 200px;
  background-color: transparent;
  padding: 0.1px 0.1px;
  right: 100px;
  position: absolute;
  z-index: 500;
  @media screen and (max-width: 1024px) {
    right: 10px;
  }
`;
const StyledButtonContainer = styled.div`
  padding: 10px 20px;
  border-radius: 20px;
  border: 3px solid #c593fe;
  position: fixed;
  right: 5%;
  bottom: 30%;
  z-index: 10;
  font-size: 30px;
  box-shadow: 2px 2px 10px grey;
  background: #6733e5;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    border-radius: 10px;
    background: #c593fe;
    border: 3px solid #6733e5;
    box-shadow: 3px 3px 10px gray;
  }
  @media screen and (max-width: 1024px) {
    padding: 0px 10px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const WriteButtonModal = () => {
  // const { user } = useSelector((state) => state.user);
  // const navigate = useNavigate();

  return (
    <>
      <StyledContainer>
        <Link to="/write">
          <StyledButtonContainer>
            <FontAwesomeIcon icon={faPlus} color="white" />
          </StyledButtonContainer>
        </Link>
      </StyledContainer>
    </>
  );
};

export default WriteButtonModal;
