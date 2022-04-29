import React, { useState } from "react";
import styled from "styled-components";
import Content from "./Content.styled";
import "./Map.styled.css";
import { langImg } from "../../static/images/langImg";
// import { markerdata as dummydata } from "./Marker.data";
import LanguageModal from "./Modals/LanguageModal";
import DateModal from "./Modals/DateModal";
import Map from "./MapComponent.styled";
import CalenderDate from "../Calendar.js";

{
  /* 스터디 상세 글쓰기 페이지 : 제목 입력 칸 - 5-14
  // 입력칸들 5-14 
  //(언어 input, modal(정사각형) :5-9, 
  시작일 input, modal(정사각형) : 10-14 )
   - 내용 input은 scroll
// 글 저장 바 : height - 1row (40px), wㅌㅌㅌㅌidth는 위의 글이랑 같게*/
}

const Title = styled(Content)`
  grid-column: 2/14;
  height: 80px;
  padding: 20px 3%;
  font-family: "Bold";
  display: flex;

  .titleText {
    flex: 1;
    border-radius: 30px;
    font-size: 3vw;
    text-align: center;
    line-height: 40px;
    margin-left: -3%;
    margin-right: 6%;
  }

  .titleInput {
    flex: 3;
    background-color: gray;
    border-radius: 30px;
    height: 40px;
    &:focus {
      outline: none;
    }
  }
`;
const Div = styled.div`
  grid-column: 2/14;
  display: flex;
  > .desc {
    flex: 3;
  }
`;

const Profile = styled(Content)`
  flex: 1;
  margin-right: 20px;
  height: 550px;
`;

//(언어 input, modal(정사각형) :5-9,
// 시작일 input, modal(정사각형) : 10-14 )
// - 내용 input은 scroll

const Desc = styled(Content)`
  width: auto;
  height: 490px;
  font-family: "Medium";
  padding: 3% 5% 3% 5%;

  div {
    span {
      display: block;
      position: relative;
      z-index: 0;
    }
    input {
      z-index: 0;
      background-color: beige;
      width: 100%;
      margin-bottom: 10px;
      text-align: center;
      line-height: 30px;
      border-radius: 30px;
      box-shadow: inset -3px -2px 1px 1px rgba(0, 0, 0, 0.1);
      &:focus {
        outline: none;
      }
    }
  }

  .closed {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    input {
      position: relative;
      top: 7px;
      margin-right: 1%;
      display: inline-block;
      position: relative;
      align-self: center;
      width: 15px;
      height: 15px;
      &:hover {
        cursor: pointer;
      }
    }
    label {
      color: ${(props) => (props.checked ? props.theme.colors.purple : "black")};
    }
  }

  .langanddate {
    display: flex;
    position: relative;
    .lang {
      flex: 1;
      margin-right: 5%;
      .langContainer {
        display: flex;
        align-items: center;

        .langInput {
          width: 20px;
          height: 30px;
          background-color: beige;
          flex: 3;
          text-align: center;
          line-height: 30px;
          border-radius: 30px;
          box-shadow: inset -3px -2px 1px 1px rgba(0, 0, 0, 0.1);
        }
        button {
          flex: 1;
          width: 15vw;
          height: 30px;
          color: white;
          text-align: center;
          line-height: 30px;
          background-color: ${(props) => props.theme.colors.purple};
          border-radius: 30px;
          box-shadow: 3px 2px 1px 1px #c593fe;
          &:hover {
            background-color: ${(props) => props.theme.colors.lavender};
          }
        }
      }
    }
    .date {
      flex: 1;
      .dateContainer {
        display: flex;
        .dateInput {
          width: 20px;
          height: 30px;
          background-color: beige;
          flex: 3;
          text-align: center;
          line-height: 30px;
          border-radius: 30px;
          box-shadow: inset -3px -2px 1px 1px rgba(0, 0, 0, 0.1);
        }
        button {
          flex: 1;
          width: 15vw;
          height: 30px;
          color: white;
          text-align: center;
          line-height: 30px;
          background-color: ${(props) => props.theme.colors.purple};
          border-radius: 30px;
          box-shadow: 3px 2px 1px 1px #c593fe;
          &:hover {
            background-color: ${(props) => props.theme.colors.lavender};
          }
        }
      }
    }
  }

  .content {
    input {
      height: 100px;
      border-radius: 15px;
    }
  }
`;

const DescLanguageModal = styled(LanguageModal)`
  position: relative;
  z-index: 10;
`;

const DescDateModal = styled(DateModal)`
  position: relative;
  z-index: 10;
`;

const FuncBar = styled(Content)`
  grid-column: 2/14;
  height: 40px;
`;

const keyArr = Object.keys(langImg);

const StudyDesc = () => {
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState({
    language: false,
    date: false,
    location: false,
  });
  const [data, setData] = useState({
    language: "",
    date: "",
    location: "",
  });

  return (
    <>
      <Title>
        <div className="titleText">제목</div>
        <input className="titleInput"></input>
      </Title>
      <Div>
        <Profile />
        <div className="desc">
          <Desc checked={checked}>
            <div className="closed">
              <input type="checkbox" id="closed" onClick={() => setChecked(!checked)}></input>
              <label htmlFor="closed">모집마감</label>
            </div>
            <div className="langanddate">
              <div className="lang">
                <span>언어</span>
                {open.language ? (
                  <DescLanguageModal>
                    <div>
                      {keyArr.map((key, idx) => (
                        <img
                          src={langImg[key]}
                          key={idx}
                          onClick={() => {
                            setData({ ...data, language: key }),
                              setOpen({ ...open, language: false });
                          }}
                        />
                      ))}
                    </div>
                  </DescLanguageModal>
                ) : (
                  <div className="langContainer">
                    <div className="langInput">{data.language}</div>
                    <button onClick={() => setOpen({ ...open, language: true })}>선택</button>
                  </div>
                )}
              </div>

              <div className="date">
                <span>시작일</span>
                {open.date ? (
                  <DescDateModal>
                    <CalenderDate />
                  </DescDateModal>
                ) : (
                  <div className="dateContainer">
                    <div className="dateInput">{data.date}</div>
                    <button onClick={() => setOpen({ ...open, date: true })}>선택</button>
                  </div>
                )}
              </div>
            </div>

            <div className="link">
              <span>오픈 톡방 링크</span>
              <input></input>
            </div>
            <div className="location">
              <span>장소</span>
              <input></input>
            </div>
            <Map />
            {/* <MapView id="map" ref={container} /> */}
            <div className="content">
              <span>내용</span>
              <input></input>
            </div>
          </Desc>

          <FuncBar />
        </div>
      </Div>
    </>
  );
};

export default StudyDesc;
