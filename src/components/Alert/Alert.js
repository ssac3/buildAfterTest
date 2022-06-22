import React from 'react';
import {style} from './AlertStyle';
import {MdOutlineError, MdOutlineClose} from 'react-icons/md';
import PropTypes from 'prop-types';

export const Alert = ({type, msg}) => {
  return (
    <Container status={type}>
      <TextLayout>
        <MdOutlineError size={25}/>
        {type === 'success' ? msg : '에러가 발생했습니다. 다시 시도하세요.'}
      </TextLayout>
      <IconLayout>
        <MdOutlineClose size={25}/>
      </IconLayout>
    </Container>
  );
};

Alert.propTypes = {
  type:PropTypes.string.isRequired,
  msg:PropTypes.string.isRequired,
};

const {Container, TextLayout, IconLayout} = style;
