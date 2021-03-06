import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Content from "./Content.styled";
import "./Map.styled.css";
import { langImg } from "../../static/images/langImg";
import { IoMdArrowDropdown, IoIosSearch } from "react-icons/io";
import { openModal } from "../../features/modal/modalSlice";
import CalenderDate from "../Calendar.js";
import { useDispatch, useSelector } from "react-redux";
import { studyApi } from "../../api/study";
import { useParams } from "react-router-dom";
import { resetData } from "../../features/Search/searchDataSlice";

const WriteStudyDesc = styled.div`
  grid-column: 4/12;

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
  padding: 0% 5%;

  input {
    background-color: rgba(233, 193, 255, 20%);
    border-radius: 5px;
    height: 40px;
    width: 100%;
    font-size: 16px;
    padding: 10px;
    height: 50px;
    cursor: pointer;
    @media screen and (max-width: 768px) {
      font-size: 14px;
      width: 100%;
    }
    &:hover {
      outline: none;
      border-bottom: 1px solid #5e17eb;
    }
    &:focus {
      outline: none;
      border-bottom: 1px solid #5e17eb;
    }
  }
`;

const Title = styled.div`
  width: 80%;
  margin: 0 auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
`;

const TitleText = styled.div`
  font-size: 20px;
  font-family: "Binggrae";
  text-align: center;
`;

const DescDateModal = styled.div`
  width: 100%;
  height: auto;

  text-align: center;
  z-index: 30;
  border-radius: 5px;
  position: absolute;
  top: 50px;
  left: 0px;
  padding: 0px 10px;
  border: 4px solid rgba(250, 240, 255, 100%);
  background: white;
  outline: none;
  &:focus {
    border: 1px solid #5e17eb;
  }
  &:hover {
    cursor: pointer;
    border: 1px solid #5e17eb;
  }
`;

