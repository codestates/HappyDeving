import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout, reset } from "../../features/user/userSlice.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import {
  faPenToSquare,
  faUser,
  faFolder,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
const StyledBottommenu = styled.div`
  grid-column: 1/15;
  /* grid-template-columns: repeat(7, 1fr); */
  min-width: 520px;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0px;
  width: 100%;
  height: 70px;
  /* background: rgba(255, 255, 255, 0.5); */
  background: white;
  border-top: 1px solid #5e17eb;
  z-index: 9;
  margin: 0px;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const MeneContainter = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  margin: 0px;

  .menu {
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    color: gray;
    font-size: 14px;
    cursor: pointer;
    .icon {
      color: #6733e5;
      font-size: 22px;
      margin-bottom: 5px;
    }
  }

  .menu:hover {
    .icon {
      color: #c593fe;
      font-size: 23px;
    }
  }

  .menu:active {
    position: relative;
    top: -2px;
    .icon {
      color: #c593fe;
      font-size: 23px;
    }
  }
`;

const Menu1 = styled.div`
  grid-column: 2;
`;
const Menu2 = styled.div`
  grid-column: 3;
`;
const Menu3 = styled.div`
  grid-column: 4;
`;
const Menu4 = styled.div`
  grid-column: 5;
`;
const Menu5 = styled.div`
  grid-column: 6;
`;

const BottomMenu = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };
  const handleSignout = (e) => {
    e.preventDefault();
    dispatch(signout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <>
      <StyledBottommenu>
        {user ? (
          <MeneContainter>
            <Menu1 onClick={handleSignout} className="menu">
              <FontAwesomeIcon
                className="icon"
                icon={faArrowRightFromBracket}
              />
              <p>로그아웃</p>
            </Menu1>
            <Link to="/write">
              <Menu2 className="menu">
                <FontAwesomeIcon className="icon" icon={faPenToSquare} />
                <p>작성하기</p>
              </Menu2>
            </Link>
            <Link to="/likedStudy">
              <Menu3 className="menu">
                <FontAwesomeIcon className="icon" icon={faHeart} />
                <p>찜목록</p>
              </Menu3>
            </Link>
            <Link to="/mystudy">
              <Menu4 className="menu">
                <FontAwesomeIcon className="icon" icon={faFolder} />
                <p>내스터디</p>
              </Menu4>
            </Link>
            <Link to="/profile">
              <Menu5 className="menu">
                <FontAwesomeIcon className="icon" icon={faUser} />
                <p>프로필</p>
              </Menu5>
            </Link>
          </MeneContainter>
        ) : (
          <MeneContainter>
            <Menu2 onClick={goToHome} className="menu">
              <FontAwesomeIcon className="icon" icon={faHouse} />
              <p>둘러보기</p>
            </Menu2>
            <Link to="/write">
              <Menu3 className="menu">
                <FontAwesomeIcon className="icon" icon={faPenToSquare} />
                <p>작성하기</p>
              </Menu3>
            </Link>
            <Link to="/signin">
              <Menu4 className="menu">
                <FontAwesomeIcon className="icon" icon={faUser} />
                <p>로그인</p>
              </Menu4>
            </Link>
          </MeneContainter>
        )}
      </StyledBottommenu>
    </>
  );
};

export default BottomMenu;
