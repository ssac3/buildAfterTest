// import React from 'react';
// import PropTypes from 'prop-types';
// import { Route, Redirect } from 'react-router-dom';
// import {LOCAL_STORAGE} from 'utils/constants';
// import {useDispatch} from 'react-redux';
// import {SwpDlrReq} from 'redux/actions/SignInAction';
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
// const getRoleText = (e) => {
//   let result;
//   switch(e.data) {
//     case '0':
//       result = 'ADMIN';
//       break;
//     case '1':
//       result = 'MANAGER';
//       break;
//     case '2':
//       result = 'USER';
//       break;
//     default:
//       break;
//   }
//   return result;
// };
// const PublicRoute = ({ Components: Component, restricted, ...rest }) => {
//   const dispatch = useDispatch();
//   const role = dispatch(SwpDlrReq());
//   console.log(role);
//   console.log(getRoleText(role));
//
//   return <Route
//     {...rest}
//     render={(props) => (IsLogin() && restricted ?
//       <Redirect to={getRoleText()} /> :
//       <Component {...props} />)}
//   />;
// };
//
// export default PublicRoute;
//
//
// PublicRoute.propTypes = {
//   Components: PropTypes.func.isRequired,
//   restricted: PropTypes.bool.isRequired,
// };
//
