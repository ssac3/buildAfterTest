import styled from 'styled-components';

const Container = styled.button`
  ${({theme}) => theme.flexSet()};
  position:absolute;
  cursor: pointer;
  bottom: 25px;
  right: 30px;
  width: 65px;
  height: 65px;
  z-index: 3;
  font-weight: bold;
  border-radius: 50%;
  background-color: ${({theme}) => theme.colorSet.PRIMARY.BLUE_1A};
  box-shadow: 4px 4px 5px #00000060;
  &:hover{
    background-color: ${({theme}) => theme.colorSet.PRIMARY.BLUE_04};
  }
`;

export const style = {
  Container,
};