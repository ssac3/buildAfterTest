import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './index.css';
import {Badge, Calendar, Col, Row, Select} from 'antd';
import locale from 'antd/es/calendar/locale/ko_KR';
import {useDispatch, useSelector} from 'react-redux';
// import {style} from './AtdcCalendarStyle';
import {SwpDavReq} from 'redux/actions/UserAction';
import moment from 'moment';
import FloatBtn from '../FloatBtn';

// const ListItemComponent = () => {
//   return(
//     <ListItemContainer>
//     </ListItemContainer>
//   );
// };

const getFindMonth = (date) => {
  console.log(date);
  const findYear = (date.year()).toString();
  const findMonth = (date.month() + 1).toString().length > 1 ? (date.month() + 1).toString() : '0'.concat((date.month() + 1).toString());
  console.log(findYear.concat('-').concat(findMonth));
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
export const AtdcCalendar = ({onClickATD, onClickVD}) => {
  const selector = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const [selectDate, setSelectDate] = useState(moment());
  const [findDate, setFindDate] = useState(selectDate);
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    dispatch(SwpDavReq(getFindMonth(selectDate)));
  }, [findDate]);
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
        }
      }
    }
    return listData || [];
  };
  const dateCellRender = (value) => {
    useEffect(() => {
    }, []);
    const listData = getListData(value);
    const getDetail = (val) => {
      console.log(val);
    };

    // const onClickDate = () => {
    //   console.log('testtest');
    // };
    return (
      <ul type={'button'} className="events">
        {listData.map((item) => (
          <li key={item.content}>
            { item.vacation !== null && item.content === '출근 정보 없음' ?
              null : <Badge status={item.type} text={item.content} onClick={getDetail}/>}
            { item.approval === '1' ? <Badge className={'approve'} status={''} text={item.vacation}></Badge> : <Badge className={'denied'} status={''} text={item.vacation}></Badge>}
          </li>
        ))}
      </ul>
    );
  };
  const onPanelChange = (value) => {
    console.log(value);
    setFindDate(value);
  };

  const onSelectDate = (value) => {
    const aresult = getData.filter(v => v.aDate === value.format('YYYY-MM-DD'));
    console.log(aresult);
    onClickATD(aresult);
    if(aresult?.length === 0) {
      const vresult = getData.filter(v => v.vDate === value.format('YYYY-MM-DD'));
      console.log(vresult);
      if(vresult?.length === 0) {
        console.log(vresult);
        onClickVD([{vId:null}]);
      }else onClickVD(vresult);
    }
    console.log(onClickVD);
    setSelectDate(value);
  };
  return (
    <>
      <FloatBtn/>
      <div className="site-calendar-customize-header-wrapper">
        <Calendar
          fullscreen
          locale={locale}
          headerRender={CustomHeader}
          onPanelChange={onPanelChange}
          value={selectDate}
          onSelect={onSelectDate}
          dateCellRender={(value) => dateCellRender(value, getData)}
        />
      </div>
    </>
  );
};
// const {
//   ListItemContainer,
// } = style;
// AtdcCalendar.propTypes = {
//   attendanceData:PropTypes.arrayOf(
//     PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
//   ).isRequired,
//
// };
AtdcCalendar.propTypes = {
  onClickATD: PropTypes.func.isRequired,
  onClickVD:PropTypes.func.isRequired,
};
CustomHeader.propTypes = {
  value   : PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.func])
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};
