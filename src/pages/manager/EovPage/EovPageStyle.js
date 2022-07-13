import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const TitleContainer = styled.div`
  ${({theme}) => theme.flexSet('space-between')};
  width: 450px;
  height: 75px;
  font-weight: normal;
  font-size:20px;
  color:${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
`;

const Container = styled.div`
  ${({theme}) => theme.flexSet('space-between', '', 'column')};
  width: 100%;
  height: calc(100% - 75px);
  
  #bottom{
    ${({theme}) => theme.flexSet('space-between')};
    width: 100%;
    height: 45%;
  }
`;

const Card = styled.div`
  ${({theme}) => theme.flexSet('flex-start', '', 'column')};
  width: ${({w}) => w}%;
  height: ${({h}) => h}%;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 5px 5px 10px #00000020;
  background-image: url(${({url}) => url});
  background-size : cover;
`;
const CardTitle = styled.div`
    ${({theme, align, dir}) => theme.flexSet('space-around', align, dir)};
    width: 430px;
`;

const DepInfo = styled.div`
  ${({theme}) => theme.flexSet('space-around', 'flex-start', 'column')};
  text-align: left;
  width: 150px;
  height: 200px;
  background-color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_79 + 40};
  border-radius: 5px;
  padding:50px 10px;
  #title{
    font-size:17px;
    font-weight: bold;
    color:${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
  }
  #depName{
    font-size:20px;
    font-weight: bold;
    color:${({theme}) => theme.colorSet.SECONDARY.GRAY_5B};
  }
`;

const ChartLayout = styled.div`
  ${({theme}) => theme.flexSet()};
  width:100%;
  height:400px;
  margin: auto;
`;

export const style = {
  Wrapper,
  TitleContainer,
  Container,
  Card,
  CardTitle,
  DepInfo,
  ChartLayout,
};