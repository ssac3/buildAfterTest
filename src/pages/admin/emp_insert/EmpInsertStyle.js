import styled, {keyframes} from 'styled-components';

const Wrap = styled.div`
  z-index: 1;
  position: absolute;
  ${({theme}) => theme.flexSet('space-between', '', 'column')};
  top: 70px;
  left: 0;
  width: 100%;
  height: calc(100% - 70px);
  background-color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_E1 + 50};
`;

const fadein = () => {
  return keyframes`
    from {
      width: 500px;
      opacity: 0;
    }
    to {
      width: 525px;
      opacity: 1;
    }
  `;
};

const Container = styled.div`
  ${({theme}) => theme.flexSet('space-around', '', 'column')};
  width: 525px;
  height: 100%;
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: white;
  z-index: 2;
  box-shadow: 0px 2px 10px #00000010;
  padding: 10px 50px;
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

const InsertForm = styled.div`
  ${({theme}) => theme.flexSet('space-between')};
  width:100%;
  height: 150px;
`;

const UserInfoWrap = styled.div`
  ${({theme}) => theme.flexSet('space-between', null, 'column')};
  width: 50%;
  height: 100%;
`;

const UserInfoLayout = styled.div`
  ${({theme}) => theme.flexSet('space-around', null, 'column')};
  //background-color: red;
  width: 100%;
  height: 80px;
`;
const UserProfileLayout = styled.input`
  ${({theme}) => theme.flexSet('flex-end')};
  width: 113px;
  height:100%;
  background-color: #7A7A7A;
  &::file-selector-button {
    visibility: hidden;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip:rect(0,0,0,0);
    border: 0;
  }
`;

const CaptionLayout = styled.div`
  ${({theme}) => theme.flexSet('space-between')};
  //background-color: green;
  font-weight: bold;
  font-size: 14px;
  width: 95%;
`;
const BtnLayout = styled.button`
  cursor:pointer;
  width: 45px;
  height: 22px;
  font-size: 10px;
  background-color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_54};
  border-radius: 5px;
  font-weight: bold;
  color: white;
  &:hover{
    background-color:${({theme}) => theme.colorSet.SECONDARY.GRAY_E1};
  }
`;
const LabelLayout = styled.input`,
  padding: 8px;
  border-radius: 5px;
  width: 200px;
  height: 30px;
  border: 1px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
`;
const LabelLayout2 = styled.div`,
  padding: 8px;
  border-radius: 5px;
  width: 200px;
  height: 100%;
  border: 1px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
`;
const UserInfoLayout2 = styled.div`
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  height: auto;
`;
const ResultBtnLayout = styled.div`
  ${({theme}) => theme.flexSet('space-around', 'center', 'column')};
  width: 100%;
  height: 100px;
`;

const Btn = styled.button`
  ${({theme}) => theme.flexSet()};
  cursor:pointer;
  width:100%;
  height: 40px;
  font-size: 12px;
  background-color: ${({color}) => color};
  border-radius: 5px;
  font-weight: bold;
  color: white;
`;

export const style = {Wrap,
  Container,
  TextLayout,
  CloseLayout,
  InsertForm,
  UserInfoWrap,
  UserInfoLayout,
  UserProfileLayout,
  CaptionLayout,
  LabelLayout,
  LabelLayout2,
  BtnLayout,
  UserInfoLayout2,
  ResultBtnLayout,
  Btn,
};
