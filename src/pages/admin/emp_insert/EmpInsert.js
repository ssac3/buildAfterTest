import React from 'react';
import theme from 'styles/theme';
import {style} from './EmpInsertStyle';
import {MdOutlineClose} from 'react-icons/md';

export const EmpInsert = () => {
  return (
    <Wrap>
      <Container>
        <TextLayout>
          <CloseLayout>
            <MdOutlineClose size={25} style={{cursor: 'pointer'}}/>
          </CloseLayout>
          <h2>신규 사원 등록</h2>
          <h3>신규 사원을 등록하고 QR코드를 자동으로 생성합니다.</h3>
          <hr />
        </TextLayout>
        <InsertForm>
          <UserInfoWrap>
            <UserInfoLayout>
              <CaptionLayout>
                사원번호
                <BtnLayout>생성</BtnLayout>
              </CaptionLayout>
              <LabelLayout />
            </UserInfoLayout>
            <UserInfoLayout>
              <CaptionLayout>
                사원명
              </CaptionLayout>
              <LabelLayout/>
            </UserInfoLayout>
          </UserInfoWrap>
          <UserProfileLayout/>
        </InsertForm>
        <UserInfoLayout2>
          <CaptionLayout >이메일
            <BtnLayout>생성</BtnLayout>
          </CaptionLayout>
          <CaptionLayout>성별</CaptionLayout>
          <LabelLayout/>
          <LabelLayout/>
          <CaptionLayout>지사</CaptionLayout>
          <CaptionLayout>직급</CaptionLayout>
          <LabelLayout/>
          <LabelLayout/>
          <CaptionLayout>담당역할</CaptionLayout>
          <CaptionLayout>QR코드
            <BtnLayout>생성</BtnLayout>
          </CaptionLayout>
          <LabelLayout/>
          <LabelLayout/>
          <CaptionLayout>부서</CaptionLayout>
          <div/>
          <LabelLayout/>
        </UserInfoLayout2>
        <ResultBtnLayout>
          <Btn color={theme.colorSet.SECONDARY.GRAY_BE}>취소</Btn>
          <Btn color={theme.colorSet.SECONDARY.GRAY_79}>확인</Btn>
        </ResultBtnLayout>
      </Container>
    </Wrap>
  );
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
  BtnLayout,
  LabelLayout,
  ResultBtnLayout,
  Btn,
} = style;

