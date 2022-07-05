import styled, {keyframes} from 'styled-components';
const fadein = () => {
  return keyframes`
    from {
      width: 345px;
      opacity: 0;
    }
    to {
      width: 353px;
      opacity: 1;
    }
  `;
};
const Wrapper = styled.div`
  z-index: 4;
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  height: calc(100% - 70px);
  background-color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_E1 + 50};
`;

const Container = styled.div`
  ${({theme}) => theme.flexSet('space-around', '', 'column')};
  position: absolute;
  right:0px;
  width: 353px;
  height: 100%;
  border-radius: 5px 0px 0px 5px;
  background-color: white;
  box-shadow: 0px 2px 10px #00000010;
  padding: 20px 37px;
  animation-delay: 5s;
  animation: ${fadein} 1s;
  animation-fill-mode: forwards;
  overflow: auto;
  z-index: 6;
`;

export const style = {
  Wrapper,
  Container,
};