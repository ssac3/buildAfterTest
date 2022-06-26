import styled from 'styled-components';

const Container = styled.div`
  ${({theme}) => theme.flexSet()};
  width: 100%;
  height: 100%;
  background-color: white;
`;

const CardContainer = styled.div`
  ${({theme}) => theme.flexSet('space-around', 'center', 'column')};
  width: 710px;
  height: 740px;
  border-radius: 5px;
  box-shadow: 0px 0px 50px #00000020;
  padding: 190px 155px 125px 155px;
`;

const LogoLayout = styled.div`
  text-align: center;
  width: 100%;
  height: 75px;
`;

const InputLayout = styled.input`
  width: 400px;
  height: 45px;
  border-radius: 10px;
  border: 2px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
  padding: 12px 10px;
  font-size: 18px;
`;

const SignInButton = styled.button`
  cursor: pointer;
  width: 400px;
  padding: 18px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 18px;
  color: white;
  background-color: ${({theme}) => theme.colorSet.PRIMARY.BLUE_1A};  
  &:hover{
    background-color:${({theme}) => theme.colorSet.PRIMARY.BLUE_51};;
  }
`;


export const style = {Container, CardContainer, LogoLayout, InputLayout, SignInButton};