import styled from 'styled-components';

const Wrapper = styled.div`
  ${({theme}) => theme.flexSet('space-around', '', 'column')};
  width: 100%;
  height: 100%;
`;

const TitleContainer = styled.div`
  ${({theme}) => theme.flexSet('space-between')};
  width: 450px;
  height: 30px;
  font-weight: normal;
  font-size:20px;
  color:${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
`;


const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  height: calc(100% - 75px);
`;

const Card = styled.div`
  ${({theme}) => theme.flexSet('flex-start', 'center', 'column')};
  width: 95%;
  height: 90%;
  padding: 30px 40px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 5px 5px 10px #00000020;
`;

const CardTitle = styled.div`
  ${({theme}) => theme.flexSet('space-around', 'flex-start', 'column')};
  width: 100%;
  font-weight: bold;
  font-size: 20px;
  #subTitle{
    font-weight: normal;
    font-size: 15px;
    color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
  }
`;

const ChartLayout = styled.div`
  ${({theme}) => theme.flexSet()};
  width:100%;
  overflow-y:auto;
`;

export const style = {
  Wrapper,
  TitleContainer,
  Container,
  Card,
  CardTitle,
  ChartLayout
};