import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const TitleContainer = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  width: 40%;
  height: 75px;
`;

const InnerContainer = styled.div`
  ${({theme}) => theme.flexSet('space-between', 'center', 'row')};
  width: 280px;
  
  #btngroup{
    ${({theme}) => theme.flexSet()};
    height: 100%;
  }
`;

const Container = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  width: 100%;
  height: calc(100% - 75px);
`;

const ListContainer = styled.div`
  padding: 15px 0px;
  //border-radius: 5px;
  width: 100%;
  height: 100%;
`;

const HeaderContainer = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  width: 100%;
  margin-bottom: 20px;
`;

const InnerLayout = styled.div`
  ${({theme}) => theme.flexSet()};
  width: calc(100% / 8);
  font-size: 16px;
  font-weight: bold;
`;

const ListItemContainer = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  //border-top: 0.5px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_BE};
  //border-bottom: 0.5px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_BE};
  width: 100%;
  min-height: 25px;
  padding: 15px 8px;
  margin: 10px 0px;
  background-color: white;
  border-radius: 8px;
`;

const ItemContainer = styled.div`
  ${({theme}) => theme.flexSet()};
  width: calc(100% / 8);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  horiz-align: center;
`;

const BtnContainer = styled.div`
  ${({theme}) => theme.flexSet()};
  cursor: pointer;
  width: 70px;
  height: 35px;
  padding: 5px;
  color: white;
  border-radius: 5px;
  font-weight:bold;
  background-color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
  &:hover{
    background-color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_54};
  }
`;

const CalendarLayout = styled.div`
  ${({theme}) => theme.flexSet()};
  width: 100%;
  padding: 15px;
  background-color: white;
  position: relative;
`;

const YearSelectorLayout = styled.div`
  width:200px;
`;

export const style = {
  Wrapper,
  TitleContainer,
  InnerContainer,
  Container,
  ListContainer,
  HeaderContainer,
  InnerLayout,
  ListItemContainer,
  ItemContainer,
  BtnContainer,
  CalendarLayout,
  YearSelectorLayout,
};