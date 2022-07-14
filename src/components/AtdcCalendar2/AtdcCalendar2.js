import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import 'components/AtdcCalendar/index.css';
import {Calendar, Col, Row, Select, Badge} from 'antd';
import locale from 'antd/es/calendar/locale/ko_KR';
import moment from 'moment';
import FloatBtn from 'components/FloatBtn';
import {useDispatch, useSelector} from 'react-redux';
import {SwpEadReq} from 'redux/actions/ManagerAction';
import VacationItem from 'components/VacationItem';

const getFindMonth = (date) => {
  const findYear = (date.year()).toString();
  const findMonth = (date.month() + 1).toString().length > 1 ? (date.month() + 1).toString() : '0'.concat((date.month() + 1).toString());
  return findYear.concat('-').concat(findMonth);
};
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
        display       : 'flex',
        justifyContent: 'space-between',
        padding       : 10
      }}
    >
      <div style={{width:'230px', display:'flex', justifyContent:'space-around'}} >
        <Badge status={'success'} text={'정상'}/>
        <Badge status={'warning'} text={'지각'}/>
        <Badge status={'error'} text={'결근'}/>
        <Badge color={'#0FC6C2'} text={'휴가'}/>
        <Badge color={'#CCCCCC'} text={'요청'}/>
      </div>
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
const getListData = (value, infos) => {
  let listData;
  if (infos.length > 0) {
    listData = infos.filter(
      (v) => (moment(v.date).month() === value.month() && moment(v.date).date() === value.date()) ||
        (moment(v.vDate).month() === value.month() && moment(v.vDate).date() === value.date())
    );
  }
  return listData || [];
};

export const AtdcCalendar2 = ({selectEmpl, onClickDetail, onClickEadDetail}) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.MangerReducer);
  const [selectDate, setSelectDate] = useState(moment());
  const [findDate, setFindDate] = useState(selectDate);
  const [infos, setInfos] = useState([]);
  useEffect(() => {
    dispatch(SwpEadReq(selectEmpl, getFindMonth(selectDate)));
  }, [findDate]);

  useEffect(() => {
    if (selector.data?.length > 0 && selector.data[0].date !== undefined) {
      setInfos(selector.data);
    } else {
      setInfos([]);
    }
  }, [selector]);
  const dateCellRender = (value) => {
    const listData = getListData(value, infos);
    const getStatus = (status) => {
      let result;
      switch (status) {
        case '0':
          result = 'success';
          break;
        case '1':
          result = 'warning';
          break;
        case '2':
          result = 'error';
          break;
        default:
          result = 'default';
          break;
      }
      return result;
    };

    const convertTime = (startTime, endTime) => {
      let result;
      if(startTime === null && endTime === null) {
        result = '';
      } else if(startTime === null && endTime !== null) {
        result = ' '.concat(' / ').concat(endTime);
      } else if(startTime !== null && endTime === null) {
        result = startTime.concat(' / ');
      } else {
        result = startTime.concat(' / ').concat(endTime);
      }
      return result;
    };

    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge
              status={item.status && getStatus(item.status)}
              text={convertTime(item.startTime, item.endTime)}
            />
            {item.vType !== null &&
              <VacationItem
                vType={item.vType}
                vApprovalFlag={item.vApprovalFlag}
              />}
          </li>
        ))}
      </ul>
    );
  };
  const onPanelChange = (value) => {
    setFindDate(value);
  };
  const onSelectDate = (value) => {
    const filterData = infos.filter(
      (v) => (moment(v.date).month() === value.month() && moment(v.date).date() === value.date()) ||
        (moment(v.vDate).month() === value.month() && moment(v.vDate).date() === value.date())
    );
    onClickEadDetail(filterData);
    setSelectDate(value);
  };
  const onClickBack = () => {
    onClickDetail(0);
  };

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
  selectEmpl   : PropTypes.number.isRequired,
  onClickDetail: PropTypes.func.isRequired,
  onClickEadDetail: PropTypes.func.isRequired,
};

CustomHeader.propTypes = {
  value   : PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.func])
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};