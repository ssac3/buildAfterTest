import React, {useState} from 'react';
import {style} from './DetailDavPageStyle';
import AtndcLabel from 'components/AtndcLabel';
import PropTypes from 'prop-types';
import {MdArrowForwardIos} from 'react-icons/md';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {TextField} from '@mui/material';
import theme from 'styles/theme';

const RearrangeEnrollComponent = ({start, end}) => {
  console.log(start, end);
  const [startTime, setStartTime] = useState(new Date(start) || null);
  const [endTime, setEndTime] = useState(new Date(end) || null);

  return (
    <>
      <RearrangeTitle>
        <div id={'title'}>조정 신청</div>
        <div id={'subTitle'}>이상 근태에 대한 조정 사유를 적어 요청합니다.</div>
      </RearrangeTitle>
      <TimeLayout>
        <InputLayout>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="출근 시간"
              value={startTime || null}
              ampm={false}
              onChange={(newValue) => {
                setStartTime(newValue);
              }}
              renderInput={(params) => <TextField {...params} color={'grey'}/>}
            />
          </LocalizationProvider>
        </InputLayout>
        <InputLayout>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label={'퇴근시간'}
              minTime={startTime}
              value={endTime || null}
              ampm={false}
              onChange={(newValue) => {
                setEndTime(newValue);
              }}
              renderInput={(params) => <TextField {...params} color={'grey'}/>}
            />
          </LocalizationProvider>
        </InputLayout>
      </TimeLayout>
      <ContentLayout placeholder={'조정사유를 입력하세요'} multiline/>
      <BtnLayout>
        <Btn bgColor={theme.colorSet.SECONDARY.GRAY_CC}>취소</Btn>
        <Btn bgColor={theme.colorSet.SECONDARY.GRAY_5B}>확인</Btn>
      </BtnLayout>
    </>
  );
};


export const DetailDavPage = ({detailInfo, onClickDavDetail}) => {
  const date = detailInfo[0]?.aDate !== null ? detailInfo[0].aDate : detailInfo[0].vDate;
  const status = {status: detailInfo[0]?.aStatus,
    vStatus: detailInfo[0]?.vApprovalFlag,
    vType: detailInfo[0]?.vType};
  const cnvrtTime = (target) => {
    let result = '-- : --';
    if(target !== null) {
      result = target;
    }
    return result;
  };
  return (
    <Wrapper onClick={() => onClickDavDetail([])}>
      <Container onClick={(e) => e.stopPropagation()}>
        <TextLayout>
          <h2>근태 상세 정보</h2>
          <h3>해당 날짜의 근태 정보를 조회합니다.</h3>
        </TextLayout>
        <DateLayout>
          {date}
        </DateLayout>

        <InfoLayout>
          <LabelLayout>
            <AtndcLabel status={status}/>
          </LabelLayout>

          <DataLayout>
            <BoxLayout>
              <div id={'title'}>출근 시간</div>
              <div id={'time'}>{cnvrtTime(detailInfo[0].aStartTime)}</div>
            </BoxLayout>

            <MdArrowForwardIos size={25}/>

            <BoxLayout>
              <div id={'title'}>퇴근 시간</div>
              <div id={'time'}>{cnvrtTime(detailInfo[0].aEndTime)}
              </div>
            </BoxLayout>
          </DataLayout>
        </InfoLayout>

        <RearrangeLayout>
          {status.status === '2' &&
            <RearrangeEnrollComponent
              start={detailInfo[0]?.aStartTime ?? ''}
              end={detailInfo[0]?.aEndTime ?? ''}
            />}
        </RearrangeLayout>
      </Container>
    </Wrapper>
  );
};

const {
  Wrapper,
  Container,
  TextLayout,
  DateLayout,
  InfoLayout,
  LabelLayout,
  DataLayout,
  BoxLayout,
  RearrangeLayout,
  RearrangeTitle,
  TimeLayout,
  InputLayout,
  ContentLayout,
  BtnLayout,
  Btn
} = style;

DetailDavPage.propTypes = {
  detailInfo:PropTypes.arrayOf(PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  )).isRequired,
  onClickDavDetail:PropTypes.func.isRequired,
};

RearrangeEnrollComponent.propTypes = {
  start: PropTypes.string.isRequired,
  end :PropTypes.string.isRequired,
};
