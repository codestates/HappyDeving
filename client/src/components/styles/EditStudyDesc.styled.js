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
import { IoMdArrowDropdown, IoIosSearch } from "react-icons/io";
import { setDateModal } from "../../features/studies/studyModalSlice";
import { studyApi, editStudyApi } from "../../api/study";
import { Navigate, useNavigate } from "react-router-dom";

const WriteStudyDesc = styled.div`
  grid-row: 2/12;
  grid-column: 2/14;

  @media screen and (max-width: 768px) {
    grid-column: 1/15;
  }

  @media screen and (min-width: 1024px) {
    grid-column: 3/13;
  }
`;

const Desc = styled(Content)`
  font-family: "Medium";
  padding: 3% 5% 3% 5%;

  div {
    span {
      display: block;
      position: relative;
      z-index: 0;
    }
  }

  .closed {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    input {
      margin-right: 10px;

      &:hover {
        cursor: pointer;
      }
    }
    label {
      color: ${(props) =>
        props.checked ? props.theme.colors.purple : "black"};
    }
  }
`;

const Wrapper = styled.div`
  margin-bottom: 20px;

  .div {
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    height: 30px;
    width: 100%;
    text-align: center;
  }

  .dropdown {
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: flex-end;
    height: 30px;
  }
  .result {
    margin: 0 auto;
  }

  .icon {
    height: 30px;
    font-size: 30px;
  }
  .searchicon {
    height: 20px;
    font-size: 20px;
  }
`;
const Text = styled.div`
  font-size: 22px;
  @media screen and (min-width: 1024px) {
    font-size: 26px;
  }
  margin-bottom: 10px;
`;
const Input = styled.input`
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  height: 30px;
  width: 100%;
  text-align: center;
  &:focus {
    outline: none;
  }
`;
const Button = styled.button`
  float: right;
  margin: 30px 0px 30px 0px;
`;

const Textarea = styled.textarea`
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 200px;
  resize: none;
  overflow: scroll;
  &:focus {
    outline: none;
  }
`;

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

//(언어 input, modal(정사각형) :5-9,
// 시작일 input, modal(정사각형) : 10-14 )
// - 내용 input은 scroll

// const Desc = styled(Content)`;
//   width: auto;
//   height: 490px;
//   font-family: "Medium";
//   padding: 3% 5% 3% 5%;
//   border-radius: ${(props) => props.theme.borderRadius};

//   div {
//     span {
//       display: block;
//       position: relative;
//       z-index: 0;
//     }
//     input {
//       z-index: 0;
//       background-color: beige;
//       width: 100%;
//       margin-bottom: 10px;
//       border-radius: 30px;
//       box-shadow: inset -3px -2px 1px 1px rgba(0, 0, 0, 0.1);
//       text-align: center;
//       &:focus {
//         outline: none;
//       }
//     }

//     textarea {
//       z-index: 0;
//       resize: none;
//       background-color: beige;
//       width: 100%;
//       height: 120px;
//       overflow: scroll;
//       padding: 10px;
//       margin-bottom: 10px;
//       text-align: center;
//       line-height: 30px;
//       border-radius: 30px;
//       box-shadow: inset -3px -2px 1px 1px rgba(0, 0, 0, 0.1);
//       &:focus {
//         outline: none;
//       }
//     }
//   }

//   .closed {
//     display: flex;
//     justify-content: flex-end;
//     align-items: center;
//     input {
//       position: relative;
//       top: 7px;
//       margin-right: 1%;
//       display: inline-block;
//       position: relative;
//       align-self: center;
//       width: 15px;
//       height: 15px;

//       &:hover {
//         cursor: pointer;
//       }
//     }
//     label {
//       color: ${(props) =>
//         props.checked ? props.theme.colors.purple : "black"};
//     }
//   }

//   .langanddate {
//     display: flex;
//     position: relative;
//     .lang {
//       flex: 1;
//       margin-right: 5%;
//       .langContainer {
//         display: flex;
//         align-items: center;

//         .langInput {
//           width: 20px;
//           height: 30px;
//           background-color: beige;
//           flex: 3;
//           text-align: center;
//           line-height: 30px;
//           border-radius: 30px;
//           box-shadow: inset -3px -2px 1px 1px rgba(0, 0, 0, 0.1);
//         }
//         button {
//           flex: 1;
//           width: 15vw;
//           height: 30px;
//           color: white;
//           text-align: center;
//           line-height: 30px;
//           background-color: ${(props) => props.theme.colors.purple};
//           border-radius: 30px;
//           box-shadow: 3px 2px 1px 1px #c593fe;
//           &:hover {
//             background-color: ${(props) => props.theme.colors.lavender};
//           }
//         }
//       }
//     }
//     .date {
//       flex: 1;
//       .dateContainer {
//         display: flex;
//         .dateInput {
//           width: 20px;
//           height: 30px;
//           background-color: beige;
//           flex: 3;
//           text-align: center;
//           line-height: 30px;
//           border-radius: 30px;
//           box-shadow: inset -3px -2px 1px 1px rgba(0, 0, 0, 0.1);
//         }
//         button {
//           flex: 1;
//           width: 15vw;
//           height: 30px;
//           color: white;
//           text-align: center;
//           line-height: 30px;
//           background-color: ${(props) => props.theme.colors.purple};
//           border-radius: 30px;
//           box-shadow: 3px 2px 1px 1px #c593fe;
//           &:hover {
//             background-color: ${(props) => props.theme.colors.lavender};
//           }
//         }
//       }
//     }
//   }

