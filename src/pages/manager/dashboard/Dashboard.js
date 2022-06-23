import React from 'react';
import PropTypes from 'prop-types';
import VacationMngment from 'pages/manager/VacationMngment';


export const Dashboard = ({selectedId}) => {
  // console.log(selectedId);
  return (
    <>
      {selectedId === 2 &&
        (
          <VacationMngment/>
        )}
    </>
  );
};

Dashboard.propTypes = {
  selectedId: PropTypes.number.isRequired,
};

