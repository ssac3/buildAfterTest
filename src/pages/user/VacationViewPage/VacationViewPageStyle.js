import styled, {keyframes} from 'styled-components';
const fadein = () => {
  return keyframes`
    from {
      width: 390px;
      opacity: 0;
    }
    to {
      width: 400px;
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
  width: 400px;
  height: 100%;
  border-radius: 5px 0px 0px 5px;
  background-color: white;
  box-shadow: 0px 2px 10px #00000010;
  padding: 10px 37px;
  animation-delay: 7s;
  animation: ${fadein} 1s;
  animation-fill-mode: forwards;
  overflow: auto;
  z-index: 6;
`;

const TextLayout = styled.div`
  min-height: 80px;
  border-bottom: 1px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_E1};
`;

export const style = {
  Wrapper,
  Container,
  TextLayout,
};
