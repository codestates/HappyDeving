import React from "react";
import styled from "styled-components";
import Content from "./Content.styled";
import Map from "./Map.styled";

{
  /* 스터디 상세 글쓰기 페이지 : 제목 입력 칸 - 5-14
  // 입력칸들 5-14 
  //(언어 input, modal(정사각형) :5-9, 
  시작일 input, modal(정사각형) : 10-14 )
   - 내용 input은 scroll
// 글 저장 바 : height - 1row (40px), width는 위의 글이랑 같게*/
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
  height: 400px;
`;

//(언어 input, modal(정사각형) :5-9,
// 시작일 input, modal(정사각형) : 10-14 )
// - 내용 input은 scroll

const Desc = styled(Content)`
  width: auto;
  height: 340px;
  font-family: "Medium";
  padding: 3%;
`;

const FuncBar = styled(Content)`
  grid-column: 2/14;
  height: 40px;
`;

const StudyDesc = () => {
  return (
    <>
      <Title>
        <div className="titleText">제목</div>
        <input className="titleInput"></input>
      </Title>
      <Div>
        <Profile />
        <div className="desc">
          <Desc>
            <div className="closed">
              <span>모집 마감</span>
              <input></input>
            </div>
            <div className="langanddate">
              <div className="lang">
                <span>언어</span>
                <input></input>
              </div>

              <div className="date">
                <span>시작일</span>
                <input></input>
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
