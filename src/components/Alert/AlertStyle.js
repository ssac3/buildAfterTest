import styled from 'styled-components';

const Container = styled.div`
  ${({theme}) => theme.flexSet('space-between')};
  position: absolute;
  top:20px;
  right:0;
  width: 550px;
  height: 56px;
  border-radius: 5px 0px 0px 5px;
  z-index:10;
  box-shadow: 5px 5px 10px #00000020;
  padding: 5px 10px;
  color: ${({status, theme}) => (status === 'success' ? theme.colorSet.ALERT.SUCCESS_FONT : theme.colorSet.ALERT.FAIL_FONT)};
  background-color: ${({status, theme}) => (status === 'success' ? theme.colorSet.ALERT.SUCCESS_BACK : theme.colorSet.ALERT.FAIL_BACK)};
`;

const TextLayout = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  text-align: left;
  min-width: 45%;
  width: auto;
`;

const IconLayout = styled.div`
  ${({theme}) => theme.flexSet()};
  cursor: pointer;
`;

export const style = {Container, TextLayout, IconLayout};