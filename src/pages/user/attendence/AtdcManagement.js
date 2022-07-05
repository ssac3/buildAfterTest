// import React, {useEffect, useState} from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import AtdcCalendar from 'components/AtdcCalendar';
import locale from 'antd/es/calendar/locale/ko_KR';
import AtdcMonthly from 'components/AtdcMonthly';
import MyProfile from 'components/MyProfile';
import UpdatePw from 'components/UpdatePw';
// import {SwpDavReq} from 'redux/actions/UserAction';
// import {useDispatch, useSelector} from 'react-redux';
export const AtdcManagement = ({selectedId, onClickATD, onClickVD}) => {
  // const dispatch = useDispatch();
  // const selector = useSelector((state) => state.UserReducer);
  // const [attendanceData, setAttendanceData] = useState([]);
  // const month = '2022-6';
  // useEffect(() => {
  //   dispatch(SwpDavReq(month));
  // }, []);

  // useEffect(() => {
  //   if(selector.data?.length > 0) {
  //     setAttendanceData(selector.data);
  //   }
  // }, [selector]);
  return (
    <div style={{width:'100%', height:'100%', padding:'20px'}}>
      {selectedId === 0 &&
        (
          // <AtdcCalendar locale={locale} attendance={attendanceData}/>
          <AtdcCalendar locale={locale} onClickATD={onClickATD} onClickVD={onClickVD}/>
        )}

      {selectedId === 1 &&
        (
          <AtdcMonthly></AtdcMonthly>
        )}

      {selectedId === 2 &&
        (
          <MyProfile />
        )}

      {selectedId === 3 &&
        (
          <UpdatePw />
        )}

    </div>
  );
};

AtdcManagement.propTypes = {
  selectedId:PropTypes.number.isRequired,
  onClickATD:PropTypes.func.isRequired,
  onClickVD:PropTypes.func.isRequired,
};