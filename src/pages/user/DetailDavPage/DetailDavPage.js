import React, {useState, useEffect} from 'react';
import {style} from './DetailDavPageStyle';
import AtndcLabel from 'components/AtndcLabel';
import PropTypes from 'prop-types';
import {MdArrowForwardIos} from 'react-icons/md';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {TextField} from '@mui/material';
import theme from 'styles/theme';
import {useDispatch} from 'react-redux';
import {SwpAarReq, SwpVcReq} from 'redux/actions/UserAction';

const RearrangeEnrollComponent = ({start, end, detailInfo, onClickDavDetail}) => {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState(new Date(detailInfo[0]?.rStartTime) || null);
  const [endTime, setEndTime] = useState(new Date(detailInfo[0]?.rEndTime) || null);
  const [reqSTime, setReqSTime] = useState();
  const [reqETime, setReqETime] = useState();
  const [contents, setContents] = useState(detailInfo[0]?.rContents);
  const onReaReq = () => {
    dispatch(SwpAarReq(
      detailInfo[0].aId,
      detailInfo[0].aDate.concat(' ') + reqSTime,
      detailInfo[0].aDate.concat(' ') + reqETime,
      contents
    ));
    onClickDavDetail([]);
  };
  console.log(start + end);
  const onChangeConText = (e) => {
    setContents(e.target.value);
  };
  useEffect(() => {
    console.log(startTime);
    setReqSTime(startTime.toTimeString().substring(0, 8));
    setReqETime(endTime.toTimeString().substring(0, 8));
  }, [startTime, endTime]);
  return (
    <>
      <RearrangeTitle>
        {
          detailInfo[0]?.rId !== null ?
            <div id={'title'}>조정 신청 내역 조회</div> :
            <div id={'title'}>조정 신청</div>
        }

        <div id={'subTitle'}>이상 근태에 대한 조정 사유를 적어 요청합니다.</div>
      </RearrangeTitle>
      <TimeLayout>
        <InputLayout>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {
              detailInfo[0]?.rStartTime !== null ?
                <TimePicker
                  label="출근 시간"
                  // value={detailInfo[0]?.rStartTime.toTimeString().substring(0, 8) || null}
                  value={startTime || null}
                  ampm={false}
                  readOnly
                  onChange={(newValue) => {
                    setStartTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} color={'grey'}/>}
                /> :
                <TimePicker
                  label="출근 시간"
                  value={startTime || null}
                  ampm={false}
                  onChange={(newValue) => {
                    setStartTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} color={'grey'}/>}
                />

            }
          </LocalizationProvider>
        </InputLayout>
        <InputLayout>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {
              detailInfo[0]?.rEndTime !== null ?
                <TimePicker
                  label={'퇴근시간'}
                  minTime={startTime}
                  // value={detailInfo[0]?.rEndTime.toTimeString().substring(0, 8) || null}
                  value={endTime || null}
                  ampm={false}
                  readOnly
                  onChange={(newValue) => {
                    setEndTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} color={'grey'}/>}
                /> :
                <TimePicker
                  label={'퇴근시간'}
                  minTime={startTime}
                  // value={detailInfo[0]?.rEndTime.toTimeString().substring(0, 8) || null}
                  value={endTime || null}
                  ampm={false}
                  onChange={(newValue) => {
                    setEndTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} color={'grey'}/>}
                />
            }


          </LocalizationProvider>
        </InputLayout>
      </TimeLayout>
      <ContentLayout onChange={onChangeConText} value={contents} placeholder={'조정사유를 입력하세요'} multiline/>
      {
        detailInfo[0]?.rId === null ?
          <BtnLayout>
            <Btn bgColor={theme.colorSet.SECONDARY.GRAY_5B} onClick={onReaReq}>조정 요청</Btn>
          </BtnLayout> :
          <BtnLayout></BtnLayout>
      }

    </>
  );
};


export const DetailDavPage = ({detailInfo, onClickDavDetail}) => {
  const dispatch = useDispatch();
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
  const onCancelVac = () => {
    if(window.confirm('정말로 휴가를 취소하겠습니까?')) {
      dispatch(SwpVcReq(detailInfo[0]?.vId, detailInfo[0]?.vDate));
      onClickDavDetail([]);
    } else {
      console.log('취소 안함');
    }
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
          {(status.status !== '0' && status.status !== null) &&
            <RearrangeEnrollComponent
              start={detailInfo[0]?.aStartTime ?? ''}
              end={detailInfo[0]?.aEndTime ?? ''}
              detailInfo={detailInfo}
              onClickDavDetail={onClickDavDetail}
            />}
        </RearrangeLayout>
        {status.vStatus !== null &&
          <BtnLayout>
            <Btn bgColor={theme.colorSet.SECONDARY.GRAY_CC} onClick={onCancelVac}>휴가 취소</Btn>
          </BtnLayout>}
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
  detailInfo:PropTypes.arrayOf(PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  )).isRequired,
  onClickDavDetail:PropTypes.func.isRequired,
};
