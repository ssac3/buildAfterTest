import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {checkValidURL, getCurrentUser} from './auth';
// import {API} from 'utils/constants';

export const PublicRoute = ({restricted, children, ...rest}) => {
  console.log('getCurrentUSer', getCurrentUser());
  console.log('checkValidURL', checkValidURL());
  console.log('로그인 화면만');
  // console.log(!getCurrentUser() && checkValidURL() === '/');
  return (
    <Route {...rest}>
      <Redirect to={checkValidURL()}/>
      {children}
    </Route>
  );
};

export function PrivateRoute({children, ...rest}) {
  console.log('getCurrentUSer', getCurrentUser());
  console.log('checkValidURL', checkValidURL());
  console.log('filterURL', checkValidURL().filter((v) => v === window.location.pathname));
  const filterURL = checkValidURL().filter((v) => v === window.location.pathname)[0];

  if (getCurrentUser() === false || filterURL === undefined) {
    return (
      <Route {...rest}>
        <Redirect to={checkValidURL()[0]}/>
        {children}
      </Route>
    );
  }
  if(getCurrentUser() && filterURL) {
    return (
      <Route {...rest}>
        <Redirect to={filterURL}/>
        {children}
      </Route>
    );
  }
}

PublicRoute.propTypes = {
  restricted: PropTypes.bool.isRequired,
  children:PropTypes.element.isRequired,
};

PrivateRoute.propTypes = {
  children:PropTypes.element.isRequired,
};
