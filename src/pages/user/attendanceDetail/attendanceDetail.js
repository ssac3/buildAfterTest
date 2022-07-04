import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.min.css';
import {TimePicker} from 'antd';
import {style} from './attendanceDetailStyle';
import {MdOutlineClose} from 'react-icons/md';
import moment from 'moment';
import theme from 'styles/theme';
export const attendanceDetail = ({onClickATD, atDetail}) => {
  console.log(atDetail);
  const getAStatus = () => {
    let result;
    switch (atDetail.aStatus) {
      case '0':
        result = '정상출근';
        break;
      case '1':
        result = '지각';
        break;
      case '2':
        result = '결근';
        break;
      default:
    }
    console.log(result);
    return result;
  };
  const getVStatus = () => {
    let result;
    switch (atDetail.vType) {
      case '0':
        result = '전일 휴가';
        break;
      case '1':
        result = '오전 휴가';
        break;
      case '2':
        result = '오후 휴가';
        break;
      default:
        result = null;
    }
    return result;
  };
  const cvntTime = (time) => {
    return time?.substring(11, 19);
  };
  // const getRStatus = () => {  }
  return (
    <Wrap>
      <Container>
        <CloseLayout>
          <MdOutlineClose size={25} onClick={() => onClickATD(0)} style={{cursor: 'pointer'}}/>
        </CloseLayout>
        <Title>
          <h2>출퇴근 상세정보</h2>
          <h3>해당 날짜의 근태정보를 조회합니다.</h3>
        </Title>
        <ItemLayout>
          <AttendanceBox>
            <MoveDateLayout>
              <ItemLayout>
                <button type={'button'}> -- </button>
                <selectDate>
                  {atDetail.aDate}
                </selectDate>
                <button type={'button'}> -- </button>
              </ItemLayout>
            </MoveDateLayout>
            <AtdBLayout>
              {atDetail.vType !== '0' && atDetail.aId !== null ? <div>{getAStatus()}</div> : null}
              {atDetail.vId !== null ? <div>{getVStatus()}</div> : null}

              <ItemLayout>
                <TimeBox legend={''}>
                  <TimePicker defaultValue={moment(`${atDetail.aStartTime}`, 'HH:mm:ss')} />
                </TimeBox>
                <TimePicker defaultValue={moment(`${atDetail.aEndTime}`, 'HH:mm:ss')} />
              </ItemLayout>
            </AtdBLayout>
          </AttendanceBox>
        </ItemLayout>
        {atDetail?.aStatus !== '0' ?
          <RearrangeLayout>
            <ItemLayout>
              <Title>
                <h2>조정 신청</h2>
                <h3>이상 근태에 대한 조정 사유를 적어 요청합니다.</h3>
              </Title>
            </ItemLayout>
            <ItemLayout>
              <TimeBox legend={''}>
                <TimePicker defaultValue={moment(`${cvntTime(atDetail.rStartTime)}`, 'HH:mm:ss')} />
              </TimeBox>
              <TimePicker defaultValue={moment(`${cvntTime(atDetail.rEndTime)}`, 'HH:mm:ss')} />
            </ItemLayout>
            <ItemLayout>
              <h3>조정 사유</h3>
              <textarea>
              </textarea>
            </ItemLayout>
            <ItemLayout>
              <BtnLayout>
                <Btn
                  bgColor={theme.colorSet.SECONDARY.GRAY_CC}
                  onClick={() => onClickATD(0)}
                >
                  취소
                </Btn>
                <Btn bgColor={theme.colorSet.SECONDARY.GRAY_5B}>확인</Btn>
              </BtnLayout>
            </ItemLayout>
          </RearrangeLayout> : null}
      </Container>
    </Wrap>
  );
};
attendanceDetail.propTypes = {
  onClickATD: PropTypes.func.isRequired,
  onClickVD: PropTypes.func.isRequired,
  atDetail: PropTypes.oneOfType([PropTypes.string,
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
  ]).isRequired,
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
  RearrangeLayout,
  BtnLayout,
  Btn,
} = style;
//
