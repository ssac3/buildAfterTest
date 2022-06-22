import React from 'react';
import {style} from './AlertStyle';
import {MdOutlineError, MdOutlineClose} from 'react-icons/md';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {closeAlert} from 'redux/actions/AlertAction';

export const Alert = ({status, msg}) => {
  const dispatch = useDispatch();

  const onClickClose = () => {
    dispatch(closeAlert());
  };

  return (
    <Container status={status}>
      <TextLayout>
        <MdOutlineError size={25}/>
        {msg}
      </TextLayout>
      <IconLayout onClick={onClickClose}>
        <MdOutlineClose size={25}/>
      </IconLayout>
    </Container>
  );
};

Alert.propTypes = {
  status:PropTypes.string.isRequired,
  msg:PropTypes.string.isRequired,
};

const {Container, TextLayout, IconLayout} = style;
