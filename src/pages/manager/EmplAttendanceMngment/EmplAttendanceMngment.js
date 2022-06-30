import React, {useState} from 'react';
import {style} from './EmplAttendanceMngmentStyle';
import ButtonGroup from 'components/ButtonGroup';

export const EmplAttendanceMngment = () => {
  const [selectType, setSelectType] = useState('일별');

  const onClickType = (target) => {
    setSelectType(target);
  };

  return (
    <Wrapper>
      <TitleContainer>
        <InnerContainer>
          <h2>사원별 근태 관리</h2>
          <ButtonGroup selectType={selectType} onClickType={onClickType}/>
        </InnerContainer>
      </TitleContainer>

      <Container>
        <ListContainer>
          <HeaderContainer>
            <InnerLayout>사원번호</InnerLayout>
            <InnerLayout>사원명</InnerLayout>
            <InnerLayout>이메일</InnerLayout>
            <InnerLayout>성별</InnerLayout>
            <InnerLayout>부서</InnerLayout>
            <InnerLayout>직급</InnerLayout>
            <InnerLayout>입사일</InnerLayout>
            <InnerLayout>상세보기</InnerLayout>
          </HeaderContainer>

        </ListContainer>
      </Container>
    </Wrapper>
  );
};

const {
  Wrapper,
  TitleContainer,
  InnerContainer,
  Container,
  ListContainer,
  HeaderContainer,
  InnerLayout,
} = style;