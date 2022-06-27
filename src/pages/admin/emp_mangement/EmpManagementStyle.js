import styled from 'styled-components';

const Container = styled.div`
  //background-color: lightblue;
  width: 100%;
  height:100%;
  
  #pagename{
    margin-bottom: 50px;
  }
  
  #wrapper{
    ${({theme}) => theme.flexSet('space-between')};
    width: 38%;
  }
  
  #topcomponent{
    ${({theme}) => theme.flexSet('space-between')};
    width: 100%;
    margin-bottom: 75px;
    
    #selectbox{
      width: 120px;
      padding: 8px 8px;
      font-size: inherit;
      line-height: inherit;
      border: 1px solid;
      border-radius: 5px;
    }
  }
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

const ListHeader = styled.ul`
  ${({theme}) => theme.flexSet('space-around')};
    width:100%;
    height: 20px;
    list-style: none;
    font-weight: bold;
  margin-left: 20px;
`;
const ListItem = styled.li`
  float: left;
  width: ${({w}) => w}px;
`;



export const style = {Container, DelBtn, RegBtn, ListHeader, ListItem};
