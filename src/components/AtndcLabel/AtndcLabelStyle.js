import styled from 'styled-components';

const Container = styled.div`
  ${({theme}) => theme.flexSet()};
  width: 90%;
  height: 100%;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  background-color: ${({bgColor}) => bgColor};
`;

export const style = {
  Container,
};