import React, {useEffect} from 'react';
import {MdOutlineClose} from 'react-icons/md';
import theme from 'styles/theme';
import {style} from './EmpDetailStyle';
import PropTypes from 'prop-types';

export const EmpDetail = ({emp}) => {
  useEffect(() => {
    console.log(emp);
  }, [emp]);
  return (
    <Wrap>
      <Container>
        <TextLayout>
          <CloseLayout>
            <MdOutlineClose size={25} style={{cursor: 'pointer'}}/>
          </CloseLayout>
          <h2>사원 상세 정보</h2>
          <h3>해당 사원의 상세 내역을 조회하고 수정합니다.</h3>
          <hr />
        </TextLayout>
        <InsertForm>
          <UserInfoWrap>
            <UserInfoLayout>
              <CaptionLayout>사원번호</CaptionLayout>
              <LabelLayout readOnly value={emp.username}/>
            </UserInfoLayout>
            <UserInfoLayout>
              <CaptionLayout>사원명</CaptionLayout>
              <LabelLayout value={emp.name}/>
            </UserInfoLayout>
          </UserInfoWrap>
          <UserProfileLayout/>
        </InsertForm>
        <UserInfoLayout2>
          <CaptionLayout >이메일</CaptionLayout>
          <CaptionLayout>성별</CaptionLayout>
          <LabelLayout readOnly value={emp.email}></LabelLayout>
          <LabelLayout value={emp.gender}></LabelLayout>
          <CaptionLayout>지사</CaptionLayout>
          <CaptionLayout>직급</CaptionLayout>
          <LabelLayout value={emp.location}></LabelLayout>
          <LabelLayout value={emp.position}></LabelLayout>
          <CaptionLayout>담당역할</CaptionLayout>
          <CaptionLayout>QR코드</CaptionLayout>
          <LabelLayout value={emp.role}></LabelLayout>
          <LabelLayout readOnly value={emp.qrPath}></LabelLayout>
          <CaptionLayout>부서</CaptionLayout>
          <div/>
          <LabelLayout value={emp.depId}/>
        </UserInfoLayout2>
        <ResultBtnLayout>
          <Btn color={theme.colorSet.SECONDARY.GRAY_BE}>닫기</Btn>
          <Btn color={theme.colorSet.SECONDARY.GRAY_79}>수정</Btn>
        </ResultBtnLayout>
      </Container>
    </Wrap>
  );
};
EmpDetail.propTypes = {
  emp: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
};
const {Wrap,
  Container,
  TextLayout,
  CloseLayout,
  InsertForm,
  UserInfoWrap,
  UserInfoLayout,
  UserProfileLayout,
  CaptionLayout,
  UserInfoLayout2,
  LabelLayout,
  ResultBtnLayout,
  Btn,
} = style;
