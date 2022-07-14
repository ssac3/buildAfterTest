import React, {useState, useEffect} from 'react';
import {style} from './VacationEnrollStyle';
import PropTypes from 'prop-types';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import theme from 'styles/theme';
import Dropbox from 'components/Dropbox';
import {VACATION_TYPE} from 'utils/constants';
import {useDispatch} from 'react-redux';
import {SwpVaReq} from 'redux/actions/UserAction';

export const VacationEnrollPage = ({openVaeDetail, onClickVaeDetail}) => {
  const dispatch = useDispatch();
  const clickDate = openVaeDetail !== '' && openVaeDetail.format('YYYY-MM-DD');
  const [enrollDate] = useState(new Date(clickDate));
  const [openVType, setOpenVType] = useState(false);
  const [selectVType, setSelectVType] = useState('선택하세요');
  const [contents, setConetents] = useState('');
  const [vacationType, setVacationType] = useState('');
  const aId = null;
  const onClosePage = () => {
    onClickVaeDetail('');
  };

  const onCloseDropBox = () => {
    setOpenVType(!openVType);
  };

  const onSelectDropBoxItem = (e) => {
    setSelectVType(e.target.id);
    onCloseDropBox();
  };

  const onReqVac = () => {
    if(clickDate !== null && vacationType !== '' && contents !== '') {
      if(window.confirm('정말로 휴가를 신청하시겠습니까.')) {
        dispatch(SwpVaReq(aId, clickDate, vacationType, contents));
        onClickVaeDetail('');
      }
    } else {
      alert('휴가 정보를 정확히 입력해 주세요');
    }
  };

  const onChangeContents = (e) => {
    setConetents(e.target.value);
  };

  useEffect(() => {
    switch (selectVType) {
      case '전일':
        setVacationType('0');
        break;
      case '오전':
        setVacationType('1');
        break;
      case '오후':
        setVacationType('2');
        break;
      default:
    }
  }, [selectVType]);
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
          <Title>휴가 사유</Title>
          <InputContainer value={contents} onChange={onChangeContents}/>
        </DataWrapper2>
        {
          <BtnLayout>
            <Btn bgColor={theme.colorSet.SECONDARY.GRAY_CC} onClick={onClosePage}>취소</Btn>
            <Btn bgColor={theme.colorSet.SECONDARY.GRAY_5B} onClick={onReqVac} >확인 </Btn>
          </BtnLayout>
        }
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