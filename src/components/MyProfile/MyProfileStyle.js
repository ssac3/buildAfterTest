import styled from 'styled-components';

const Container = styled.div`
  padding: 30px 15px 30px 15px;
  
`;

const MyViewTop = styled.div`
  border: 0.5px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_CC};
  border-radius:7px;
  min-width: 700px;
  background: white;
  max-width: 1406px;
  #DouZoneImg{
    width: 100%;
  }
`;

const InquiryTitle = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  padding: 20px 50px;
`;

const InquiryContent = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  padding: 20px 50px;
`;

const Contents = styled.div`
  width: ${({w}) => w}px;
  font-size: ${({fs}) => fs};
  font-weight: ${({fw}) => fw};
`;

const MyViewBot = styled.div`
  ${({theme}) => theme.flexSet('space-between', 'center', 'row')};
  margin-top: 50px;
`;

const MyImg = styled.div`
  
`;

const MyQR = styled.div`
  border: 0.5px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_CC};
  border-radius:7px;
  width: ${({w}) => w}%;
  background: white;
`;

const MyQrImg = styled.div`
  ${({theme}) => theme.flexSet('center', 'center', 'row')};
`;

export const style = {
  Container,
  MyViewTop,
  InquiryTitle,
  InquiryContent,
  Contents,
  MyViewBot,
  MyQR,
  MyImg,
  MyQrImg
};