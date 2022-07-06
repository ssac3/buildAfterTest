import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './index.css';
import {Badge, Calendar, Col, Row, Select} from 'antd';
import VacationItem from 'components/VacationItem';
import locale from 'antd/es/calendar/locale/ko_KR';
import {useDispatch, useSelector} from 'react-redux';
import {SwpDavReq} from 'redux/actions/UserAction';
import moment from 'moment';

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
        justifyContent: 'flex-end',
        padding       : 8
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
export const AtdcCalendar = ({onClickDavDetail, onClickVaeDetail, onClickVavDetail}) => {
  const selector = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const [selectDate, setSelectDate] = useState(moment());
  const [findDate, setFindDate] = useState(selectDate);
  const [getData, setGetData] = useState([]);
  const today = moment();
  const initOpen = () => {
    onClickVaeDetail('');
    onClickDavDetail([]);
  };

  useEffect(() => {
    initOpen();
    dispatch(SwpDavReq(getFindMonth(selectDate)));
  }, [findDate]);

  useEffect(() => {
    if (selector.data?.length > 0) {
      setGetData(selector.data);
    }
  }, [selector]);


  const getListData = (value, infos) => {
    let listData;
    if (infos.length > 0) {
      listData = infos.filter(
        (v) => (moment(v.aDate).month() === value.month()
            && moment(v.aDate).date() === value.date())
          ||
          (moment(v.vDate).month() === value.month()
            && moment(v.vDate).date() === value.date())
      );
    }
    return listData || [];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value, getData);
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

    const cnvrtTime = (time) => {
      return time?.substring(0, 5);
    };
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item?.aDate}>
            <Badge
              status={item.aStatus && getStatus(item.aStatus)}
              text={cnvrtTime(item?.aStartTime)?.concat(' / ').concat(cnvrtTime(item?.aEndTime))}
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

  const onSelectDate = (value) => {
    if (today.isBefore(value)) { // 미래 선택
      const filterInfo = getData?.filter((v) => v.vDate === value.format('YYYY-MM-DD'));
      if (filterInfo.length > 0) {
        if(filterInfo[0].vApprovalFlag === '0') {
          console.log(filterInfo[0]);
          onClickVavDetail(filterInfo);
        } else {
          onClickDavDetail(filterInfo);
        }
      } else {
        onClickVaeDetail(value);
      }
    } else { // 과거 선택
      const filterInfo = getData?.filter((v) => v.aDate === value.format('YYYY-MM-DD'));
      onClickDavDetail(filterInfo);
    }
    setSelectDate(value);
  };

  const onPanelChange = (value) => {
    setFindDate(value);
  };


  return (
    <>
      <div className="site-calendar-customize-header-wrapper">
        <Calendar
          fullscreen
          locale={locale}
          headerRender={CustomHeader}
          onPanelChange={onPanelChange}
          value={selectDate || null}
          onSelect={onSelectDate}
          dateCellRender={dateCellRender}
        />
      </div>
    </>
  );
};
AtdcCalendar.propTypes = {
  onClickDavDetail: PropTypes.func.isRequired,
  onClickVaeDetail: PropTypes.func.isRequired,
  onClickVavDetail: PropTypes.func.isRequired,
};
CustomHeader.propTypes = {
  value   : PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.func])
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};
