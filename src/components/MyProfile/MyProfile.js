import React from 'react';
import {style} from './MyProfileStyle';

// import { Card, Col, Row } from 'antd';
import Douzone from 'assets/myprofile.png';
import QR from 'assets/qr.png';
// import PropTypes from 'prop-types';

export const MyProfile = () => {
  return(
    <Container>
      <MyViewTop>
        <img id={'DouZoneImg'} alt="Douzone" src={Douzone} />
        <InquiryTitle>
          <Contents w={100}>성명</Contents>
          <Contents w={100}>사원 번호</Contents>
          <Contents w={100}>부서</Contents>
          <Contents w={100}>직급</Contents>
          <Contents w={200}>이메일</Contents>
          <Contents w={100}>본사 / 자사</Contents>
        </InquiryTitle>
        <InquiryContent>
          <Contents w={100}>이상윤</Contents>
          <Contents w={100}>20151107</Contents>
          <Contents w={100}>영업 1팀</Contents>
          <Contents w={100}>사원</Contents>
          <Contents w={200}>sks1tpsks1tp@naver.com</Contents>
          <Contents w={100}>서울</Contents>
        </InquiryContent>
      </MyViewTop>
      <MyViewBot>
        <MyQR w={40}>
          <MyQrImg>
            <img alt={'QrCode'} src={QR} />
          </MyQrImg>
        </MyQR>
        <MyImg>
        </MyImg>
      </MyViewBot>
    </Container>
  );
};

const {
  Container,
  MyViewTop,
  InquiryTitle,
  InquiryContent,
  Contents,
  MyViewBot,
  MyQR,
  MyImg,
  MyQrImg} = style;