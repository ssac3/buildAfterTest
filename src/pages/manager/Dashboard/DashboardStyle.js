import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  height: calc(100% - 75px);
`;

const Card = styled.div`
  margin:10px;
  ${({theme}) => theme.flexSet('flex-start', '', 'column')};
  width: ${({w}) => w}%;
  padding: 30px 40px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 5px 5px 10px #00000020;
  background-image: url(${({url}) => url});
  background-size : cover;
`;

const CardTitle = styled.div`
    ${({theme, align, dir}) => theme.flexSet('space-around', align, dir)};
    width: 100%;
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

export const style = {
  Wrapper,
  Container,
  Card,
  CardTitle,
  CircleLayout,
  Circle,
};