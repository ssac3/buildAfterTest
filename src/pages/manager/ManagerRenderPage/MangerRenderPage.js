import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {SwpAtvReq} from 'redux/actions/ManagerAction';
import Dashboard from 'pages/manager/dashboard';
import VacationMngment from 'pages/manager/VacationMngment';
import AttendenceMngment from 'pages/manager/AttendenceMngment';
import {useDispatch} from 'react-redux';
import {LOCAL_STORAGE} from 'utils/constants';
import EmplAttendanceMngment from 'pages/manager/EmplAttendanceMngment';
import ReportEmvPage from 'pages/manager/ReportEmvPage';
import EovPage from 'pages/manager/EovPage';

export const MangerRenderPage = ({
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
    if(selectedId === 0) {
      return <Dashboard/>;
    }
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

    if(selectedId === 7) {
      return <EovPage/>;
    }
    return <></>;
  }, [selectedId, findYear, findDate]);

  return renderUI;
};

MangerRenderPage.propTypes = {
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

