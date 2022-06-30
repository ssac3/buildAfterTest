import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const TitleContainer = styled.div`
  ${({theme}) => theme.flexSet('flex-start')};
  width: 100%;
  height: 75px;
`;

const InnerContainer = styled.div`
  ${({theme}) => theme.flexSet('space-between')};
  width: 250px;
`;

const Container = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  width: 100%;
  height: calc(100% - 75px);
`;

const ListContainer = styled.div`
  padding: 15px 0px;
  //border-radius: 5px;
  width: 100%;
  height: 100%;
`;

const HeaderContainer = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  width: 100%;
  margin-bottom: 20px;
`;

const InnerLayout = styled.div`
  ${({theme}) => theme.flexSet()};
  width: calc(100% / 8);
  font-size: 16px;
  font-weight: bold;
`;

export const style = {
  Wrapper,
  TitleContainer,
  InnerContainer,
  Container,
  ListContainer,
  HeaderContainer,
  InnerLayout,
};