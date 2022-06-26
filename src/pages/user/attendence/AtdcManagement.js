import React from 'react';
import PropTypes from 'prop-types';
import AtdcCalendar from 'components/AtdcCalendar';
import locale from 'antd/es/calendar/locale/ko_KR';
import AtdcMonthly from 'components/AtdcMonthly';
import MyProfile from 'components/MyProfile';
import UpdatePw from 'components/UpdatePw';

export const AtdcManagement = ({selectedId}) => {
  console.log(selectedId);
  return (
    <div style={{width:'100%', height:'100%', padding:'20px'}}>
      {selectedId === 0 &&
        (
          <AtdcCalendar locale={locale}/>
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
};