import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 70px;
  padding: 0px 24px;
  background-color: white;
  ${({theme}) => theme.flexSet('space-between')};
  
`;


export const style = {
  Container
};