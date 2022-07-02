import styled from 'styled-components';

const ListItemContainer = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  //border-top: 0.5px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_BE};
  //border-bottom: 0.5px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_BE};
  width: 100%;
  min-height: 25px;
  padding: 15px 8px;
  margin: 10px 0px;
  background-color: white;
  border-radius: 8px;
`;

export const style = {
  ListItemContainer
};