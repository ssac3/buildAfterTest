import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 20px;
`;

const EveningItem = styled.div`
  visibility: ${({vType}) => (vType !== '2' ? 'visible' : 'hidden')};
  width: 50%;
  height: 100%;
  background-color: ${
  ({
    vApprovalFlag, theme
  }) => (vApprovalFlag === 1 ? theme.colorSet.ATTENDANCE_STATUS.VACATION : theme.colorSet.SECONDARY.GRAY_CC)};
`;

const AfternoonItem = styled.div`
  visibility: ${({vType}) => (vType !== '1' ? 'visible' : 'hidden')};
  width: 50%;
  height: 100%;
  background-color: ${
  ({
    vApprovalFlag, theme
  }) => (vApprovalFlag === 1 ? theme.colorSet.ATTENDANCE_STATUS.VACATION : theme.colorSet.SECONDARY.GRAY_CC)};
`;

export const style = {
  Container,
  EveningItem,
  AfternoonItem,
};