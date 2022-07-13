import styled from 'styled-components';


const Container = styled.div`
  ${({theme}) => theme.flexSet('none', 'center', 'column')};
  border: 0.5px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_CC};
  margin: 97.5px 412px 97.5px 412px;
  border-radius:7px;
  background: white;
  min-width: 693px;
  height: 604px;
`;

const Title = styled.div`
  padding-top: 46px;
  padding-bottom: 43px;
  font-weight: bold;
  font-size: 25px;
`;

const Contents = styled.div`
  ${({theme}) => theme.flexSet('none', 'none', 'column')};
`;


const ContentTitle = styled.div`
  margin-bottom: 5px;
  font-weight: bold;
`;

const ChangePw = styled.div`
  margin-bottom: 28px;
`;

const InputLayout = styled.input`
  width: 525px;
  height: 46px;
  border-radius: 7px;
  border: 0.5px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_CC};
  padding: 12px 10px;
  font-size: 18px;
`;

const Check = styled.div`
  padding-top: 5px;
  font-size: 12px;
  color: ${({fc}) => fc};
`;

const ChangeButton = styled.button`
  ${({theme}) => theme.flexSet('center', 'center', 'column')};
  cursor: pointer;
  width: 525px;
  height: 46px;
  border-radius: 7px;
  color: white;
  border: 0.5px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_CC};
  font-size: 20px;
  font-weight: bold;
  background-color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_5B};
  &:hover{
      background-color:${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
  };
`;

export const style = {
  Container,
  Title,
  Contents,
  ContentTitle,
  ChangePw,
  InputLayout,
  Check,
  ChangeButton
};