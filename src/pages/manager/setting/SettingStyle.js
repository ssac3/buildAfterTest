import styled, {keyframes} from 'styled-components';

const Wrap = styled.div`
  z-index: 5;
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  height: calc(100% - 70px);
  background-color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_E1 + 50};
`;

const fadein = () => {
  return keyframes`
    from {
      width: 350px;
      opacity: 0;
    }
    to {
      width: 353px;
      opacity: 1;
    }
  `;
};

const Container = styled.div`
  ${({theme}) => theme.flexSet('space-around', '', 'column')};
  position: absolute;
  top: 0px;
  right: 0;
  width: 353px;
  height: 100%;
  background-color: white;
  z-index: 6;
  box-shadow: 0px 2px 10px #00000010;
  padding: 64px 37px;
  animation-delay: 5s;
  animation: ${fadein} 1s;
  animation-fill-mode: forwards;
  overflow: auto;
`;

const CloseLayout = styled.div`
  ${({theme}) => theme.flexSet('flex-end', '', '')};
  height: fit-content;
  color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
`;

const TextLayout = styled.div`
  min-height: 135px;
  height: auto;
`;

const InputWrap = styled.div`
  width: 100%;
  height: 500px;
`;

const InputLayout = styled.div`
  ${({theme}) => theme.flexSet('flex-end', '', 'column')};
  width: 100%;
  height: 100px;
  font-weight: bold;
`;


const InputContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  padding: 5px 10px;
  border: 1px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
  border-radius: 5px;

  input {
    padding: 5px;
    font-size: 20px;
    position: relative;
  }
`;

const BtnLayout = styled.div`
  ${({theme}) => theme.flexSet('space-around', '', 'column')};
  width: 100%;
  height: 20%;
`;

const Btn = styled.button`
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  padding: 15px;
  border-radius: 5px;
  background-color: ${({bgColor}) => bgColor};
  color: white;
`;


export const style = {
  Wrap,
  Container,
  TextLayout,
  CloseLayout,
  InputWrap,
  InputLayout,
  InputContainer,
  BtnLayout,
  Btn,
};