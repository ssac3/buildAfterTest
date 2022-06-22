import React, {useState} from 'react';
import Search from 'components/Search';
import {EmpList} from '../../../components/EmpList/EmpList';



export const EmpManagement = () => {
  // setEmps해주기 쓰려면~
  const [emps] = useState([
    {
      id: 1,
      username: '김윤지',
      checked: true,
    },
    {
      id: 2,
      text: '박채연',
      checked: true,
    },
    {
      id: 3,
      text: '하성록',
      checked: false,
    },
  ]);

  return(
    <>
      <Search/>
      <EmpList emps={emps}/>
    </>
  );
};