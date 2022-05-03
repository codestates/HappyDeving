import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Content from "./Content.styled";
import "./Map.styled.css";
import { langImg } from "../../static/images/langImg";
import LanguageModal from "./Modals/LanguageModal";
import DateModal from "./Modals/DateModal";
import LocationModal from "./Modals/LocationModal";
import CalenderDate from "../Calendar.js";
import { useDispatch, useSelector } from "react-redux";
import { setDateModal } from "../../features/studies/studyModalSlice";
import { studyApi, editStudyApi } from "../../api/study";

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

const DescLanguageModal = styled(LanguageModal)`
  position: relative;
  z-index: 10;
`;

const DescDateModal = styled(DateModal)`
  position: relative;
  z-index: 10;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const DescLocationModal = styled(LocationModal)`
  position: relative;
  padding: 10px;
  margin: 0 auto;
  z-index: 10;
  input {
    position: relative;
    width: 50%;
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

const keyArr = Object.keys(langImg);

const { kakao } = window;

const MapView = styled(Content)`
  grid-column: 2/14;
  height: 200px;
`;

const EditStudyDesc = () => {
  const container = useRef(null);
  const [location, setLocation] = useState({
    name: "광화문",
    latitude: 37.570975,
    longitude: 126.977759,
  });
  const [locationList, setLocationList] = useState([]);
  var ps = new kakao.maps.services.Places();

  // 키워드 검색을 요청하는 함수입니다
  function searchPlaces(value) {
    var keyword = value;
    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      alert("키워드를 입력해주세요!");
      return false;
    }
    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    return ps.keywordSearch(keyword, placesSearchCB);
  }

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  function placesSearchCB(data, status) {
    if (status === kakao.maps.services.Status.OK) {
      setLocationList(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    }
  }

  const handleLocationValue = (e) => {
    if (e.key === "Enter") {
      searchPlaces(e.target.value);
    } // true
  };

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
    var img =
      "https://i0.wp.com/www.primefaces.org/wp-content/uploads/2017/09/feature-react.png?ssl=1";

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

  const [data, setData] = useState();

  const href = document.location.href.split("/");
  const id = href[href.length - 1];

  useEffect(() => {
    studyApi(id).then((res) => {
      const {
        title,
        content,
        kakaoLink,
        closed,
        //checked라는 변수를 넣으면 변경이 안됨
        //(state변수가 아니라서 렌더링되지 않음. 즉 값을 받아가는 듯)
        language,
        startDate,
        //배열이여야 할듯
      } = res.data.data.study;
      console.log(res.data.data.study);

      setData({
        title,
        content,
        kakaoLink,
        closed,
        startDate,
        language,
      });
      setLocation(res.data.data.study.location);
      //   setData(res.data.data.study);
      //   setLocation(res.data.data.study.location);
    });
  }, [id]);

  useEffect(() => {
    if (data) {
      mapscript();
    }
  }, [data]);

  const [checked, setChecked] = useState(false);

  const [open, setOpen] = useState({
    language: false,
    date: false,
    location: false,
  });

  const dispatch = useDispatch();
  const { dateModal } = useSelector((store) => store.studyModal);
  const { calenderDateValue } = useSelector((store) => store.calender);

  const locationListHandler = (locationList) => {
    //검색한 조건에 맞는 스터디들의 목록을 div로 표현
    //return 문에서 사용해줘야 함

    //검색한 리스트의 장소 이름으로 목록 변경
    //중복 제외
    return locationList.map((location, idx) => (
      <div
        key={idx}
        onClick={() => {
          setLocation(location);
          setData({ ...data, location: { name: location.name } });
          setOpen({ ...open, location: false });
          //클릭한 장소로 location 새로 세팅
        }}
      >
        {location.place_name}
      </div>
    ));
  };

  const handleInputValue = (id, e) => {
    setData({ ...data, [id]: e });
  };

  return (
    <>
      {data ? (
        <>
          <Title>
            <div className="titleText">제목</div>
            <input
              className="titleInput"
              defaultValue={data.title}
              onChange={(e) => handleInputValue("title", e.target.value)}
            ></input>
          </Title>
          <ContentDiv>
            <Profile />
            <div className="container">
              <Desc checked={checked}>
                <div className="closed">
                  <input
                    type="checkbox"
                    id="closed"
                    defaultChecked={data.closed}
                    onClick={() => {
                      setChecked(!checked);
                    }}
                  ></input>
                  {console.log(data)}
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
                                handleInputValue("language", [
                                  ...data.language,
                                  { id: idx, name: key },
                                ]);
                                setOpen({ ...open, language: false });
                              }}
                            />
                          ))}
                        </div>
                      </DescLanguageModal>
                    ) : (
                      <div className="langContainer">
                        <div className="langInput">{data.language.map((el) => el.name + ",")}</div>
                        <button onClick={() => setOpen({ ...open, language: true })}>선택</button>
                      </div>
                    )}
                  </div>
                  <div className="date">
                    <span>시작일</span>
                    {dateModal ? (
                      <DescDateModal>
                        <CalenderDate />
                      </DescDateModal>
                    ) : (
                      <div className="dateContainer">
                        <div className="dateInput">
                          {/* 바뀌도록 */}
                          {calenderDateValue}
                        </div>
                        <button onClick={() => dispatch(setDateModal(true))}>선택</button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="link">
                  <span>오픈 톡방 링크</span>
                  <input
                    defaultValue={data.kakaoLink}
                    onChange={(e) => handleInputValue("kakaoLink", e.target.value)}
                  ></input>
                </div>
                <div className="location">
                  <span>장소</span>
                  {open.location ? (
                    <>
                      <DescLocationModal>
                        <input
                          onKeyDown={(e) => handleLocationValue(e)}
                          placeholder="ex. 송파구 오륜동"
                        ></input>
                        {locationListHandler(locationList)}
                      </DescLocationModal>
                    </>
                  ) : (
                    <div className="locationContainer">
                      <div className="locationInput">{location.name}</div>
                      <button onClick={() => setOpen({ ...open, location: true })}>검색</button>
                    </div>
                  )}
                </div>
                <MapView id="map" ref={container} />
                <div className="content">
                  <span>내용</span>
                  <textarea
                    onChange={(e) => handleInputValue("content", e.target.value)}
                    defaultValue={data.content}
                  ></textarea>
                </div>
              </Desc>
              <FuncBar>
                {console.log(data)}
                <button onClick={() => editStudyApi(id, data).then((res) => console.log(res))}>
                  저장
                </button>
              </FuncBar>
            </div>
          </ContentDiv>
        </>
      ) : null}
    </>
  );
};

export default EditStudyDesc;
