import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Content from "./Content.styled";
import Comments from "../Comments";
import "./Map.styled.css";
import { langImg } from "../../static/images/langImg";
import { studyApi, deleteStudyApi } from "../../api/study";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
  border-radius: ${(props) => props.theme.borderRadius};

  .titleText {
    flex: 1;
    font-size: 3vw;
    text-align: center;
    line-height: 40px;
    margin-left: -3%;
    margin-right: 6%;
  }

  .titleInput {
    flex: 3;
    background-color: beige;
    border-radius: inherit;
    box-shadow: inset -3px -2px 1px 1px rgba(0, 0, 0, 0.1);
    text-align: center;
    height: 40px;
    &:focus {
      outline: none;
    }
  }
`;

const ContentDiv = styled.div`
  grid-column: 2/14;
  display: flex;

  > .container {
    flex: 3;
  }
`;

const Profile = styled(Content)`
  flex: 1;
  margin-right: 20px;
  height: 550px;
`;
const CommentDiv = styled(Content)`
  /* background: pink; */
  grid-column: 2/14;
  display: flex;
  height: ;
`;

//(언어 input, modal(정사각형) :5-9,
// 시작일 input, modal(정사각형) : 10-14 )
// - 내용 input은 scroll

const Desc = styled(Content)`
  width: auto;
  height: 490px;
  font-family: "Medium";
  padding: 3% 5% 3% 5%;
  border-radius: ${(props) => props.theme.borderRadius};

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
      border-radius: 30px;
      box-shadow: inset -3px -2px 1px 1px rgba(0, 0, 0, 0.1);
      text-align: center;
      &:focus {
        outline: none;
      }
    }

    textarea {
      z-index: 0;
      resize: none;
      background-color: beige;
      width: 100%;
      height: 120px;
      overflow: scroll;
      padding: 10px;
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

  .locationContainer {
    display: flex;
    margin-bottom: 10px;
    .locationInput {
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

  .content {
    input {
      height: 100px;
      border-radius: 15px;
    }
  }
`;

const FuncBar = styled(Content)`
  grid-column: 2/14;
  height: 40px;
  padding: 3px 10px;
  button {
    float: right;
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
`;

const { kakao } = window;

const MapView = styled(Content)`
  grid-column: 2/14;
  height: 200px;
`;

//바뀐 location으로 marker 만들기용으오로 데이터 가공

const StudyDesc = () => {
  const container = useRef(null);
  const navigate = useNavigate();

  const [location, setLocation] = useState({
    place_name: "광화문",
    latitude: 37.570975,
    logitude: 126.977759,
  });
  const [data, setData] = useState();
  const [backendComments, setBackendComments] = useState([]);
  const { user } = useSelector((state) => state.user);

  const mapscript = () => {
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(location.latitude, location.longitude), //지도의 중심좌표
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    var map = new kakao.maps.Map(container.current, options);

    var // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(65, 65), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(27, 69) };
    // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    var img = langImg.javascript;

    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(location.latitude, location.longitude),
      image: new kakao.maps.MarkerImage(img, imageSize, imageOption),
    });
    //marker 만들기

    //marker 배열 내용을 하나씩 넣어서 만드는 과정

    marker.setClickable(true);
    marker.getClickable(true);
    // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다

    //el.id 스터디 아이디가 담겨온다.
  };

  useEffect(() => {
    if (data) {
      mapscript();
    }
  }, [data]);

  useEffect(() => {
    const href = document.location.href.split("/");
    const id = href[href.length - 1];
    studyApi(id).then((res) => {
      setData(res.data.data.study);
      setBackendComments(res.data.data.comment);
      console.log("상세페이지 get comments: ", res.data.data.comment);
      setLocation(res.data.data.study.location);
    });
  }, []);

  console.log(data);
  //checked의 상태 변화 기다리기 위해

  return (
    <>
      {data ? (
        <>
          <Title>
            <div className="titleText">제목</div>
            <div>{data.title}</div>
          </Title>
          <ContentDiv>
            <Profile />
            <div className="container">
              <Desc>
                <div className="closed">
                  <div>{data.closed ? "모집마감" : "모집중"}</div>
                </div>
                <div className="langanddate">
                  <div className="lang">
                    <span>언어</span>
                    {data.language.map((el, idx) => (
                      <span key={idx}>{el.name}</span>
                    ))}
                  </div>
                  <div className="date">
                    <span>시작일</span>
                    <span>{data.startDate}</span>
                  </div>
                </div>

                <div className="link">
                  <span>오픈 톡방 링크</span>
                  <span>{data.kakaoLink}</span>
                </div>
                <div className="location">
                  <span>장소</span>
                  <span>{data.location.name}</span>
                </div>
                <MapView id="map" ref={container} />
                <div className="content">
                  <span>내용</span>
                  <div>{data.content}</div>
                </div>
              </Desc>
              <FuncBar>
                <button onClick={() => navigate(`/study/edit/${data.id}`)}>수정</button>
                <button onClick={() => deleteStudyApi(data.id)}>삭제</button>
              </FuncBar>
            </div>
          </ContentDiv>
          <CommentDiv>
            <Comments
              commentsInStudyData={backendComments}
              studyId={data.id}
              currentUserId={user.id}
            />
          </CommentDiv>
        </>
      ) : (
        "data가 없습니다"
      )}
    </>
  );
};

export default StudyDesc;
