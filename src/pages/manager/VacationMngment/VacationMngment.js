import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {style} from './VacationMngmentStyle';
import { Calendar } from 'antd';
import {MdSearch, MdCalendarToday} from 'react-icons/md';

const InputComponent = ({type}) => {
  const [open, setOpen] = useState(false);
  const onClickCalendar = () => {
    setOpen(!open);
  };

  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return(
    <SearchContainer>
      {type === 'text' &&
        <MdSearch size={25} color={'white'}/> }
      <SearchInput/>
      {type === 'date' &&
        <MdCalendarToday
          size={25}
          color={'white'}
          onClick={onClickCalendar}
          style={{cursor:'pointer'}}
        />}
      {open &&
        <Calendar
          fullscreen={false}
          onPanelChange={onPanelChange}
          style={{width:300, position:'absolute', left:0, top:45, zIndex:1}}
        />}
    </SearchContainer>
  );
};

const ListItemComponent = () => {
  return(
    <ListItemContainer>
      <ItemContainer>54142910</ItemContainer>
      <ItemContainer>사원</ItemContainer>
      <ItemContainer>2022-06-22</ItemContainer>
      <ItemContainer>전일 휴가</ItemContainer>
      <ItemContainer>개인 사유</ItemContainer>
      <ItemContainer>승인 대기</ItemContainer>
      <ItemContainer><DetailBtnComponent/></ItemContainer>
    </ListItemContainer>
  );
};

const DetailBtnComponent = () => {
  return(
    <BtnContainer>상세보기</BtnContainer>
  );
};
export const VacationMngment = () => {
  return (
    <Wrapper>
      <TitleContainer/>

      <Container>
        <ListContainer>
          <HeaderContainer>
            <InnerLayout>사원번호</InnerLayout>
            <InnerLayout>사원명</InnerLayout>
            <InnerLayout>휴가 신청일</InnerLayout>
            <InnerLayout>휴가 종류</InnerLayout>
            <InnerLayout>신청 사유</InnerLayout>
            <InnerLayout>상태</InnerLayout>
            <InnerLayout>세부 사항</InnerLayout>
            <InnerLayout><InputComponent type={'text'}/></InnerLayout>
            <InnerLayout><InputComponent type={'text'}/></InnerLayout>
            <InnerLayout><InputComponent type={'date'}/></InnerLayout>
            <InnerLayout>드롭박스</InnerLayout>
            <InnerLayout><InputComponent type={'text'}/></InnerLayout>
            <InnerLayout><InputComponent type={'text'}/></InnerLayout>
            <InnerLayout>-</InnerLayout>
          </HeaderContainer>

          <ListItemComponent/>
          <ListItemComponent/>
          <ListItemComponent/>
          <ListItemComponent/>
        </ListContainer>

      </Container>

    </Wrapper>
  );
};

const {
  Wrapper,
  Container,
  ListContainer,
  TitleContainer,
  HeaderContainer,
  InnerLayout,
  SearchContainer,
  SearchInput,
  ListItemContainer,
  ItemContainer,
  BtnContainer,
} = style;

InputComponent.propTypes = {
  type:PropTypes.string.isRequired,
};