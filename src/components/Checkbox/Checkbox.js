import React from 'react';
import PropTypes from 'prop-types';
import {style} from './CheckboxStyle';

export const Checkbox = ({id, show, onClickCk, checked}) => {
  return (
    <Container show={show}>
      <HiddenCheckBox type="checkbox" />
      <CheckBox id={id} onClick={() => onClickCk(id)} checked={checked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="19 7 10 17 5 12" />
        </Icon>
      </CheckBox>
    </Container>
  );
};

const { Container, HiddenCheckBox, CheckBox, Icon } = style;

Checkbox.propTypes = {
  id:PropTypes.number.isRequired,
  show: PropTypes.string.isRequired,
  onClickCk: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};