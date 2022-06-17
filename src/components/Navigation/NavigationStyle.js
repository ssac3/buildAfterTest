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
    }
    to{
      width: 238px;
    }
  `;
};


const DrawerContainer = styled.div`
  position: absolute;
  left: 85px;
  top:0;
  width: 238px;
  height: 100%;
  background-color: white;
  border-radius: 0px 5px 5px 0px;
  box-shadow: inset 15px 0px 20px #00000010;
  animation: ${fadein} 1s;
  animation-fill-mode: forwards;
`;

export const style = {Container, IconLayout, DrawerContainer};