import React from 'react';
import {style} from './ButtonGroupStyle';
import PropTypes from 'prop-types';

export const ButtonGroup = ({selectType, onClickType}) => {
  const onClickItem = (e) => {
    onClickType(e.target.id);
  };
  return (
    <Container>
      <Item id={'일별'} bgColor={selectType === '일별'} onClick={onClickItem}>일별</Item>
      <Item id={'월별'} bgColor={selectType === '월별'} onClick={onClickItem}>월별</Item>
    </Container>
  );
};

const {
  Container,
  Item,
} = style;

ButtonGroup.propTypes = {
  selectType:PropTypes.string.isRequired,
  onClickType: PropTypes.func.isRequired
};
