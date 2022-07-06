import styled from 'styled-components';

const Container = styled.div`
  ${({theme}) => theme.flexSet('flex-end')};
  width: 100%;
  height: 40px;
  border: 1px solid black;
  border-radius: 5px;
`;

const SearchInput = styled.input`
  ${({theme}) => theme.flexSet()};
  width: 100%;
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