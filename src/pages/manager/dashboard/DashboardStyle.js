import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 70px;
  left: ${({w}) => w};
  width: 80%; // 여기부터 작업
  height: calc(100% - 70px);
  background-color: blue;
`;

const InnerContainer = styled.div`
  width: 80%;
  height: 100%;
  background-color: blue;
`;

export const style = {Container, InnerContainer};