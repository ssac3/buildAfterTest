import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {SwpAtvReq} from 'redux/actions/ManagerAction';
import VacationMngment from 'pages/manager/VacationMngment';
import AttendenceMngment from 'pages/manager/AttendenceMngment';
import {useDispatch} from 'react-redux';
import {LOCAL_STORAGE} from 'utils/constants';
import EmplAttendanceMngment from 'pages/manager/EmplAttendanceMngment';


export const Dashboard = ({selectedId, onClickATR, onClickEadDetail, onClickEamDetail}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SwpAtvReq(LOCAL_STORAGE.get('depId')));
  }, []);

  const renderUI = React.useMemo(() => {
    if (selectedId === 2) {
      return <VacationMngment/>;
    }
    if (selectedId === 3) {
      return <AttendenceMngment
        onClickATR={onClickATR}
      />;
    }
    if(selectedId === 4) {
      return <EmplAttendanceMngment
        onClickEadDetail={onClickEadDetail}
        onClickEamDetail={onClickEamDetail}
      />;
    }
    return <></>;
  }, [selectedId]);

  return renderUI;
};

Dashboard.propTypes = {
  selectedId: PropTypes.number.isRequired,
  onClickATR: PropTypes.func.isRequired,
  onClickEadDetail: PropTypes.func.isRequired,
  onClickEamDetail: PropTypes.func.isRequired,
};