//   .locationContainer {
//     display: flex;
//     margin-bottom: 10px;
//     .locationInput {
//       width: 20px;
//       height: 30px;
//       background-color: beige;
//       flex: 3;
//       text-align: center;
//       line-height: 30px;
//       border-radius: 30px;
//       box-shadow: inset -3px -2px 1px 1px rgba(0, 0, 0, 0.1);
//     }
//     button {
//       flex: 1;
//       width: 15vw;
//       height: 30px;
//       color: white;
//       text-align: center;
//       line-height: 30px;
//       background-color: ${(props) => props.theme.colors.purple};
//       border-radius: 30px;
//       box-shadow: 3px 2px 1px 1px #c593fe;
//       &:hover {
//         background-color: ${(props) => props.theme.colors.lavender};
//       }
//     }
//   }

//   .content {
//     input {
//       height: 100px;
//       border-radius: 15px;
//     }
//   }
// `;

const DescLanguageModal = styled.div`
  width: 90%;
  height: auto;
  z-index: 10;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  margin: 0 auto;
  position: absolute;
  z-index: 1000;
`;

const DescDateModal = styled(DateModal)`
  position: relative;
  z-index: 10;
  box-shadow: none;
  padding: 0px 40%;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const DescLocationModal = styled(LocationModal)`
  border-radius: 0px;
  box-shadow: none;
  height: auto;
  box-sizing: content-box;
  z-index: 10;
  position: absolute;
  width: 90%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0 auto;
`;

const { kakao } = window;

const MapView = styled.div`
  grid-column: 2/14;
  height: 400px;
`;

const EditStudyDesc = () => {
  const container = useRef(null);
  const locationInput = useRef(null);
  const navigate = useNavigate();
  const [location, setLocation] = useState({
    name: "광화문",
    latitude: 37.570975,
    longitude: 126.977759,
  });

  console.log(location);
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
      center: new kakao.maps.LatLng(location.y, location.x), //지도의 중심좌표
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

  const [data, setData] = useState();
  const [checked, setChecked] = useState(false);

  const href = document.location.href.split("/");
  const id = href[href.length - 1];

  useEffect(() => {
    studyApi(id).then((res) => {
      console.log(res);

      const {
        id,
        title,
        content,
        kakaoLink,
        closed,
        location,
        language,
        startDate,
        //배열이여야 할듯
      } = res.data.data.study;

      setData({
        id,
        title,
        content,
        kakaoLink,
        closed,
        startDate,
        language,
      });

      setLocation({
        y: location.latitude,
        x: location.longitude,
        place_name: location.name,
      });
      //location이 된다음에 해야 한다
    });
  }, [id]);

  useEffect(() => {
    if (data) {
      mapscript();
    }
  }, [data]);

  const [open, setOpen] = useState({
    language: false,
    date: false,
    location: false,
  });

  const dispatch = useDispatch();
  const { dateModal } = useSelector((store) => store.studyModal);
  const { dateData } = useSelector((store) => store.searchData);

  useEffect(() => {
    setData({ ...data, startDate: dateData });
  }, [dateData]);

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
          const gu = location.address_name
            .split(" ")
            .filter((el) => el[el.length - 1] === "구")[0];
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
    <>
      {data ? (
        <>
          <WriteStudyDesc>
            <Desc>
              <Wrapper>
                <Text>제목</Text>
                <Input
                  defaultValue={data.title}
                  onChange={(e) => handleInputValue("title", e.target.value)}
                ></Input>
              </Wrapper>

              <Wrapper>
                <Text>언어</Text>
                <div className="dropdown">
                  <div className="result">
                    {data.language?.map((el) => el.name + ",")}
                  </div>
                  <IoMdArrowDropdown
                    className="icon"
                    onClick={() => setOpen({ ...open, language: true })}
                  />
                </div>
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
              </Wrapper>
              <Wrapper>
                <Text>시작일</Text>
                <DescDateModal>
                  <CalenderDate />
                </DescDateModal>
              </Wrapper>
              <Wrapper>
                <Text>링크</Text>
                <Input
                  onChange={(e) =>
                    handleInputValue("kakaoLink", e.target.value)
                  }
                  defaultValue={data.kakaoLink}
                ></Input>
              </Wrapper>
              <Wrapper>
                <Text>장소</Text>
                <div className="dropdown">
                  <Input
                    onKeyDown={(e) => handleLocationValue(e)}
                    defaultValue={location.place_name}
                    ref={locationInput}
                  ></Input>
                  {open.location ? (
                    <DescLocationModal>
                      {locationListHandler(locationList)}
                    </DescLocationModal>
                  ) : null}
                  <IoIosSearch
                    className="icon"
                    onClick={(e) => {
                      console.log(locationInput.target.value);
                      setOpen({ ...open, location: true });
                    }}
                  />
                </div>
              </Wrapper>
              <MapView id="map" ref={container} />
              <Wrapper>
                <Text>내용</Text>
                <Textarea
                  onChange={(e) => handleInputValue("content", e.target.value)}
                  defaultValue={data.content}
                ></Textarea>
                <Button></Button>
              </Wrapper>
              <div className="closed">
                <input
                  type="checkbox"
                  id="closed"
                  className="input"
                  checked={data.closed ? "checked" : null}
                  onClick={() => {
                    setChecked(!checked);
                    setData({ ...data, closed: checked });
                  }}
                ></input>
                <label htmlFor="closed">모집마감</label>
              </div>
              {console.log(data)}
              <Button
                onClick={() => {
                  editStudyApi(id, data).then((res) => {
                    console.log(res);
                    alert("수정되었습니다");
                    navigate(`/study/${data.id}`);
                  });
                }}
              >
                저장
              </Button>
            </Desc>
          </WriteStudyDesc>
        </>
      ) : null}
    </>
  );
};

export default EditStudyDesc;
