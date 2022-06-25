import React from 'react';
import {style} from './MyProfileStyle';

// import { Card, Col, Row } from 'antd';
import Douzone from 'assets/myprofile.png';
import QR from 'assets/qr.png';
import Img from 'assets/myimg.jpg';
// import PropTypes from 'prop-types';

export const MyProfile = () => {
  return(
    <Container>
      <MyViewTop>
        <img id={'DouZoneImg'} alt="Douzone" src={Douzone} />
        <InquiryTitle>
          <Contents w={80} fs={15} fc={'#797979'}>성명</Contents>
          <Contents w={80} fs={15} fc={'#797979'}>사원 번호</Contents>
          <Contents w={90} fs={15} fc={'#797979'}>부서</Contents>
          <Contents w={80} fs={15} fc={'#797979'}>직급</Contents>
          <Contents w={200} fs={15} fc={'#797979'}>이메일</Contents>
          <Contents w={120} fs={15} fc={'#797979'}>본사/자사</Contents>
        </InquiryTitle>
        <InquiryContent>
          <Contents w={80} fs={20} fw={'bold'}>이상윤</Contents>
          <Contents w={80} fs={20} fw={'bold'}>20151107</Contents>
          <Contents w={90} fs={20} fw={'bold'}>영업 1팀</Contents>
          <Contents w={80} fs={20} fw={'bold'}>사원</Contents>
          <Contents w={200} fs={20} fw={'bold'}>sks1tpsks1tp@naver.com</Contents>
          <Contents w={120} fs={20} fw={'bold'}>서울</Contents>
        </InquiryContent>
      </MyViewTop>
      <MyViewBot>
        <BotContainer>
          <BotTitle>
            나의 QR코드
          </BotTitle>
          <BotContents>
            <MyImg alt={'QrCode'} src={QR}>
            </MyImg>
          </BotContents>

        </BotContainer>
        <BotContainer>
          <BotTitle>
            프로필 사진
          </BotTitle>
          <BotContents>
            <MyImg alt={'Img'} src={Img}>
            </MyImg>
          </BotContents>
        </BotContainer>
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
  BotContainer,
  MyImg,
  BotTitle,
  BotContents,
} = style;