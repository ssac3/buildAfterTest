import styled, {keyframes} from 'styled-components';

const Wrap = styled.div`
  z-index: 1;
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  height: calc(100% - 70px);
  background-color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_E1 + 50};
`;

const fadein = () => {
  return keyframes`
    from {
      width: 350px;
      opacity: 0;
    }
    to {
      width: 353px;
      opacity: 1;
    }
  `;
};

const Container = styled.div`
  ${({theme}) => theme.flexSet('space-around', '', 'column')};
  position: absolute;
  top: 0px;
  right: 0;
  width: 353px;
  height: 100%;
  background-color: white;
  z-index: 2;
  box-shadow: 0px 2px 10px #00000010;
  padding: 27px 20px;
  animation-delay: 5s;
  animation: ${fadein} 1s;
  animation-fill-mode: forwards;
  overflow: auto;
`;

const UserInfoWrap = styled.div`
  width: 100%;
  min-height: 150px;
`;

const UserInfoLayout = styled.div`
  ${({theme}) => theme.flexSet('space-between')};
  width: 100%;
  height: 80%;
`;

const CloseLayout = styled.div`
  ${({theme}) => theme.flexSet('flex-end', '', '')};
  height: fit-content;
  color: ${({theme}) => theme.colorSet.SECONDARY.GRAY_79};
`;

const ProfileLayout = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 1px solid black;
`;

const UserDetailInfoLayout = styled.div`
  width: calc(100% - 130px);
  height: 100%;
  padding: 13px;
`;

const ItemLayout = styled.div`
  width: 100%;
  height: 45%;
`;

const AtvInfoLayout = styled.div`
  ${({theme}) => theme.flexSet('space-around', '', 'column')};
  width: 100%;
  height: 400px;
  padding: 40px 0px;
  border-top: 0.5px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_CC};
  border-bottom: 0.5px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_CC};
`;

const AtmItemLayout = styled.div`
  ${({theme}) => theme.flexSet('space-between')};
  width: 90%;
  height: 50px;
`;

const ItemLabel = styled.label`
  ${({theme}) => theme.flexSet('flex-end')};
  font-size: 17px;
  color:black;
  min-width: 85px;
  font-weight:bold;
`;

const BtnLayout = styled.div`
  ${({theme}) => theme.flexSet('space-around', '', 'column')};
  width: 100%;
  height: 150px;
`;

const DropboxLayout = styled.div`
  ${({theme}) => theme.flexSet('flex-end')};
  width: 140px;
`;

const Btn = styled.button`
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  padding: 15px;
  border-radius: 5px;
  background-color: ${({bgColor}) => bgColor};
  color: white;
`;

export const style = {
  Wrap,
  Container,
  UserInfoWrap,
  UserInfoLayout,
  CloseLayout,
  ProfileLayout,
  UserDetailInfoLayout,
  ItemLayout,
  AtvInfoLayout,
  ItemLabel,
  AtmItemLayout,
  DropboxLayout,
  BtnLayout,
  Btn,
};