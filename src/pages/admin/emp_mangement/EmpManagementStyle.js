import styled from 'styled-components';

const Container = styled.div`
  //background-color: lightblue;
  width: 100%;
  height:100%;
`;
const PageNameContainer = styled.div`
  margin-bottom: 50px;
`;

const Wrapper = styled.div`
  ${({theme}) => theme.flexSet('space-between')};
  width: 38%;
`;
const TopComponent = styled.div`
  ${({theme}) => theme.flexSet('space-between')};
  width: 100%;
  margin-bottom: 75px;
`;
const SchContainer = styled.div`
  ${({theme}) => theme.flexSet('flex-end')};
  width: 100%;
  height: 40px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
`;
const SchBtnContainer = styled.div`
  ${({theme}) => theme.flexSet()};
  cursor: pointer;
  width:30px;
  height: 100%;
`;
const SchInput = styled.input`
  ${({theme}) => theme.flexSet()};
  width: 100%;
  height: 100%;
  font-size: 15px;
`;
const DivContainer = styled.div`
  margin-left: 20px;
  ${({theme}) => theme.flexSet('space-between')};
`;
const SelectBox = styled.div`
  ${({theme}) => theme.flexSet('flex-end')};
  width: 150px;
  font-size: 15px;
`;
const DelBtn = styled.button`
  background-color: #E20000;
  ${({theme}) => theme.flexSet()};
  cursor: pointer;
  width:120px;
  height: 100%;
  padding: 10px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  margin-left: 40%;
`;

const RegBtn = styled.button`
  background-color: #1A83FE;
  ${({theme}) => theme.flexSet()};
  cursor: pointer;
  width:120px;
  height: 100%;
  padding: 10px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
`;
const HeaderDiv = styled.div`
  background-color: red;
`;
const ListHeader = styled.ul`
  ${({theme}) => theme.flexSet('space-around')};
    width:100%;
    height: 20px;
    list-style: none;
    font-weight: bold;
    margin:0;
`;
const ListItem = styled.li`
  float: left;
  width: 130px;
`;
const ListItemContainer = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  width: 100%;
  min-height: 25px;
  padding: 15px 8px;
  margin: 10px 0px;
  background-color: white;
  border-radius: 8px;
`;
const ItemContainer = styled.div`
  ${({theme}) => theme.flexSet()};
  display:block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 130px;
`;
const BtnLayout = styled.button`
  background-color: #5B5B5B;
  ${({theme}) => theme.flexSet()};
  cursor: pointer;
  width:80px;
  height: 40px;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  margin-right: 30px;
`;
export const style = {
  Container,
  PageNameContainer,
  TopComponent,
  Wrapper,
  SchContainer,
  SchBtnContainer,
  SchInput,
  DivContainer,
  SelectBox,
  DelBtn,
  RegBtn,
  ListHeader,
  HeaderDiv,
  ListItem,
  ListItemContainer,
  ItemContainer,
  BtnLayout
};
