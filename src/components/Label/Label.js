import React from 'react';
import PropTypes from 'prop-types';
import {style} from './LabelStyle';

export const Label = ({type}) => {
  let color;
  if (type === '요청') {
    color = 'blue';
  } else {
    color = type === '승인' ? 'green' : 'red';
  }
  return (
    <Container color={color}>{type}</Container>
  );
};

Label.propTypes = {
  type: PropTypes.string.isRequired,
};

const {Container} = style;