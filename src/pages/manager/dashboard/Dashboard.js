import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Navigation from 'components/Navigation';
import {MANAGER_MENU} from 'utils/constants/menuList';


export const Dashboard = ({role}) => {
  return(
    <>
      <Header role={role}/>
      <Navigation role={role} menu={MANAGER_MENU}/>

    </>
  );
};

Dashboard.propTypes = {
  role: PropTypes.string.isRequired,
};


