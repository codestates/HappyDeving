import React, { useState } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
// import "react-calendar/dist/Calendar.css";
import "../../src/CalendarCoustom.css";
import { ClickCalenderDate } from "../features/calendarDate/calendarDate";
import { setDateData } from "../features/Search/searchDataSlice";
import { languageModal } from "../features/Search/searchModalSlice";
function CalenderDate() {
  const moment = require("moment");
  const { calenderDateValue } = useSelector((store) => store.calender);
  const { dateData } = useSelector((store) => store.searchData);
  const { language } = useSelector((store) => store.search);
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  // const today = moment();

  const handleDate = (date) => {
    setDate(date);
    console.log(date);
    //! 클릭한 날짜를 date 전역 변수에 담아 저장한다. (이 date로 스터디 조회할 예정)
    // dispatch(ClickCalenderDate(date));

    dispatch(setDateData(moment(date).format("YYYY-MM-DD")));
    dispatch(ClickCalenderDate(moment(date).format("M월 D일")));
  };

  console.log(calenderDateValue);
  console.log(dateData);
  console.log(language);


  return (
    <div>
      <Calendar

        onChange={() => {
          handleDate(), dispatch(languageModal());
        }}
        formatDay={(locale, date) => moment(date).format("DD")}
        navigationLabel={null}
        showNeighboringMonth={false}
        value={date}
      />
    </div>
  );
}

export default CalenderDate;
