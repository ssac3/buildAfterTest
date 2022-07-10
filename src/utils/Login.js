// import React from 'react';
// import PropTypes from 'prop-types';
// import { Route, Redirect } from 'react-router-dom';
// import {LOCAL_STORAGE} from 'utils/constants';
//
// const IsLogin = () => {
//   const access = LOCAL_STORAGE.get('Authorization');
//   const refresh = LOCAL_STORAGE.get('Refresh_token');
//   console.log(access, refresh);
//   if (access || refresh) {
//     return true;
//   }
//   return false;
// };
//
// export const PublicRoute = ({ Components: Component, restricted, ...rest }) => {
//   return <Route {...rest} render={(props) => (IsLogin() && restricted ? <Redirect to="/" /> : <Component {...props} />)} />;
// };
//
// // export const PrivateRoute = ({ component: Component, ...rest }) => {
// //   return <Route {...rest} render={(props) => (IsLogin() ?
// //   <Component {...props} /> : <Redirect to="/login" />)} />;
// // };
//
// PublicRoute.propTypes = {
//   Components: PropTypes.func.isRequired,
//   restricted: PropTypes.bool.isRequired,
// };