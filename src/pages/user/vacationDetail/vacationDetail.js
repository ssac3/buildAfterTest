import React from 'react';
import {MdOutlineClose} from 'react-icons/md';
import {style} from './vacationDetailStyle';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {TextField} from '@mui/material';
export const vacationDetail = ({onClickVD, vDetail}) => {
  console.log(vDetail);
  // const getVTitle = () => {
  // }
  return(
    <Wrap>
      <Container>
        <CloseLayout>
          <MdOutlineClose size={25} onClick={() => onClickVD(0)} style={{cursor: 'pointer'}}/>
        </CloseLayout>
        <Title>
          <h2>휴가 상세정보</h2>
          <h3>해당 날짜의 휴가정보를 조회합니다.</h3>
        </Title>
        <ItemLayout>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="출근 시간"
              value={'00:00:00'}
              ampm={false}
              renderInput={(params) => <TextField {...params} color={'grey'}/>}
            />
          </LocalizationProvider>
        </ItemLayout>

      </Container>
    </Wrap>
  );
};
// <ItemLayout>
//   <AttendanceBox>
//     <MoveDateLayout>
//       <ItemLayout>
//         <button type={'button'}> -- </button>
//         <selectDate>
//           {atDetail.aDate}
//         </selectDate>
//         <button type={'button'}> -- </button>
//       </ItemLayout>
//     </MoveDateLayout>
//     <AtdBLayout>
//       {atDetail.vType !== '0' && atDetail.aId !== null ? <div>{getAStatus()}</div> : null}
//       {atDetail.vId !== null ? <div>{getVStatus()}</div> : null}
//
//       <ItemLayout>
//         <TimeBox legend={''}>
//           <TimePicker defaultValue={moment(`${atDetail.aStartTime}`, 'HH:mm:ss')} />
//         </TimeBox>
//         <TimePicker defaultValue={moment(`${atDetail.aEndTime}`, 'HH:mm:ss')} />
//       </ItemLayout>
//     </AtdBLayout>
//   </AttendanceBox>
// </ItemLayout>
const {
  Wrap,
  Container,
  CloseLayout,
  ItemLayout,
  Title,
} = style;

//   AttendanceBox,
//   MoveDateLayout,
//   AtdBLayout,
//   TimeBox,
//   RearrangeLayout,
//   BtnLayout,
//   Btn,
