import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Navigation from 'components/Navigation';
import {USER_MENU} from 'utils/constants/menuList';

export const AtdcManagement = ({role}) => {
  return (
    <>
      <Header role={role}/>
      <Navigation role={role} menu={USER_MENU}/>
    </>
  );
};

AtdcManagement.propTypes = {
  role: PropTypes.string.isRequired,
};
