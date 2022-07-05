import React, {useState} from 'react';
import {style} from './VacationEnrollStyle';
import PropTypes from 'prop-types';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import theme from 'styles/theme';
import Dropbox from 'components/Dropbox';
import {VACATION_TYPE} from 'utils/constants';

export const VacationEnrollPage = ({openVaeDetail, onClickVaeDetail}) => {
  const clickDate = openVaeDetail !== '' && openVaeDetail.format('YYYY-MM-DD');
  const [enrollDate] = useState(new Date(clickDate));
  const [openVType, setOpenVType] = useState(false);
  const [selectVType, setSelectVType] = useState('선택하세요');
  const onClosePage = () => {
    onClickVaeDetail('');
  };

  const onCloseDropBox = () => {
    setOpenVType(!openVType);
  };

  const onSelectDropBoxItem = (e) => {
    console.log(e.target.id);
    setSelectVType(e.target.id);
    onCloseDropBox();
  };
  return (
    <Wrapper onClick={onClosePage}>
      <Container onClick={(e) => e.stopPropagation()}>
        <TextLayout>
          <h2>휴가 신청</h2>
          <h3>해당 날짜에 휴가를 신청합니다.</h3>
        </TextLayout>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CalendarPicker
            date={enrollDate}
            readOnly
            onChange={() => enrollDate}
          />
        </LocalizationProvider>
        <DataWrapper>
          <DataItemLayout>
            <Title>휴가 신청일</Title>
            <InputContainer value={clickDate} readOnly/>
          </DataItemLayout>
          <DataItemLayout>
            <Title>휴가 종류</Title>
            <Dropbox
              open={openVType}
              onClickDropBox={onCloseDropBox}
              menu={VACATION_TYPE}
              select={selectVType}
              onClickDropBoxItem={onSelectDropBoxItem}
            />
          </DataItemLayout>
        </DataWrapper>
        <DataWrapper2>
          <Title>휴가 신청일</Title>
          <InputContainer/>
        </DataWrapper2>
        <BtnLayout>
          <Btn bgColor={theme.colorSet.SECONDARY.GRAY_CC} onClick={onClosePage}>취소</Btn>
          <Btn bgColor={theme.colorSet.SECONDARY.GRAY_5B}>확인</Btn>
        </BtnLayout>
      </Container>
    </Wrapper>
  );
};

const {
  Wrapper,
  Container,
  TextLayout,
  DataWrapper,
  DataWrapper2,
  DataItemLayout,
  Title,
  InputContainer,
  BtnLayout,
  Btn,
} = style;

VacationEnrollPage.propTypes = {
  openVaeDetail: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.any])
  ).isRequired,
  onClickVaeDetail:PropTypes.func.isRequired,
};