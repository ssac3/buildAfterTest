import styled from 'styled-components';

const Container = styled.div`
  ${({theme}) => theme.flexSet('flex-end')};
  position:relative;
  padding: 10px;
  width:95%;
  height:30px;
    //border: 1px solid ${({theme}) => theme.colorSet.PRIMARY.BLUE_1A};
  color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
  border-radius:5px;
  background-color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_E1};
`;

const DropContainer = styled.ul`
  position: absolute;
  z-index: 2;
  top:100%;
  left:0;
  width: 100%;
  color:${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
  background-color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_E1};
  list-style: none;
`;

const ItemName = styled.div`
  display: inline-block;
  width: 80%;
  height: fit-content;
  font-weight: normal;
`;
const DropdownItem = styled.li`
  cursor:pointer;
  z-index: 1;
  padding:8px;
  border-bottom: 1px solid white;
  background-color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_E1};
  &:last-child {
    border-bottom: none;
  }
  &:hover{
    color:white;
    background-color: ${({theme}) => theme.colorSet.PRIMARY.BLUE_1A};
  }
`;

export const style = {Container, ItemName, DropContainer, DropdownItem };
