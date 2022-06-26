import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {SwpAtvReq} from 'redux/actions/ManagerAction';
import VacationMngment from 'pages/manager/VacationMngment';
import AttendenceMngment from 'pages/manager/AttendenceMngment';
import {useSelector, useDispatch} from 'react-redux';


export const Dashboard = ({selectedId}) => {
  const selector = useSelector((state) => state.SignInReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SwpAtvReq(selector.data?.depId));
  }, []);

  return (
    <>
      {selectedId === 2 &&
        (
          <VacationMngment/>
        )}
      {selectedId === 3 && (
        <AttendenceMngment/>
      )}
    </>
  );
};

Dashboard.propTypes = {
  selectedId: PropTypes.number.isRequired,
};

