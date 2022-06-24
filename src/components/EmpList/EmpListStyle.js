import styled from 'styled-components';

// 수정해야됨(윤지)
const ul = styled.div`
  position: absolute;
  top: 70px;
  left: ${({w}) => w};
  width: 80%; // 여기부터 작업
  height: calc(100% - 70px);
  background-color: blue;
`;



export const style = {ul};