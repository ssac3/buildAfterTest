import styled from 'styled-components';

const Container = styled.div`
  ${({theme}) => theme.flexSet('center', 'center', 'none')};
`;


export const style = {
  Container
};