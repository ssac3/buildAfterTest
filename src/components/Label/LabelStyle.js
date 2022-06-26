import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  border-radius: 5px;
  width: 50px;
  padding: 5px;
  background-color: ${({color}) => color};
  font-weight: bold;
  color: white;
`;
export const style = {Container};