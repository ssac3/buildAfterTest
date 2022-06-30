// import React, {useEffect, useState} from 'react';
// import PropTypes from 'prop-types';
// import {EmpListItem} from '../EmpListItem/EmpListItem';

// export const EmpList = ({emps}) => {
//   return (
//     <ul>{emps?.map(emp => (
//       <EmpListItem emp={emp} key={emp.id}></EmpListItem>
//     ))}
//     </ul>
//   );
// };

// EmpList.propTypes = {
//   emps: PropTypes.arrayOf(
//     PropTypes.objectOf(
//       PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool])
//     )
//   ).isRequired,
// };