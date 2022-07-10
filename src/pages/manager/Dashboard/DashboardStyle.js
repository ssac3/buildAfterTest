import styled from 'styled-components';

const Wrapper = styled.div`
  ${({theme}) => theme.flexSet('space-around', '', 'column')};
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  height: calc(100% - 75px);
`;

const InnerContainer = styled.div`
  ${({theme}) => theme.flexSet('space-between')};
  width:100%;
  height: 100%;
`;

const Card = styled.div`
  ${({theme}) => theme.flexSet('flex-start', 'center', 'column')};
  width: ${({w}) => w}%;
  height: 90%;
  padding: 30px 40px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 5px 5px 10px #00000020;
`;

const CardTitle = styled.div`
    ${({theme, align, dir}) => theme.flexSet('space-around', align, dir)};
    width: 100%;
`;

const ChartLayout = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  width:100%;
  height:auto;
  margin: auto;
`;

const CircleLayout = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  width: 100%;
  height: 100%;
`;

const Circle = styled.div`
  ${({theme}) => theme.flexSet('center', 'center', 'column')};
  width: 150px;
  height: 150px;
  border: 1px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_E1};
  border-radius: 50%;
  
  #title{
    font-weight: normal;
    font-size: 15px;
  }
  #time{
    font-weight: bold;
    font-size: 20px;
  }
`;

const ImageCard = styled.div`
  ${({theme}) => theme.flexSet('', '', 'column')};
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: white;
  box-shadow: 5px 5px 10px #00000020;
`;
const ImageLayout = styled.div`
  width: 100%;
  height: 240px;
  border-radius: 5px 5px 0px 0px;
  background: url(${({url}) => url}) no-repeat center;
  background-size: cover;
`;

const DepInfoLayout = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  height: calc(100% - 240px);
  padding: 40px;
  #depName{
    ${({theme}) => theme.flexSet('', '', 'column')};
    font-weight: bold;
    font-size: 20px;
    #text {
      font-weight: normal;
      color:${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
      font-size:15px;
    }
  }
  
  #positionInfo{
    ${({theme}) => theme.flexSet('space-around')};
    width: 500px;
    height: 100%;

    #position{
      ${({theme}) => theme.flexSet('center', 'center', 'column')};
      font-weight: normal;
      font-size: 15px;
      height: 100%;
      #count {
        font-weight: bold;
        color:black;
        font-size:20px;
      }
    }
  }

  #sumInfo{
    ${({theme}) => theme.flexSet('', '', 'column')};
    font-weight: bold;
    font-size: 15px;
    #sum {
      color: black;
      font-size:20px;
    }
  }

    
  #h1{
    font-weight: bold;
    font-size: 15px;
  }
  
  #divider{
    height: 70%;
    width: 1px;
    background-color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
  }
`;

export const style = {
  Wrapper,
  Container,
  Card,
  CardTitle,
  CircleLayout,
  ChartLayout,
  Circle,
  InnerContainer,
  ImageCard,
  ImageLayout,
  DepInfoLayout,
};