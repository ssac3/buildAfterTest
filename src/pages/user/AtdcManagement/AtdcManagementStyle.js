import styled from 'styled-components';

const CalendarLayout = styled.div`
  ${({theme}) => theme.flexSet()};
  width: 100%;
  padding: 15px;
  background-color: white;
  position: relative;
`;

export const style = {
  CalendarLayout
};