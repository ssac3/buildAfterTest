import React from 'react';
import PropTypes from 'prop-types';
import VacationMngment from 'pages/manager/VacationMngment';
import AttendenceMngment from 'pages/manager/AttendenceMngment';


export const Dashboard = ({selectedId}) => {
  // console.log(selectedId);
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

