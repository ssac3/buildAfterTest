import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import AtdcCalendar from 'components/AtdcCalendar';
import locale from 'antd/es/calendar/locale/ko_KR';
import AtdcMonthly from 'components/AtdcMonthly';
import MyProfile from 'components/MyProfile';
import UpdatePw from 'components/UpdatePw';
import {SwpDavReq} from '../../../redux/actions/UserAction';
import {useDispatch} from 'react-redux';

export const AtdcManagement = ({selectedId}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('AtdcManagement 시작');
    console.log(dispatch(SwpDavReq()));
  }, []);
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