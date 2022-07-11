import styled from 'styled-components';

const Container = styled.div`
  ${({theme}) => theme.flexSet('')};
  position:relative;
  padding: 10px;
  width:90%;
  height:40px;
  //border: 1px solid ${({theme}) => theme.colorSet.PRIMARY.BLUE_1A};
  color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
  border-radius:5px;
  background-color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_E1};
`;

const DropContainer = styled.ul`
  display: block;
  position: absolute;
  top:100%;
  left:0;
  width: 100%;
  color:${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
  background-color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_E1};
  list-style:none;
`;

const ItemName = styled.input`
  width: 80%;
  height: fit-content;
  font-weight: normal;
`;
const DropdownItem = styled.li`
  cursor:pointer;
  padding:8px;
  border-bottom: 1px solid white;
  &:last-child {
    border-bottom: none;
  }
  &:hover{
    color:white;
    background-color: ${({theme}) => theme.colorSet.PRIMARY.BLUE_1A};
  }
`;

export const style = {Container, ItemName, DropContainer, DropdownItem };
