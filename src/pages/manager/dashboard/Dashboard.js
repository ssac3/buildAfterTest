import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {SwpAtvReq} from 'redux/actions/ManagerAction';
import VacationMngment from 'pages/manager/VacationMngment';
import AttendenceMngment from 'pages/manager/AttendenceMngment';
import {useDispatch} from 'react-redux';
import {LOCAL_STORAGE} from 'utils/constants';
import EmplAttendanceMngment from 'pages/manager/EmplAttendanceMngment';
import ReportEmvPage from 'pages/manager/ReportEmvPage';

export const Dashboard = ({
  selectedId,
  onClickATR,
  onClickEadDetail,
  onClickEamDetail,
  findYear,
  onClickFindYear,
  onClickEavDetail,
  findDate,
  onClickFindDate}) => {
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
        findYear={findYear}
        onClickFindYear={onClickFindYear}
      />;
    }
    if(selectedId === 6) {
      return <ReportEmvPage
        onClickEavDetail={onClickEavDetail}
        findDate={findDate}
        onClickFindDate={onClickFindDate}
      />;
    }
    return <></>;
  }, [selectedId, findYear]);

  return renderUI;
};

Dashboard.propTypes = {
  selectedId: PropTypes.number.isRequired,
  onClickATR: PropTypes.func.isRequired,
  onClickEadDetail: PropTypes.func.isRequired,
  onClickEamDetail: PropTypes.func.isRequired,
  findYear:PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func])
  ).isRequired,
  onClickFindYear:PropTypes.func.isRequired,
  onClickEavDetail:PropTypes.func.isRequired,
  findDate:PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func])
  ).isRequired,
  onClickFindDate:PropTypes.func.isRequired,
};

