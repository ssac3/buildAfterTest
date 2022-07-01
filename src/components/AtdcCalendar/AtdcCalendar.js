import React, {useEffect, useState} from 'react';
// import PropTypes from 'prop-types';
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
        vacation : null,
        approval : null
      }
    ];
    const date = value.format('YYYY-MM-DD');
    for(let i = 0; i < 31; i += 1) {
      const aDate = getData[i]?.aDate;
      const workIn = (getData[i]?.aStartTime === null) ? '출근 정보 없음' : getData[i]?.aStartTime;
      if(date === aDate || date === getData[i]?.vDate) {
        console.log(aDate);
        console.log(getData[i]?.vType);
        switch (getData[i].aStatus) {
          case '0':
            listData[0].type = 'success';
            listData[0].content = workIn;
            break;
          case '1':
            listData[0].type = 'warning';
            listData[0].content = workIn;
            break;
          case '2':
            listData[0].type = 'error';
            listData[0].content = workIn;
            break;
          default:
        }
        if(getData[i]?.vId !== null) {
          console.log('in');
          console.log(getData[i]?.vType);
          const approve = getData[i].vApprovalFlag;
          switch (getData[i]?.vType) {
            case '0':
              listData[0].vacation = '전일휴가';
              listData[0].approval = approve;
              break;
            case '1':
              listData[0].vacation = '오전휴가';
              listData[0].approval = approve;
              break;
            case '2':
              listData[0].vacation = '오후휴가';
              listData[0].approval = approve;
              break;
            default:
          }
          console.log('out');
        }
      }
    }
    return listData || [];
  };

  const dateCellRender = (value) => {
    useEffect(() => {
      console.log(value);
    }, []);
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            { item.vacation !== null && item.content === '출근 정보 없음' ?
              null : <Badge status={item.type} text={item.content}/>}
            { item.approval === '1' ? <Badge className={'vacation approve'} status={''} text={item.vacation}></Badge> : <Badge className={'denied'} status={''} text={item.vacation}></Badge>}

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