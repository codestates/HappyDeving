import styled from "styled-components";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openSigninModal } from "../../features/modal/modalSlice";
import { Link, useNavigate } from "react-router-dom";

const icons = {
  logo: "https://cdn.discordapp.com/attachments/965506579564732419/967356348390076427/happylogo2.png",
  write: "https://cdn.discordapp.com/attachments/965506579564732419/968872695011885076/7.png",
  login: "https://cdn.discordapp.com/attachments/965506579564732419/968872695255142420/8.png",
  mypage: "https://cdn.discordapp.com/attachments/965506579564732419/969043355067617321/9.png",
};

const StyledHeader = styled.header`
  font-family: "Bold";
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-column: 2/14;
  position: relative;
  margin-bottom: 40px;
  margin-top: 40px;

  > .logo {
    width: 20vw;
    margin-left: 0px;
    &:hover {
      cursor: pointer;
    }
  }
  > div {
    color: #5e17eb;
    text-align: center;
    font-size: 25px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .write {
      width: 10vw;
      margin-right: 20px;
      &:hover {
        cursor: pointer;
      }
    }
    .mypage {
      width: 10vw;

      margin-right: 20px;
      &:hover {
        cursor: pointer;
      }
    }

    .login {
      width: 10vw;
      margin-right: 20px;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const Header = () => {
  // const user = JSON.parse(localStorage.getItem("user"));
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToHome = () => {
    navigate("/");
  };
  return (
    <>
      <StyledHeader>
        <img onClick={goToHome} className="logo" src={icons.logo} />
        <div>
          <Link to="/write">
            <img className="write" src={icons.write} />
          </Link>
          {user ? (
            <img className="mypage" src={icons.mypage} />
          ) : (
            <img
              onClick={() => dispatch(openSigninModal(true))}
              className="login"
              src={icons.login}
            />
          )}
        </div>
      </StyledHeader>
    </>
  );
};

export default Header;
