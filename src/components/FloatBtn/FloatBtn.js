import React from 'react';
import {style} from './FloatBtnStyle';
import PropTypes from 'prop-types';
import {MdOutlineReplay} from 'react-icons/md';

export const FloatBtn = ({onClickBack}) => {
  return (
    <Container onClick={onClickBack}>
      <MdOutlineReplay size={25} color={'white'}/>
    </Container>
  );
};

const {
  Container,
} = style;

FloatBtn.propTypes = {
  onClickBack: PropTypes.func.isRequired,
};