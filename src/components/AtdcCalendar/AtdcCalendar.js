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
    let listData;
    console.log(value);
    for(let i = 0; i < 31; i += 1) {
      console.log(getData[i]);
      // if(getData[i] !== undefined) {
      //   console.log('');
      // }
      // console.log(getData[i].aStartTime.substring(0, 10));
      // if(value.dateFormat('YYYY-MM-DD') == getData[i].aStartTime.substring(10)) {
      //   console.log(getData[i].status);
      // }
    }
    if(value.date() === 8) {
      console.log(8);
    }
    switch (value.date()) {
      case 8:
        listData = [
          {
            type   : 'success',
            content: '08:55 / 19:00',
          }
        ];
        break;

      case 10:
        listData = [
          {
            type   : 'warning',
            content: '09:55 / 19:00',
          }
        ];
        break;

      case 6:
        listData = [
          {
            type   : 'success',
            content: '08:55 / 19:00',
          }
        ];
        break;
      case 7:
        listData = [
          {
            type   : 'success',
            content: '08:51 / 18:42',
          }
        ];
        break;
      case 9:
        listData = [
          {
            type   : 'success',
            content: '08:43 / 18:30',
          }
        ];
        break;
      case 13:
        listData = [
          {
            vacation:'휴가'
          }
        ];
        break;
      default:
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
            {item.vacation !== undefined ? <Badge text={item.vacation}></Badge> : null}
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