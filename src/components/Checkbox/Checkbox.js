import React from 'react';
import PropTypes from 'prop-types';
import {style} from './CheckboxStyle';

export const Checkbox = ({show}) => {
  return (
    <Container show={show}>
      <HiddenCheckBox type="checkbox" />
      <CheckBox >
        <Icon viewBox="0 0 24 24">
          <polyline points="19 7 10 17 5 12" />
        </Icon>
      </CheckBox>
    </Container>
  );
};

const { Container, HiddenCheckBox, CheckBox, Icon } = style;

Checkbox.propTypes = {
  show: PropTypes.string.isRequired,
};