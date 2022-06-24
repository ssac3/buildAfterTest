import React from 'react';
import {style} from './CheckboxStyle';

export const Checkbox = () => {
  return (
    <>
      <Container>
        <HiddenCheckBox type="checkbox" />
        <CheckBox >
          <Icon viewBox="0 0 24 24">
            <polyline points="19 7 10 17 5 12" />
          </Icon>
        </CheckBox>
      </Container>
    </>
  );
};

const { Container, HiddenCheckBox, CheckBox, Icon } = style;
