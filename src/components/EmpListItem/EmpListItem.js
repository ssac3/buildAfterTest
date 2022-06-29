import React from 'react';
import {style} from './EmpListItemStyle';
import PropTypes from 'prop-types';


export const EmpListItem = ({emp}) => {
  const {username} = emp;
  const {name} = emp;
  const {email} = emp;
  const {gender} = emp;
  const {deptname} = emp;
  const {position} = emp;


  return(
    <ListData>
      <ListItem w={130}>{username}</ListItem>
      <ListItem w={140}>{name}</ListItem>
      <ListItem w={210}>{email}</ListItem>
      <ListItem w={90}>{gender}</ListItem>
      <ListItem w={200}>{deptname}</ListItem>
      <ListItem w={70}>{position}</ListItem>
      <ListItem w={100}>
        <BtnLayout w={50} value="detailBtn">보기</BtnLayout>
      </ListItem>
    </ListData>
  );
};

const {ListData, ListItem, BtnLayout} = style;

EmpListItem.propTypes = {
  emp: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool])
    )
  ).isRequired,
};