import React, {useEffect, useState} from 'react';
import {style} from './MyProfileStyle';

import Douzone from 'assets/myprofile.png';
import QR from 'assets/qr.png';
import Img from 'assets/myimg.jpg';
import {useDispatch, useSelector} from 'react-redux';
import {SwpSavReq} from 'redux/actions/UserAction';
// import {useDispatch, useSelector} from "react-redux";
// import PropTypes from 'prop-types';

export const MyProfile = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.UserReducer);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    dispatch(SwpSavReq());
  }, []);

  useEffect(() => {
    if(selector?.name !== undefined) {
      setDetail(selector);
    }
  }, [selector]);
  return(
    <>
      {detail ? (
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
              <Contents w={80} fs={20} fw={'bold'}>{detail.name}</Contents>
              <Contents w={80} fs={20} fw={'bold'}>{detail.username}</Contents>
              <Contents w={90} fs={20} fw={'bold'}>{detail.department}</Contents>
              <Contents w={80} fs={20} fw={'bold'}>{detail.position}</Contents>
              <Contents w={200} fs={20} fw={'bold'}>{detail.email}</Contents>
              <Contents w={120} fs={20} fw={'bold'}>{detail.location}</Contents>
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
        </Container>) : <>에러</>}
    </>
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