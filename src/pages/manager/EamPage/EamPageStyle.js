import styled, {keyframes} from 'styled-components';
const fadein = () => {
  return keyframes`
    from {
      width: 490px;
      opacity: 0;
    }
    to {
      width: 500px;
      opacity: 1;
    }
  `;
};
const EamWrapper = styled.div`
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
  width: 500px;
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

const BoxLayout = styled.div`
  ${({theme}) => theme.flexSet('space-around', '', 'column')};
  width: 100%;
  height: 80%;
`;

const TextLayout = styled.div`
  display: block;
  ${({theme}) => theme.flexSet('flex-start', 'end', 'row')};
  border-bottom: 1px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_E1};
  
  #name{
    font-size: 25px;
    font-weight: bold;
    margin-right: 10px;
  }
  #username{
    font-size: 15px;
    font-weight: normal;
  }
`;

const ChartLayout = styled.div`
  ${({theme}) => theme.flexSet('space-around', '', 'column')};
  width: 100%;
  height: 80%;
  
  #title{
    width:100%;
    font-weight: bold;
    font-size:18px;
  }
  
  #contents{
    width:100%;
    height: 80%;
  }
`;

export const style = {
  EamWrapper,
  Container,
  BoxLayout,
  TextLayout,
  ChartLayout,
};