import styled from 'styled-components';

const Container = styled.ul`
  ${({theme}) => theme.flexSet()};
  width: 100px;
  height: 30px;
  border: 1px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_79} ;
  list-style: none;
  background-color: white;
`;

const Item = styled.li`
  ${({theme}) => theme.flexSet()};
  cursor: pointer;
  margin:0;
  width: 50%;
  height:100%;
  border-right: 1px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
  font-weight: bold;
  background-color: ${({bgColor, theme}) => bgColor && theme.colorSet.PRIMARY.BLUE_1A};
  &:last-child {
    border-right: none;
  }
`;

export const style = {
  Container,
  Item,
};