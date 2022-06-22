import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {style} from './SettingStyle';
import {MdOutlineClose} from 'react-icons/md';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {TextField} from '@mui/material';
import {convertTime} from 'utils/constants/convertTime';
import theme from 'styles/theme';

const TEAM_NAME = '플랫폼 프론트엔드';

export const Setting = ({open}) => {
  const [startTime, setStartTime] = useState(new Date(2022, 6, 20, 9, 0, 0) || null);
  const [endTime, setEndTime] = useState(new Date(2022, 6, 20, 18, 0, 0) || null);
  const [workingTime, setWorkingTime] = useState(convertTime((endTime.getHours() - startTime.getHours())).concat('시간 ').concat(convertTime(endTime.getMinutes() - startTime.getMinutes())).concat('분'));

  useEffect(() => {
    setWorkingTime(convertTime((endTime.getHours() - startTime.getHours()).toString()).concat('시간 ').concat(convertTime((endTime.getMinutes() - startTime.getMinutes()).toString()).concat('분')));
  }, [startTime, endTime]);


  return (
    <Wrap>
      <Container>
        <TextLayout>
          <CloseLayout>
            <MdOutlineClose size={25} onClick={open} style={{cursor: 'pointer'}}/>
          </CloseLayout>
          <h2>정규 출/퇴근 시간</h2>
          <h3>
            {TEAM_NAME}
            팀의 출/퇴근 시간입니다.
          </h3>
          <h4>사원들이 지치지 않도록 유연하게 출/퇴근 시간을 설정할 수 있습니다.</h4>
        </TextLayout>

        <InputWrap>
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
                value={endTime || null}
                ampm={false}
                onChange={(newValue) => {
                  setEndTime(newValue);
                }}
                renderInput={(params) => <TextField {...params} color={'grey'}/>}
              />
            </LocalizationProvider>
          </InputLayout>
          <InputLayout>
            <TextField label={'근무시간'} readOnly disabled focused={false} variant={'outlined'} value={workingTime} />
          </InputLayout>
        </InputWrap>
        <BtnLayout>
          <Btn bgColor={theme.colorSet.SECONDARY.GRAY_CC}>취소</Btn>
          <Btn bgColor={theme.colorSet.SECONDARY.GRAY_5B}>확인</Btn>
        </BtnLayout>
      </Container>
    </Wrap>
  );
};

Setting.propTypes = {
  open: PropTypes.func.isRequired,
};

const {
  Container,
  Wrap,
  TextLayout,
  CloseLayout,
  InputWrap,
  InputLayout,
  BtnLayout,
  Btn,
} = style;