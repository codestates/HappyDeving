import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Content from "./Content.styled";
import "./Map.styled.css";
import { langImg } from "../../static/images/langImg";
import { IoMdArrowDropdown, IoIosSearch } from "react-icons/io";
// import DateModal from "./Modals/DateModal";
// import LocationModal from "./Modals/LocationModal";
import CalenderDate from "../Calendar.js";
import { useSelector } from "react-redux";
import { writeStudyApi } from "../../api/study";
import { useNavigate } from "react-router-dom";

const WriteStudyDesc = styled.div`
  grid-column: 4/12;
  margin-top: 200px;

  @media screen and (max-width: 1024px) {
    grid-column: 3/13;
    transform: 1s;
  }
  @media screen and (max-width: 768px) {
    grid-column: 2/14;
    transform: 1s;
  }
`;

const Desc = styled(Content)`
  font-family: "Medium";
  padding: 3% 5% 3% 5%;

  input {
    background-color: white;
    border: 1px solid gray;
    border-radius: 5px;
    height: 40px;
    width: 100%;
    font-size: 16px;
    padding: 10px;

    @media screen and (max-width: 768px) {
      font-size: 14px;
      width: 100%;
    }

    &:focus {
      outline: none;
      border: 1px solid #5e17eb;
    }
    &:hover {
      cursor: pointer;
      border: 1px solid #5e17eb;
    }
  }
`;

const DescDateModal = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  box-shadow: none;
`;

const DescLanguageModal = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  z-index: 10;
  background: whitesmoke;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  position: absolute;
<<<<<<< HEAD
  top: 85px;
  padding: 30px 10px;
  &:focus {
    border: 1px solid #5e17eb;
  }
  &:hover {
    cursor: pointer;
    border: 1px solid #5e17eb;
=======
  z-index: 99;
`;

const DescDateModal = styled(DateModal)`
  position: relative;
  z-index: 10;
  box-shadow: none;
  padding: 0 50%;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
>>>>>>> a6330d7 (Add confirming modals, global fonts/ Fix landing page)
  }
`;

const DescLocationModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 5px;
  height: auto;
  z-index: 10;
  position: absolute;
  top: 85px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  font-size: 16px;
  text-align: center;
  background: whitesmoke;
  padding: 20px;
  cursor: pointer;

  &:focus {
    outline: none;
    border: 1px solid #5e17eb;
  }
  &:hover {
    /* cursor: pointer; */
    border: 1px solid #5e17eb;
  }
`;

const HalfInput = styled.div`
  display: flex;
  position: relative;
  background-color: white;
  width: 100%;
  border: 1px solid gray;
  border-radius: 5px;
  height: 40px;
  font-size: 16px;
  padding: 5px 10px;

  &:focus {
    border: 1px solid #5e17eb;
  }
  &:hover {
    cursor: pointer;
    border: 1px solid #5e17eb;
  }

  @media screen and (max-width: 768px) {
    font-size: 16px;
    width: 100%;
  }
`;

const IconDrop = styled.div`
  position: absolute;
  border-left: 1px solid gray;
  right: 0px;
  top: 2px;
  font-size: 34px;
  color: #5e17eb;
  padding: 0px 5px;
  cursor: pointer;
`;
const IconSerch = styled.div`
  position: absolute;
  right: 0px;
  top: 50px;
  border-left: 1px solid gray;
  font-size: 30px;
  color: #5e17eb;
  padding: 0px 10px;
  cursor: pointer;
`;

const RowWrap = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 20px;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
  }
`;
const HalfWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0px;
  width: 45%;
  position: relative;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 100%;
  position: relative;
`;

const Text = styled.div`
  font-size: 18px;
  margin: 10px 0px;
  @media screen and (max-width: 1024px) {
    font-size: 16px;
  }
