import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import 'components/AtdcCalendar/index.css';
import {Calendar, Col, Row, Select, Badge} from 'antd';
import locale from 'antd/es/calendar/locale/ko_KR';
import moment from 'moment';
import FloatBtn from 'components/FloatBtn';
// import {useDispatch, useSelector} from 'react-redux';
// import {SwpEadReq} from 'redux/actions/ManagerAction';

const CustomHeader = ({value, onChange}) => {
  const start = 0;
  const end = 12;
  const monthOptions = [];
  const months = [];

  for (let i = 1; i <= 12; i += 1) {
    const month =
      i.toString().length > 1 ? i : '0'.concat(i.toString());
    months.push(month);
  }

  for (let index = start; index < end; index += 1) {
    monthOptions.push(
      <Select.Option className="month-item" key={`${index}`}>
        {months[index]}
      </Select.Option>
    );
  }

  const month = value.month();
  const year = value.year();
  const options = [];

  for (let i = year - 10; i < year + 10; i += 1) {
    options.push(
      <Select.Option key={i} value={i} className="year-item">
        {i}
      </Select.Option>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 8
      }}
    >
      <Row gutter={8}>
        <Col>
          <Select
            size="small"
            dropdownMatchSelectWidth={false}
            className="my-year-select"
            onChange={(newYear) => {
              const now = value.clone().year(Number(newYear));
              onChange(now);
            }}
            value={year.toString()}
          >
            {options}
          </Select>
        </Col>
        <Col>
          <Select
            size="small"
            dropdownMatchSelectWidth={false}
            value={String(month)}
            onChange={(selectedMonth) => {
              const newValue = value.clone();
              newValue.month(parseInt(selectedMonth, 10));
              onChange(newValue);
            }}
          >
            {monthOptions}
          </Select>
        </Col>
      </Row>
    </div>
  );
};
const getListData = (value) => {
  let listData;

  switch (value.date()) {
    case 8:
      listData = [
        {
          id:0,
          type: 'warning',
          content: 'This is warning event.'
        },
        {
          id:1,
          type: 'success',
          content: 'This is usual event.'
        }
      ];
      break;

    case 10:
      listData = [
        {
          id:2,
          type: 'warning',
          content: 'This is warning event.'
        },
        {
          id:3,
          type: 'success',
          content: 'This is usual event.'
        },
        {
          id:4,
          type: 'error',
          content: 'This is error event.'
        }
      ];
      break;

    case 15:
      listData = [
        {
          id:5,
          type: 'warning',
          content: 'This is warning event'
        },
        {
          id:6,
          type: 'success',
          content: 'This is warning event'
        }
      ];
      break;

    default:
  }

  return listData || [];
};

export const AtdcCalendar2 = ({selectEmpl, onClickDetail}) => {
  const [selectDate, setSelectDate] = useState(moment());
  useEffect(() => {
    console.log(selectEmpl);
  }, []);

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const onSelectDate = (value) => {
    setSelectDate(value);
  };
  const onClickBack = () => {
    onClickDetail(0);
  };
  useEffect(() => {
    console.log(selectDate);
  }, [selectDate]);
  return (
    <>
      <FloatBtn onClickBack={onClickBack}/>
      <div className="site-calendar-customize-header-wrapper">
        <Calendar
          fullscreen
          locale={locale}
          headerRender={CustomHeader}
          onPanelChange={onPanelChange}
          value={selectDate}
          onSelect={onSelectDate}
          dateCellRender={dateCellRender}
        />
      </div>
    </>

  );
};

AtdcCalendar2.propTypes = {
  selectEmpl: PropTypes.number.isRequired,
  onClickDetail: PropTypes.func.isRequired
};

CustomHeader.propTypes = {
  value:PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.func])
  ).isRequired,
  onChange:PropTypes.func.isRequired,
};