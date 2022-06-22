import React from 'react';
import {style} from './EmpListItemStyle';

export const EmpListItem = (emp) => {
  const {text} = emp;
  return(
    <Container>
      <CheckContainer>❤
        <TextContainer>{text}</TextContainer>
      </CheckContainer>
      <RemoveContainer>🏝</RemoveContainer>
    </Container>
  );
};

const {Container, CheckContainer, TextContainer, RemoveContainer} = style;