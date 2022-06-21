import React from 'react';
import {style} from './AlertStyle';
import {MdOutlineError, MdOutlineClose} from 'react-icons/md';
import PropTypes from 'prop-types';

export const Alert = ({status}) => {
  return (
    <Container status={status}>
      <TextLayout>
        <MdOutlineError size={25}/>
        {status === 'success' ? '신규 사원을 성공적으로 등록했습니다.' : '에러가 발생했습니다. 다시 시도하세요.'}
      </TextLayout>
      <IconLayout>
        <MdOutlineClose size={25}/>
      </IconLayout>
    </Container>
  );
};

Alert.propTypes = {
  status:PropTypes.string.isRequired,
};

const {Container, TextLayout, IconLayout} = style;
