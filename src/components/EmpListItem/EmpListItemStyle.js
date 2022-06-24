import styled from 'styled-components';

const ListData = styled.div`
  //background-color: red;
  ${({theme}) => theme.flexSet('space-around')};
  //float: left;
  background-color: white;
  //padding: 10px;
  border-radius: 5px;
  //padding: 10px;
  margin-bottom: 20px;
`;


const ListItem = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  float: left;
  width: ${({w}) => w}px;
  //background-color: red;
  
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

export const style = {ListData, ListItem, BtnLayout};

