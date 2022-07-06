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

const InputContainer = styled.input`
  cursor: default;
  width: ${({w}) => w}%;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid black;
  font-size: 18px;
  background-color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_E1 + 70};
`;
const DataWrapper = styled.div`
  ${({theme}) => theme.flexSet()};
  width: 100%;
  height: 10%;
`;

const DataWrapper2 = styled.div`
  ${({theme}) => theme.flexSet('', '', 'column')};
  width: 100%;
  height: 10%;
`;

const DataItemLayout = styled.div`
  ${({theme}) => theme.flexSet('space-around', '', 'column')};
  width: 50%;
  height:100%;
`;
const Title = styled.div`
  font-size:15px;
  font-weight:bold;
`;

const BtnLayout = styled.div`
  ${({theme}) => theme.flexSet('space-between', '', 'column')};
  width: 100%;
  padding:10px 0px;
  height: 150px;
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
  Wrapper,
  Container,
  TextLayout,
  DataWrapper,
  DataWrapper2,
  DataItemLayout,
  Title,
  InputContainer,
  BtnLayout,
  Btn
};
