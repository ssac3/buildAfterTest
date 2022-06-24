import styled from 'styled-components';

const Container = styled.div`
  padding: 30px 15px 30px 15px;
  
`;

const MyViewTop = styled.div`
  border: 0.5px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_CC};
  border-radius:7px;
  width: 1408px;
  background: white;
  height: 357px;
  #DouZoneImg{
    width: 100%;
  }
`;

const InquiryTitle = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  padding: 20px 120px 0px 80px;
`;

const InquiryContent = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  padding: 10px 120px 20px 80px;
`;

const Contents = styled.div`
  width: ${({w}) => w}px;
  font-size: ${({fs}) => fs}px;
  font-weight: ${({fw}) => fw};
  color: ${({fc}) => fc};
`;

const MyViewBot = styled.div`
  ${({theme}) => theme.flexSet('none', 'center', 'row')};
  margin-top: 80px;
`;


const BotContainer = styled.div`
  ${({theme}) => theme.flexSet('center', 'none', 'column')};
  border: 0.5px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_CC};
  border-radius:7px;
  background: white;
  width: auto;
  height: 305px;
  
  margin-right: 100px;
`;

const BotTitle = styled.div`
  padding: 15px 0px 15px 30px;
  font-size: 20px;
  font-weight: bold;
`;

const BotContents = styled.div`
  ${({theme}) => theme.flexSet('center', 'center', 'row')};
  width: 506px;
  padding-bottom: 30px;
`;

const MyImg = styled.img`
  width: 200px;
  height: 200px;
  margin: 0 auto;
`;

const MyButton = styled.button`
  
`;

export const style = {
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
  MyButton
};