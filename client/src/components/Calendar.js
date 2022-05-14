import React, { useState } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import "../CalendarCoustom.css";
import { ClickCalenderDate } from "../features/calendarDate/calendarDate";
import { setDateData } from "../features/Search/searchDataSlice";
import { languageModal } from "../features/Search/searchModalSlice";
import { setDateModal } from "../features/studies/studyModalSlice";

function CalenderDate() {
  const moment = require("moment");
  const { calenderDateValue } = useSelector((store) => store.calender);
  const { dateData } = useSelector((store) => store.searchData);
  const dispatch = useDispatch();
  const [value, onChange] = useState(new Date());

  const handleDate = (value) => {
    onChange(value);
    console.log(`누르면 바로 변하는 것:${value}`);
    //! 클릭한 날짜를 date 전역 변수에 담아 저장한다. (이 date로 스터디 조회할 예정)

    dispatch(setDateData(moment(value).format("YYYY-MM-DD")));
    dispatch(ClickCalenderDate(moment(value).format("M월 D일")));
    dispatch(languageModal());
    dispatch(setDateModal(false));
  };

  return (
    <div>
      <Calendar
        onChange={handleDate}
        formatDay={(locale, date) => moment(date).format("DD")}
        navigationLabel={null}
        showNeighboringMonth={false}
        value={value}
      />
    </div>
  );
}

export default CalenderDate;