const DescLanguageModal = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  z-index: 30;

  border-radius: 5px;
  position: absolute;
  top: 50px;
  left: 0px;
  padding: 32px 10px;
  border: 4px solid rgba(250, 240, 255, 100%);
  background: white;
  cursor: pointer;
  &:focus {
    border: 1px solid #5e17eb;
  }
  &:hover {
    border: 1px solid #5e17eb;
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
  top: 95px;
  left: 0px;
  width: 100%;
  margin: 0 auto;
  font-size: 16px;
  text-align: center;
  padding: 20px;
  border: 4px solid rgba(250, 240, 255, 100%);
  background: white;
  cursor: pointer;

  &:focus {
    border: 1px solid #5e17eb;
  }
  &:hover {
    border: 1px solid #5e17eb;
  }
`;

const HalfInput = styled.div`
  display: flex;
  background-color: rgba(233, 193, 255, 20%);
  border-radius: 5px;
  position: relative;
  width: 100%;
  height: 50px;
  font-size: 16px;
  padding: 5px 10px;

  align-items: center;
  cursor: pointer;
  &:hover {
    outline: none;
    border-bottom: 1px solid #5e17eb;
  }
  &:focus {
    outline: none;
    border-bottom: 1px solid #5e17eb;
  }
  @media screen and (max-width: 768px) {
    font-size: 16px;
    width: 100%;
  }
`;

const LangDrop = styled.div`
  position: absolute;
  border-left: 1px solid darkgray;
  right: 0px;
  top: 8px;
  font-size: 34px;
  color: #5e17eb;
  padding: 0px 2px;
  cursor: pointer;
`;

const DateDrop = styled.div`
  position: absolute;
  border-left: 1px solid darkgray;
  right: 0px;
  top: 8px;
  font-size: 34px;
  color: #5e17eb;
  padding: 0px 2px;
  cursor: pointer;
`;
const IconSerch = styled.div`
  position: absolute;
  right: 0px;
  top: 55px;
  border-left: 1px solid darkgray;
  font-size: 30px;
  color: #5e17eb;
  padding: 0px 5px;
  /* padding: 5px 10px; */
  cursor: pointer;
`;

const RowWrap = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 20px;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    flex-direction: column;
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
  font-family: "Binggrae";
  font-size: 18px;
  margin: 10px 0px;
  @media screen and (max-width: 1024px) {
    font-size: 16px;
  }
`;

const ConfirmButton = styled.button`
  display: flex;
  font-family: "Binggrae";
  justify-content: center;
  width: 150px;
  padding: 5px 5px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #5e17eb;
  font-size: 14px;
  transition: 1ms;
  &:hover {
    color: #5e17eb;
    font-weight: 600;
    background-color: rgba(233, 193, 255, 10%);
    position: relative;
    top: -2px;
  }
  &:active {
    position: relative;
    top: 0px;
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(233, 193, 255, 20%);
  width: 100%;
  height: 200px;
  /* outline: none; */
  &:hover {
    outline: none;
    border-bottom: 1px solid #5e17eb;
  }
  &:focus {
    outline: none;
    border-bottom: 1px solid #5e17eb;
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
    margin-left: 10px;
    width: 18px;
  }
`;
const Checkbox = styled.div`
  display: flex;
  align-items: center;
`;

const EditStudyDesc = () => {
  const dispatch = useDispatch();

  const container = useRef(null);
  const locationInput = useRef(null);

  const { dateData } = useSelector((store) => store.searchData);
  const { calenderDateValue } = useSelector((store) => store.calender);
  const { isError, message } = useSelector((state) => state.allStudies);

  const [location, setLocation] = useState({
    name: "?????????",
    latitude: 37.570975,
    longitude: 126.977759,
  });

  const [locationList, setLocationList] = useState([]);
  const { date } = useSelector((store) => store.search);
  const [lang, setLang] = useState([{ id: 6, name: "react" }]);
  const [open, setOpen] = useState({
    language: false,
    date: false,
    location: false,
  });

  const [data, setData] = useState(null);
  const [checked, setChecked] = useState(false);

  const moment = require("moment");

  var ps = new kakao.maps.services.Places();

  // ????????? ????????? ???????????? ???????????????
  function searchPlaces(value) {
    var keyword = value;
    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      alert("???????????? ??????????????????!");
      return false;
    }
    // ???????????? ????????? ?????? ???????????? ??????????????? ???????????????
    return ps.keywordSearch(keyword, placesSearchCB);
  }

  // ??????????????? ???????????? ??? ???????????? ???????????? ?????????
  function placesSearchCB(data, status) {
    if (status === kakao.maps.services.Status.OK) {
      setLocationList(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("?????? ????????? ???????????? ????????????.");
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("?????? ?????? ??? ????????? ??????????????????.");
      return;
    }
  }

  const handleLocationValue = (e, value) => {
    if (e.type === "click" || e.key === "Enter") {
      searchPlaces(value);
    }
  };

  const mapscript = () => {
    const options = {
      //????????? ????????? ??? ????????? ?????? ??????
      center: new kakao.maps.LatLng(location.y, location.x), //????????? ????????????
      level: 3, //????????? ??????(??????, ?????? ??????)
    };

    var map = new kakao.maps.Map(container.current, options);

    var // ?????????????????? ???????????????
      imageSize = new kakao.maps.Size(65, 65), // ?????????????????? ???????????????
      imageOption = { offset: new kakao.maps.Point(27, 69) };
    // ?????????????????? ???????????????. ????????? ????????? ???????????? ????????? ???????????? ????????? ???????????????.
    var img = langImg[lang[0]["name"]];

    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(location.y, location.x),
      image: new kakao.maps.MarkerImage(img, imageSize, imageOption),
    });
    //marker ?????????

    //marker ?????? ????????? ????????? ????????? ????????? ??????

    marker.setClickable(true);
    marker.getClickable(true);
    // ????????? ???????????? ??? ????????? ?????? ???????????? ???????????? ????????? ???????????????

    //el.id ????????? ???????????? ????????????.
  };

  // const href = document.location.href.split("/");
  // const id  = href[href.length - 1];
  const { id } = useParams();

  useEffect(() => {
    studyApi(id).then((res) => {
      const {
        id,
        title,
        content,
        kakaoLink,
        closed,
        location,
        language,
        startDate,
        //??????????????? ??????
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

      setLang(language);

      setLocation({
        y: location.latitude,
        x: location.longitude,
        place_name: location.name,
      });

      //location??? ???????????? ?????? ??????
    });
  }, [id]);

  useEffect(() => {
    if (data) {
      mapscript();
    }
  }, [data]);

  useEffect(() => {
    setData({ ...data, startDate: dateData });
  }, [dateData]);

  const locationListHandler = (locationList) => {
    //????????? ????????? ?????? ??????????????? ????????? div??? ??????
    //return ????????? ??????????????? ???

    //????????? ???????????? ?????? ???????????? ?????? ??????
    //?????? ??????
    return locationList.map((location, idx) => (
      <div
        key={idx}
        onClick={() => {
          setLocation(location);
          const gu = location.address_name
            .split(" ")
            .filter((el) => el[el.length - 1] === "???")[0];
          const dong = location.address_name
            .split(" ")
            .filter((el) => el[el.length - 1] === "???")[0];
          setData({
            ...data,
            location: [location.y, location.x, gu, dong, location.place_name],
          });
          //????????? ????????? location ?????? ??????
          locationInput.current.value = location.place_name;
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

  const handleUpdateStudy = async (e) => {
    e.preventDefault();
    if (isError) {
      console.log("editStudy.rejected :", message);
    }
    dispatch(
      openModal({ name: "UpdateStudy", childrenProps: { id, ...data } })
    );
  };

  return (
    <>
      {data ? (
        <>
          <WriteStudyDesc>
            <Desc>
              <Title>
                <TitleText>????????? ??? ????????????</TitleText>
              </Title>
              <Wrapper>
                <Text>??????</Text>
                <input
                  defaultValue={data.title}
                  onChange={(e) => handleInputValue("title", e.target.value)}
                ></input>
              </Wrapper>
              <RowWrap>
                <HalfWrapper>
                  <Text>????????? ?????????</Text>

                  <HalfInput>
                    {dateData
                      ? calenderDateValue
                      : moment(data.startDate).format("M??? DD???")}
                    <DateDrop>
                      <IoMdArrowDropdown
                        onClick={() => setOpen({ ...open, date: !open.date })}
                      />
                    </DateDrop>
                    {open.date ? (
                      <DescDateModal>
                        <CalenderDate setOpen={setOpen} open={open} />
                      </DescDateModal>
                    ) : null}
                  </HalfInput>
                </HalfWrapper>
                <HalfWrapper>
                  <Text classNane="lanaguage">?????? ??????</Text>
                  <HalfInput>
                    {data.language?.map((el) => el.name).join()}
                    <DateDrop>
                      <IoMdArrowDropdown
                        onClick={() =>
                          setOpen({ ...open, language: !open.language })
                        }
                      />
                    </DateDrop>
                    {open.language ? (
                      <DescLanguageModal>
                        <div>
                          {Object.keys(langImg).map((el, idx) => (
                            <div
                              key={idx}
                              className="elements"
                              onClick={() => {
                                if (
                                  data.language.filter((obj) => obj.name === el)
                                    .length === 0
                                ) {
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
                                }
                                setOpen({ ...open, language: false });
                              }}
                            >
                              {el}
                            </div>
                          ))}
                        </div>
                      </DescLanguageModal>
                    ) : null}
                  </HalfInput>
                </HalfWrapper>
              </RowWrap>
              <Wrapper>
                <Text>????????? ?????? ??????</Text>
                <input
                  placeholder="ex. ???????????? ???????????? ??????"
                  onChange={(e) =>
                    handleInputValue("kakaoLink", e.target.value)
                  }
                  defaultValue={data.kakaoLink}
                ></input>
              </Wrapper>

              <Wrapper>
                <Text>????????? ??????</Text>
                <input
                  className="locaitionInput"
                  placeholder="ex. ????????? 4??? ??????"
                  onKeyDown={(e) => {
                    handleLocationValue(e, e.target.value);
                  }}
                  defaultValue={location.place_name}
                  ref={locationInput}
                ></input>
                {open.location ? (
                  <DescLocationModal>
                    {locationListHandler(locationList)}
                  </DescLocationModal>
                ) : null}
                <IconSerch>
                  <IoIosSearch
                    className="icon"
                    onClick={(locationInput) => {
                      setOpen({ ...open, location: true });
                    }}
                  />
                </IconSerch>
              </Wrapper>
              <MapView id="map" ref={container} />
              <Wrapper>
                <Text>??????</Text>
                <Textarea
                  onChange={(e) => handleInputValue("content", e.target.value)}
                  defaultValue={data.content}
                ></Textarea>
              </Wrapper>

              <Closed>
                <Checkbox>
                  <label htmlFor="closed">????????? ????????????</label>
                  <input
                    type="checkbox"
                    checked={data.closed ? "checked" : null}
                    onClick={() => {
                      setChecked(!checked);
                      setData({ ...data, closed: checked });
                    }}
                  ></input>
                </Checkbox>

                <ConfirmButton
                  onClick={(e) => {
                    handleUpdateStudy(e);
                    dispatch(resetData());
                  }}
                >
                  ????????????
                </ConfirmButton>
              </Closed>
            </Desc>
          </WriteStudyDesc>
        </>
      ) : null}
    </>
  );
};

export default EditStudyDesc;
