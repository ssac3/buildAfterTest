import React from 'react';
import PropTypes from 'prop-types';
import {style} from './ToastStyle';

export const Toast = ({name}) => {
  return (
    <Container>{name}님 반갑습니다! 오늘도 좋은 하루되세요.</Container>
  );
};

const {Container} = style;

Toast.propTypes = {
  name: PropTypes.string.isRequired,
};