import styled, {keyframes} from 'styled-components';

const Wrap = styled.div`
  z-index: 5;
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  height: calc(100% - 70px);
  background-color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_E1 + 50};
`;

const fadein = () => {
  return keyframes`
    from {
      width: 690px;
      opacity: 0;
    }
    to {
      width: 700px;
      opacity: 1;
    }
  `;
};

const Container = styled.div`
  ${({theme}) => theme.flexSet('space-around', '', 'column')};
  position: absolute;
  top: 0px;
  right: 0;
  width: 700px;
  height: 100%;
  background-color: white;
  z-index: 6;
  box-shadow: 0px 2px 10px #00000010;
  padding: 30px 37px;
  animation-delay: 5s;
  animation: ${fadein} 1s;
  animation-fill-mode: forwards;
  overflow: auto;
`;

const TitleContainer = styled.div`
  ${({theme}) => theme.flexSet('space-between')};
  width: 100%;
  height: 8%;
  font-size:25px;
  
  
  #title{
    ${({theme}) => theme.flexSet('space-between', 'flex-end')};
    width: 73%;
    font-weight: bold;
    #subTitle{
      font-size:15px;
      font-weight: normal;
      color:${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
    }
  }
`;

const NameContainer = styled.div`
  width:100%;
  height:auto;
  font-size:16px;
  font-weight:bold;
  color:${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
`;

const FirstChartLayout = styled.div`
  ${({theme}) => theme.flexSet()};
  width: 100%;
  height: 50%;
  padding: 40px 0px;
  border-bottom: 1px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
  
  #innerLayout{
    ${({theme}) => theme.flexSet('space-between', '', 'column')};
    width:50%;
    height:100%;
  }
`;

const SecondChartLayout = styled.div`
  width: 100%;
  height: 40%;
`;

const RearrangeStatus = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  margin: 0 auto;
  width: 90%;
  height: 50px;
  padding: 10px 60px;
  border: 1px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_E1};
  border-radius: 5px;
  #number{
    font-weight: bold;
    font-size:20px;
    color: ${({theme}) => theme.colorSet.PRIMARY.BLUE_1A};
  }
`;
export const style = {
  Wrap,
  Container,
  TitleContainer,
  NameContainer,
  FirstChartLayout,
  SecondChartLayout,
  RearrangeStatus,
};