import React from 'react';
// import PropTypes from 'prop-types';
import 'antd/dist/antd.min.css';
import './index.css';
import {Badge, Calendar} from 'antd';
import locale from 'antd/es/calendar/locale/ko_KR';
import Data from './data.json';
// const [listData, setListData] = useEffect([]);
const getResData = () => {
  console.log(Data);
};
const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type   : 'warning',
          content: 'This is warning event.',
        }
      ];
      break;

    case 10:
      listData = [
        {
          type   : 'warning',
          content: 'This is warning event.',
        }
      ];
      break;

    case 15:
      listData = [
        {
          type   : 'warning',
          content: 'This is warning event',
        }
      ];
      break;

    default:
  }

  return listData || [];
};

export const AtdcCalendar = () => {
  getResData();
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content}/>
          </li>

        ))}
      </ul>
    );
  };
  return (
    <Calendar
      locale={locale}
      dateCellRender={dateCellRender}

    />
  );
};

// AtdcCalendar.propTypes = {
//     getListData: PropTypes.arrayOf(PropTypes.string).isRequired,
//     getMonthData: PropTypes.string.isRequired
// };