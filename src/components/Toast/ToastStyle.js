import styled, {keyframes} from 'styled-components';

const fadein = () => {
  return keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `;
};

const Container = styled.div`
  ${({theme}) => theme.flexSet()};
  animation: ${fadein()} 1.2s;
  padding:10px;
  position: absolute;
  bottom: 50px;
  left: calc(50% - 150px);
  width: 400px;
  height: 50px;
  font-weight:bold;
  color:white;
  background-color: ${({theme}) => theme.colorSet.PRIMARY.BLUE_51};
  border-radius: 20px;
  border: 1px solid ${({theme}) => theme.colorSet.ALERT.SUCCESS_FONT};
  z-index: 50;
`;

export const style = {
  Container,
};