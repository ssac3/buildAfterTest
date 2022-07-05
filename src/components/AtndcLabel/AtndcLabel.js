import React from 'react';
import PropTypes from 'prop-types';
import {style} from './AtndcLabelStyle';
import theme from 'styles/theme';
export const AtndcLabel = ({status}) => {
  const cnvrtStatus = (target) => {
    let [text, color] = '';
    if(target !== null) {
      switch(target) {
        case '0':
          text = '정상';
          color = theme.colorSet.ATTENDANCE_STATUS.OK;
          break;
        case '1':
          text = '지각';
          color = theme.colorSet.ATTENDANCE_STATUS.LATE;
          break;
        default:
          text = '결근';
          color = theme.colorSet.ATTENDANCE_STATUS.ABSENCE;
          break;
      }
    }
    return {text, color};
  };

  const cnvrtVacationStatus = (vType, vStatus) => {
    let [text, color] = '';
    if(vType !== null && vStatus !== null) {
      switch(vType) {
        case '0':
          text = '전일 휴가';
          break;
        case '1':
          text = '오전 휴가';
          break;
        default:
          text = '오후 휴가';
          break;
      }

      switch (vStatus) {
        case '0':
          color = theme.colorSet.APPROVAL_STATUS.WAITING;
          break;
        case '1':
          color = theme.colorSet.ATTENDANCE_STATUS.VACATION;
          break;
        case '2':
          color = theme.colorSet.APPROVAL_STATUS.REJECT;
          break;
        default:
          color = theme.colorSet.SECONDARY.GRAY_CC;
          break;
      }
    }
    return {text, color};
  };
  return (
    <>
      {status?.status !== null &&
        <Container bgColor={cnvrtStatus(status.status).color}>
          {cnvrtStatus(status.status).text}
        </Container>}
      {status?.vStatus !== null &&
        <Container bgColor={cnvrtVacationStatus(status.vType, status.vStatus).color}>
          {cnvrtVacationStatus(status.vType, status.vStatus).text}
        </Container>}
    </>
  );
};

const {
  Container,
} = style;

AtndcLabel.propTypes = {
  status: PropTypes.objectOf(PropTypes.string).isRequired,
};