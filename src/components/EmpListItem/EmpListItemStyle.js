import styled from 'styled-components';

const Container = styled.div`
  //${({theme}) => theme.flexSet()};
  border: 1px solid black;
  width: 300px;
  height: calc(100% - 70px);
  background-color: white;
  /*padding: 2px 10px;
  width: 300px;
  height: 40px;
  border: 1px solid black;
  border-radius: 8px;
  margin-bottom: auto;
  margin-right: auto;*/
`;

const CheckContainer = styled.div`
  
`;

const TextContainer = styled.div`
`;

const RemoveContainer = styled.div`
`;

export const style = {Container, CheckContainer, TextContainer, RemoveContainer};