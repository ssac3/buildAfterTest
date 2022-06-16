import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Navigation from 'components/Navigation';
import {ADMIN_MENU} from 'utils/constants/menuList';

export const EmpManagement = ({role}) => {
  return(
    <>
      <Header role={role}/>
      <Navigation role={role} menu={ADMIN_MENU}/>
    </>
  );
};

EmpManagement.propTypes = {
  role:PropTypes.string.isRequired,
};