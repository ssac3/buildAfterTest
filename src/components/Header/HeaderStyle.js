import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 70px;
  padding: 0px 24px;
  background-color: white;
  ${({theme}) => theme.flexSet('space-between')};
  
`;

const IconLayout = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  width: 220px;
  height: 100%;
  color:${({theme}) => theme.colorSet.SECONDARY.GRAY_79}
`;

const InnerLayout = styled.div`
  ${({theme}) => theme.flexSet()};
  width: calc(100% / 3);
  height: 100%;
  cursor: pointer;
  #tooltip {
    font-weight: bold;
    display: none;
    position: absolute;
    max-width: 200px;
    border: 1px solid;
    border-radius: 5px;
    padding: 5px;
    font-size: 12px;
    color: white;
    background: ${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
  }
  &:hover #tooltip{
    display: block;
  }
  
`;

export const style = {
  Container,
  IconLayout,
  InnerLayout,
};