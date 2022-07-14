import React, {useEffect, useState} from 'react';
import {style} from './MyProfileStyle';
import Douzone from 'assets/myprofile.png';
import {useDispatch, useSelector} from 'react-redux';
import {SwpSairReq, SwpSavReq} from 'redux/actions/UserAction';
import { saveAs } from 'file-saver';

export const MyProfile = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.UserReducer);
  const [detail, setDetail] = useState({});
  const [myImg, setmyImg] = useState(null);
  const onChangeImg = (e) => {
    if(e.target.files) {
      const uploadFile = e.target.files[0];
      const formData = new FormData();
      formData.append('image', uploadFile);
      setmyImg(formData);
    }
  };
  useEffect(() => {
    dispatch(SwpSavReq());
  }, []);

  useEffect(() => {
    if(selector?.name !== undefined) {
      setDetail(selector);
    }
  }, [selector]);

  useEffect(() => {
    if(myImg !== null) {
      dispatch(SwpSairReq(myImg));
    }
  }, [myImg]);

  const onSaveFile = (e) => {
    saveAs(e.target.id, detail.username.concat('.png'));
  };

  return(
    <>
      {detail ? (
        <Container>
          <MyViewTop>
            <img id={'DouZoneImg'} alt="Douzone" src={Douzone} />
            <InquiryTitle>
              <Contents w={100} fs={15} fc={'#797979'}>성명</Contents>
              <Contents w={100} fs={15} fc={'#797979'}>사원 번호</Contents>
              <Contents w={100} fs={15} fc={'#797979'}>부서</Contents>
              <Contents w={100} fs={15} fc={'#797979'}>직급</Contents>
              <Contents w={200} fs={15} fc={'#797979'}>이메일</Contents>
              <Contents w={120} fs={15} fc={'#797979'}>본사/자사</Contents>
            </InquiryTitle>
            <InquiryContent>
              <Contents w={100} fs={20} fw={'bold'}>{detail.name}</Contents>
              <Contents w={100} fs={20} fw={'bold'}>{detail.username}</Contents>
              <Contents w={100} fs={20} fw={'bold'}>{detail.department}</Contents>
              <Contents w={100} fs={20} fw={'bold'}>{detail.position}</Contents>
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
                <MyImg alt={'QrCode'} src={detail?.qrPath}>
                </MyImg>
                <QrCodeDownload
                  id={detail?.qrPath}
                  text={'https://cdn-icons-png.flaticon.com/512/62/62055.png'}
                  onClick={onSaveFile}
                />
              </BotContents>

            </BotContainer>
            <BotContainer>
              <BotTitle>
                프로필 사진
              </BotTitle>
              <BotContents>
                <MyImg alt={'Img'} src={detail.img}>
                </MyImg>
                <MyImgUpdateButton
                  type={'file'}
                  id={'logoImg'}
                  accept={'image/*'}
                  text={'https://cdn-icons-png.flaticon.com/128/7175/7175371.png'}
                  enctype={'multipart/form-data'}
                  onChange={onChangeImg}
                />
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
  MyImgUpdateButton,
  QrCodeDownload
} = style;