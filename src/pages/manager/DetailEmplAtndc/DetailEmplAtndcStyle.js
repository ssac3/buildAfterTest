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

const CloseLayout = styled.div`
  ${({theme}) => theme.flexSet('flex-end', '', '')};
  height: fit-content;
  color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
`;

const TextLayout = styled.div`
  min-height: 80px;
  height: auto;
  border-bottom: 1px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_E1};
`;

const DateLayout = styled.div`
  ${({theme}) => theme.flexSet()};
  width: 100%;
  height: 30px;
  font-weight: bold;
  font-size: 25px;
`;

const InfoLayout = styled.div`
  width: 100%;
  height: 200px;
`;

const LabelLayout = styled.div`
  display: grid;
  grid-template-rows: repeat(1,1fr);
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 15%;
`;
const DataLayout = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  width: 100%;
  height: 55%;
`;

const BoxLayout = styled.div`
  ${({theme}) => theme.flexSet('flex-start', 'start', 'column')};
  
  #title{
    font-weight: normal;
    font-size: 13px;
  }
  #time{
    font-weight: bold;
    font-size: 25px;
  }
`;

const VacationInput = styled.div`
  ${({theme}) => theme.flexSet('flex-start', '', 'column')};
  height: 300px;
  #title{
    font-weight: bold;
    font-size: 13px;
    margin-bottom: 10px;
  }
  #contents{
    width: 100%;
    padding: 10px;
    height: 290px;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 20px;
  }


`;
export const style = {
  Wrapper,
  Container,
  CloseLayout,
  TextLayout,
  InfoLayout,
  DateLayout,
  LabelLayout,
  DataLayout,
  BoxLayout,
  VacationInput,
};