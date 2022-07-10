import styled, {keyframes} from 'styled-components';
const fadein = () => {
  return keyframes`
    from {
      width: 400px;
      opacity: 0;
    }
    to {
      width: 410px;
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
  width: 410px;
  height: 100%;
  border-radius: 5px 0px 0px 5px;
  background-color: white;
  box-shadow: 0px 2px 10px #00000010;
  padding: 10px 37px;
  animation-delay: 5s;
  animation: ${fadein} 1s;
  animation-fill-mode: forwards;
  overflow: auto;
  z-index: 6;
`;

const TextLayout = styled.div`
  min-height: 80px;
  border-bottom: 1px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_E1};
`;

const DateLayout = styled.div`
  ${({theme}) => theme.flexSet()};
  width: 100%;
  padding:10px;
  font-weight: bold;
  font-size: 25px;
`;

const InfoLayout = styled.div`
  width: 100%;
`;

const LabelLayout = styled.div`
  display: grid;
  grid-template-rows: repeat(1,1fr);
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
`;

const DataLayout = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  width: 100%;
  height: 100px;
`;

const BoxLayout = styled.div`
  ${({theme}) => theme.flexSet('flex-start', 'center', 'column')};
  
  #title{
    font-weight: normal;
    font-size: 13px;
  }
  #time{
    font-weight: bold;
    font-size: 25px;
  }
`;

const RearrangeLayout = styled.div`
  ${({theme}) => theme.flexSet('space-around', '', 'column')};
  width: 100%;
  height: 550px;
`;

const RearrangeTitle = styled.div`
  width: 100%;
  height: 15%;
  border-bottom: 1px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_CC};
  
  #title{
    font-weight: bold;
    font-size: 20px;
  }
  #subTitle{
    font-weight: normal;
    font-size: 15px;
  }
`;

const TimeLayout = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  width: 100%;
  height: 13%;
`;

const InputLayout = styled.div`
  ${({theme}) => theme.flexSet('flex-end', '', 'column')};
  width: 47%;
  height: 100%;
  font-weight: bold;
`;

const ContentLayout = styled.textarea`
  width: 100%;
  resize:none;
  height: 200px;
  padding: 15px;
  border: 1px solid black;
  border-radius: 4px;
  font-size:15px;
  border: 1px solid ${({ theme }) => theme.colorSet.SECONDARY.GRAY_E1};
`;

const BtnLayout = styled.div`
  ${({theme}) => theme.flexSet('space-between', '', 'column')};
  width: 100%;
  padding:10px 0px;
  height: 200px;
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
  DateLayout,
  InfoLayout,
  LabelLayout,
  DataLayout,
  BoxLayout,
  RearrangeLayout,
  RearrangeTitle,
  TimeLayout,
  InputLayout,
  ContentLayout,
  BtnLayout,
  Btn
};