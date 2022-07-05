import styled from 'styled-components';

const Container = styled.div`
  ${({theme}) => theme.flexSet()};
  width: 90%;
  height: 100%;
  padding: 3px;
  color: white;
  font-weight: bold;
  background-color: ${({bgColor}) => bgColor};
`;

export const style = {
  Container,
};