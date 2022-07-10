import styled from 'styled-components';
const getColor = ({vApprovalFlag, theme}) => {
  let color;
  if (vApprovalFlag === 2) {
    color = theme.colorSet.ATTENDANCE_STATUS.ABSENCE;
  } else if (vApprovalFlag === 1) {
    color = theme.colorSet.ATTENDANCE_STATUS.VACATION;
  } else color = theme.colorSet.SECONDARY.GRAY_CC;
  return color;
};
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
  }) => (getColor({vApprovalFlag, theme}))};
`;
const AfternoonItem = styled.div`
  visibility: ${({vType}) => (vType !== '1' ? 'visible' : 'hidden')};
  width: 50%;
  height: 100%;
  background-color: ${
  ({
    vApprovalFlag, theme
  }) => (getColor({vApprovalFlag, theme}))};
`;

export const style = {
  Container,
  EveningItem,
  AfternoonItem,
};