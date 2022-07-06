import React from 'react';
import PropTypes from 'prop-types';
export const VacationViewPage = ({onClickVavDetail}) => {
  console.log(onClickVavDetail);
  return (
    <>안녕</>
  );
};

VacationViewPage.propTypes = {
  onClickVavDetail:PropTypes.func.isRequired,
};