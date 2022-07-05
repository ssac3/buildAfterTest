import styled from 'styled-components';
const Nav = styled.nav`
  position: absolute;
  bottom: 0;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 20px;
`;

const Button = styled.button`
  width: 45px;
  border-radius: 50%;
  padding: 10px;
  margin: 0;
  border: 1.5px solid ${({theme}) => theme.colorSet.PRIMARY.BLUE_1A};
  font-size: 15px;
  
  &:hover {
    color:${({theme}) => theme.colorSet.PRIMARY.BLUE_1A};
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_CC};
    border: 1.5px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_CC};
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    border: none;
    font-weight: bold;
    color: ${({theme}) => theme.colorSet.PRIMARY.BLUE_1A};
    transform: revert;
  }
`;

export const style = {
  Nav,
  Button,
};
