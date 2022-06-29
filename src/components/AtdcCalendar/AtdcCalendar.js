import React, {useEffect, useState} from 'react';
// import PropTypes from 'prop-types';
import 'antd/dist/antd.min.css';
import './index.css';
import {Badge, Calendar} from 'antd';
import locale from 'antd/es/calendar/locale/ko_KR';
import {useSelector} from 'react-redux';



export const AtdcCalendar = () => {
  const [getData, setGetData] = useState([]);
  const selector = useSelector((state) => state.UserReducer);

  useEffect(() => {
    if(selector.data?.length > 0) {
      setGetData(selector.data);
    }
  }, [selector]);
  useEffect(() => {
  }, [getData]);
  const getListData = (value) => {
    const listData = [
      {
        type : null,
        content: null,
        vacation : null
      }
    ];
    const date = value.format('YYYY-MM-DD');
    for(let i = 0; i < 31; i += 1) {
      if(date === getData[i]?.aStartTime?.substring(0, 10) || date === getData[i]?.vDate) {
        if(getData[i].aStatus === '0') {
          listData[0].type = 'success';
          listData[0].content = getData[i].aStartTime.substring(10, 16);
        }
        console.log(getData[i]?.vId);
        if(getData[i].vId !== null) {
          listData[0].vacation = '휴가';
          console.log(getData[i].vDate);
        }
      }
      console.log(getData[i]?.aStartTime?.substring(0, 10));
    }
    return listData || [];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content}/>
            {item.vacation !== null ? <Badge status={''} text={item.vacation}></Badge> : null}
          </li>

        ))}
      </ul>
    );
  };


  return (
    <Calendar
      locale={locale}
      dateCellRender={(value) => dateCellRender(value, getData)}
    />
  );
};

// AtdcCalendar.propTypes = {
//   attendanceData:PropTypes.arrayOf(
//     PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
//   ).isRequired,
//
// };

// AtdcCalendar.propTypes = {
//     getListData: PropTypes.arrayOf(PropTypes.string).isRequired,
//     getMonthData: PropTypes.string.isRequired
// };