import React from 'react';
import PropTypes from 'prop-types';
import {style} from './VacationItemStyle';

export const VacationItem = ({vType, vApprovalFlag}) => {
  return (
    <Container>
      <EveningItem vType={vType} vApprovalFlag={Number(vApprovalFlag)}/>
      <AfternoonItem vType={vType} vApprovalFlag={Number(vApprovalFlag)}/>
    </Container>
  );
};

const {
  Container,
  EveningItem,
  AfternoonItem,
} = style;

VacationItem.propTypes = {
  vType: PropTypes.string.isRequired,
  vApprovalFlag:PropTypes.string.isRequired,
};