`;

const Button = styled.button`
  padding: 8px 15px;
  background: #5e17eb;
  border-radius: 10px;
  border: 2px solid #dfc1ff;
  color: white;
  transition: 5ms;

  &:hover {
    background-color: #c593fe;
    border: 1px solid #6733e5;
  }
  &:active {
    position: relative;
    top: -2px;
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 200px;
  /* resize: none; */
  overflow: scroll;
  &:focus {
    outline: none;
  }
`;

const { kakao } = window;

const MapView = styled(Content)`
  border-radius: 0px;
  grid-column: 2/14;
  height: 300px;
  border-radius: 5px;
  margin-bottom: 20px;
`;
const Closed = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  input {
    margin-right: 10px;
    width: 15px;
    background-color: red;
  }
`;
const Checkbox = styled.div`
  display: flex;
  align-items: center;
`;

//바뀐 location으로 marker 만들기용으오로 데이터 가공

const StudyDesc = () => {
  const navigate = useNavigate();
  const container = useRef(null);
  const [location, setLocation] = useState({
    place_name: "광화문",
    y: 37.570975,
    x: 126.977759,
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
    console.log("location");
    if (e === "click" || e.key === "Enter") {
      console.log("search:", e.target.value);
      searchPlaces(e.target.value);
    } // true
  };

  const mapscript = () => {
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(location.y, location.x), //지도의 중심좌표
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    var map = new kakao.maps.Map(container.current, options);
    var img =
      data.language.length === 0
        ? "https://i.ibb.co/nr4FYns/happydevil.png"
        : langImg[data.language[0].name];
    var // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(65, 65), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(27, 69) };
    // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(location.y, location.x),
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
    mapscript();
  }, [location]);

  const [checked, setChecked] = useState(false);

  const [open, setOpen] = useState({
    language: false,
    date: false,
    location: false,
  });

  const user = JSON.parse(localStorage.getItem("user"));

  // const dispatch = useDispatch();
  // const { dateModal } = useSelector((store) => store.studyModal);
  // const { calenderDateValue } = useSelector((store) => store.calender);
  const { dateData } = useSelector((store) => store.searchData);
  const { calenderDateValue } = useSelector((store) => store.calender);
  const [data, setData] = useState({
    username: user.username,
    title: "",
    content: "",
    kakaoLink: "",
    closed: false,
    //checked라는 변수를 넣으면 변경이 안됨
    //(state변수가 아니라서 렌더링되지 않음. 즉 값을 받아가는 듯)
    language: [],
    location: [],
    loginMethod: user.loginMethod,
    startDate: "",
    //배열이여야 할듯
  });

  useEffect(() => {
    setData({ ...data, startDate: dateData });
  }, [dateData]);

  useEffect(() => {
    setData({ ...data, closed: checked });
  }, [checked]);

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
          const gu = location.address_name.split(" ").filter((el) => el[el.length - 1] === "구")[0];
          const dong = location.address_name
            .split(" ")
            .filter((el) => el[el.length - 1] === "동")[0];
          setData({
            ...data,
            location: [location.y, location.x, gu, dong, location.place_name],
          });
          //클릭한 장소로 location 새로 세팅
          setOpen({ ...open, location: false });
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
    <WriteStudyDesc>
      <Desc checked={checked}>
        <Wrapper>
          <Text>제목</Text>
          <input onChange={(e) => handleInputValue("title", e.target.value)}></input>
        </Wrapper>
        <RowWrap>
          <HalfWrapper>
            <Text>시작일</Text>
            <HalfInput>{dateData ? calenderDateValue : "ex. 스터디 시작 날짜"}</HalfInput>
            <DescDateModal>
              <CalenderDate />
            </DescDateModal>
          </HalfWrapper>
          <HalfWrapper>
            <Text classNane="lanaguage">언어</Text>
            {/* <LanguageDrop> */}
            <HalfInput>
              {data.language.map((el) => el.name + "," + " ")}
              <IconDrop>
                <IoMdArrowDropdown onClick={() => setOpen({ ...open, language: true })} />
              </IconDrop>
            </HalfInput>

            {/* </LanguageDrop> */}
            {open.language ? (
              <DescLanguageModal>
                <div>
                  {Object.keys(langImg).map((el, idx) => (
                    <div
                      key={idx}
                      className="elements"
                      onClick={() => {
                        setData({
                          ...data,
                          language: [
                            ...data.language,
                            {
                              id: idx + 1,
                              name: el,
                            },
                          ],
                        });
                        setOpen({ ...open, language: false });
                      }}
                    >
                      {el}
                    </div>
                  ))}
                </div>
              </DescLanguageModal>
            ) : null}
          </HalfWrapper>
        </RowWrap>
        <Wrapper>
          <Text>오픈링크</Text>
          <input
            placeholder="ex. 카카오톡 오픈채팅 링크를 입력해주세요"
            onChange={(e) => handleInputValue("kakaoLink", e.target.value)}
          ></input>
        </Wrapper>
        <Wrapper>
          <Text>장소</Text>
          <input
            className="locaitionInput"
            onKeyDown={(e) => handleLocationValue(e)}
            placeholder="ex. 송파구 오륜동"
            defaultValue={data.location ? data.location : null}
          ></input>
          {open.location ? (
            <DescLocationModal>{locationListHandler(locationList)}</DescLocationModal>
          ) : null}
          <IconSerch>
            <IoIosSearch
              onClick={() => {
                setOpen({ ...open, location: true });
              }}
            ></IoIosSearch>
          </IconSerch>
        </Wrapper>
        <MapView id="map" ref={container} />
        <Wrapper>
          <Text>내용</Text>
          <Textarea
            placeholder="ex. 스터디 모집 글을 자유롭게 작성해주세요 ^^."
            onChange={(e) => handleInputValue("content", e.target.value)}
          ></Textarea>
        </Wrapper>

        <Closed>
          <Checkbox>
            <input
              type="checkbox"
              // className="input"
              onClick={() => {
                setChecked(!checked);
              }}
            ></input>
            <label htmlFor="closed">모집마감</label>
          </Checkbox>
          <Button
            onClick={() =>
              writeStudyApi(user.id, data).then((res) => {
                console.log(res);
                alert("저장되었습니다");
                navigate(`/study/${res.data.id}`);
              })
            }
          >
            저장하기
          </Button>
        </Closed>
      </Desc>
    </WriteStudyDesc>
  );
};

export default StudyDesc;
