import React from 'react';
// import PropTypes from 'prop-types';
import 'antd/dist/antd.min.css';
import {TimePicker} from 'antd';
import {style} from './attendanceDetailStyle';
import {MdOutlineClose} from 'react-icons/md';
import moment from 'moment';
export const attendanceDetail = () => {
  return (
    <Wrap>
      <Container>
        <CloseLayout>
          <MdOutlineClose size={25} style={{cursor: 'pointer'}}/>
        </CloseLayout>
        <Title>
          <h2>출퇴근 상세정보</h2>
          <h3>해당 날짜의 근태정보를 조회합니다.</h3>
        </Title>
        <ItemLayout>

          <AttendanceBox>
            <MoveDateLayout>
              <ItemLayout>
                <button type={'button'}>--</button>
                <selectDate>
                  2022/07/01
                </selectDate>
                <button type={'button'}> -- </button>
              </ItemLayout>
            </MoveDateLayout>
            <AtdBLayout>

              <div> 정상 출근</div>
              <ItemLayout>
                <TimeBox legend={''}>
                  <TimePicker defaultValue={moment('08:50:10', 'HH:mm:ss')} />
                </TimeBox>

                <TimePicker defaultValue={moment('18:10:10', 'HH:mm:ss')} />
              </ItemLayout>
            </AtdBLayout>

          </AttendanceBox>

        </ItemLayout>
      </Container>
    </Wrap>
  );
};

const {
  Wrap,
  Container,
  CloseLayout,
  ItemLayout,
  AttendanceBox,
  Title,
  MoveDateLayout,
  AtdBLayout,
  TimeBox,
} = style;