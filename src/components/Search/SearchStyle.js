import styled from 'styled-components';

const Container = styled.div`
  ${({theme}) => theme.flexSet()};
  padding: 2px 10px;
  width: 300px;
  height: 40px;
  border: 1px solid black;
  border-radius: 8px;
  margin-bottom: auto;
  margin-right: auto;
`;

const SearchInput = styled.input`
  width: 80%;
  height: 100%;
  font-size: 20px;
`;
const BtnContainer = styled.div`
  cursor: pointer;
  ${({theme}) => theme.flexSet()};
  width:30px;
  height: 100%;
`;

export const style = {Container, SearchInput, BtnContainer};