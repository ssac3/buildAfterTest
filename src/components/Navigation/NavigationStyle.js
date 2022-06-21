import styled, {keyframes} from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 65px;
  height: calc(100% - 70px);
  padding-top:50px;
  background-color: ${({theme}) => theme.colorSet.PRIMARY.BLUE_1A};
`;

const IconLayout = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  padding: 10px;
  margin: 5px 0px;
  color: white;
  background-color: ${({status, theme}) => (status ? theme.colorSet.PRIMARY.BLUE_04 : theme.colorSet.PRIMARY.BLUE_1A)};
  cursor: pointer;
`;

const fadein = () => {
  return keyframes`
    from{
      width: 0px;
      opacity: 0;
    }
    to{
      width: 238px;
      opacity: 1;
    }
  `;
};


const DrawerContainer = styled.div`
  position: absolute;
  left: 65px;
  top:0;
  width: 238px;
  height: 100%;
  background-color: white;
  border-radius: 0px 5px 5px 0px;
  box-shadow: inset 15px 0px 20px #00000010;
  animation: ${fadein} 0.5s;
  animation-fill-mode: forwards;
  padding: 20px;
  
  #title{
    min-width: 200px;
    color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_54};
    font-size: 20px;
    font-weight: bold;
  }
`;


const SubTitle = styled.div`
  cursor: pointer;
  margin: 15px 0px 0px 10px;
  min-width: 200px;
  color: ${({check, theme}) => (check ? theme.colorSet.PRIMARY.BLUE_1A : theme.colorSet.SECONDARY.GRAY_CC)};
  font-size: 18px;
  font-weight: 400;
`;


export const style = {Container, IconLayout, DrawerContainer, SubTitle};