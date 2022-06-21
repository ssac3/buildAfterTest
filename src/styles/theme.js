import { css } from 'styled-components';
const flexSet = (justify = 'center', item = 'center', direction = 'row') => css`
  display: flex;
  justify-content: ${justify};
  align-items: ${item};
  flex-direction: ${direction};
`;
const colorSet = {
  PRIMARY: {
    BLUE_1A:'#1A83FE',
    BLUE_04:'#0454D1',
    BLUE_51:'#5194FE'
  },

  SECONDARY:{
    GRAY_5B:'#5B5B5B',
    GRAY_CC:'#CCCCCC',
    GRAY_54:'#545454',
    GRAY_BE:'#BEBEBE',
    GRAY_79:'#797979',
    GRAY_E1:'#E1E1E1',
  },
  // 근태 상태 색상
  ATTENDANCE_STATUS: {
    OK:'#4F9B2B',
    VACATION:'#0FC6C2',
    LATE:'#FFA800',
    ABSENCE:'#E20000'
  },
  // 승인 여부 색상
  APPROVAL_STATUS:{
    WAITING:'#0500E2',
    OK:'#4F9B2B',
    REJECT:'#E20000',
  },

  ALERT:{
    SUCCESS_BACK:'#EDF9F0',
    FAIL_BACK:'#FEBAAB',

    SUCCESS_FONT:'#1A83FE',
    FAIL_FONT:'#FF0000'
  },


};
const theme = { flexSet, colorSet };
export default theme;

