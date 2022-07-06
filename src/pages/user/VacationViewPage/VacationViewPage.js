import React from 'react';
import PropTypes from 'prop-types';
import {style} from './VacationViewPageStyle';

export const VacationViewPage = ({onClickVavDetail}) => {
  const onCloseModal = () => {
    onClickVavDetail([]);
  };

  return (
    <Wrapper onClick={onCloseModal}>
      <Container onClick={(e) => e.stopPropagation()}>
        <TextLayout>
          <h2>휴가 조회 / 취소</h2>
          <h3>해당 날짜의 휴가를 조회하거나 취소합니다.</h3>
        </TextLayout>
      </Container>
    </Wrapper>
  );
};

const {
  Wrapper,
  Container,
  TextLayout,
} = style;


VacationViewPage.propTypes = {
  onClickVavDetail:PropTypes.func.isRequired,
};
