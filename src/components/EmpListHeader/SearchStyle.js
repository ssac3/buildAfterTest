import styled from 'styled-components';

const Container = styled.div`
  ${({theme}) => theme.flexSet()};
  //padding: 2px 4px;
  width: 300px;
  height: 40px;
  border: 1px solid black;
  border-radius: 5px;
`;

const SearchInput = styled.input`
  ${({theme}) => theme.flexSet()};
  width: 80%;
  height: 100%;
  font-size: 15px;
`;
const BtnContainer = styled.div`
  ${({theme}) => theme.flexSet()};
  cursor: pointer;
  width:30px;
  height: 100%;
`;

export const style = {Container, SearchInput, BtnContainer};