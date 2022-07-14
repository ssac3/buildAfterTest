import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  width: 100%;
  height: calc(100% - 75px);
`;
const SideContainer = styled.div`
  ${({theme}) => theme.flexSet('space-around', '', 'column')};
  width: 28%;
  height: 100%;
`;

const ChartLayout = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  width:100%;
  height:auto;
  margin: auto;
`;
const ListContainer = styled.div`
  position:relative;
  padding: 15px 0px;
  //border-radius: 5px;
  width: 70%;
  height: 100%;
`;

const InfoContainer = styled.div`
  width: 100%;
  height: ${({h}) => h}%;
  background-color: white;
  border-radius: 5px;
  padding: 15px;
`;


const TitleContainer = styled.div`
  ${({theme}) => theme.flexSet('space-between')};
  width: 450px;
  height: 75px;
  font-weight: normal;
  font-size:20px;
  color:${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
`;

const HeaderContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  height: 80px;
  margin-bottom: 20px;
`;

const InnerLayout = styled.div`
  ${({theme}) => theme.flexSet()};
  font-size: 16px;
  font-weight: bold;
`;

const SearchContainer = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  color:${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
  position: relative;
  width: 90%;
  height: 40px;
  padding: 10px;
  border-radius: 5px;
  background-color: white;
`;

const SearchInput = styled.input`
  width: 65px;
`;

const CalendarWrap = styled.div`
  position:absolute;
  top:20px;
  z-index: 1;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  horiz-align: center;
  width: 130px;
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


const UserInfoContainer = styled.div`
  ${({theme, info}) => theme.flexSet(info ? 'space-between' : 'center', 'center', 'column')};
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-size: ${({info}) => !info && 20}px;
`;

const InnerInfoContainer = styled.div`
  width:100%;
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 10px;
`;

const InnerInfoItem = styled.div`
  ${({theme}) => theme.flexSet('', 'flex-end', '')};
  width:100%;
  height: 100%;
  font-weight: bold;
`;

const InfoInputContainer = styled.div`
  width: 100%;
  border-radius: 5px;
  padding:10px;
  background-color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_CC};
`;

const StoreBtn = styled.button`
  font-weight: bold;
  cursor:pointer;
  width:100%;
  padding: 10px;
  color:white;
  border-radius: 5px;
  background-color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
  &:hover{
    background-color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_54};
  }
  &:disabled{
    background-color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_CC};
    cursor: no-drop;
  }
`;

export const style = {
  Wrapper,
  TitleContainer,

  Container,
  SideContainer,
  ChartLayout,
  InfoContainer,
  ListContainer,

  HeaderContainer,
  InnerLayout,
  SearchContainer,
  SearchInput,

  ListItemContainer,
  ItemContainer,
  BtnContainer,

  CalendarWrap,

  UserInfoContainer,
  InnerInfoContainer,
  InnerInfoItem,
  InfoInputContainer,
  StoreBtn,
};