import React from 'react';
import {style} from './AttendenceMngmentStyle';
import Label from 'components/Label';
import {MdModeEditOutline} from 'react-icons/md';

const ListItemComponent = () => {
  return(
    <ListItemContainer>
      <ItemContainer>55555555</ItemContainer>
      <ItemContainer>홍길동</ItemContainer>
      <ItemContainer>2022.06.25</ItemContainer>
      <ItemContainer>시스템 오류</ItemContainer>
      <ItemContainer>09:00 ~ 18:00</ItemContainer>
      <ItemContainer>09:00 ~ --:--</ItemContainer>
      <ItemContainer><Label type={'반려'}/></ItemContainer>
      <ItemContainer>
        <IconLayout>
          <MdModeEditOutline size={20} />
        </IconLayout>
      </ItemContainer>
    </ListItemContainer>
  );
};


export const AttendenceMngment = () => {
  return (
    <Wrapper>
      <TitleContainer/>

      <Container>
        <ListContainer>
          <HeaderContainer>
            <InnerLayout>사원번호</InnerLayout>
            <InnerLayout>사원명</InnerLayout>
            <InnerLayout>조정 요청일</InnerLayout>
            <InnerLayout>사유</InnerLayout>
            <InnerLayout>요청 시간</InnerLayout>
            <InnerLayout>출/퇴근 시간</InnerLayout>
            <InnerLayout>상태</InnerLayout>
            <InnerLayout>수정</InnerLayout>
          </HeaderContainer>

          <ListItemComponent/>
        </ListContainer>
      </Container>
    </Wrapper>
  );
};

const {
  Wrapper,
  TitleContainer,
  Container,
  ListContainer,
  HeaderContainer,
  InnerLayout,
  ListItemContainer,
  ItemContainer,
  IconLayout,
} = style;