import React from 'react';
import PropTypes from 'prop-types';
import {style} from './VacationViewPageStyle';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {CalendarPicker} from '@mui/x-date-pickers/CalendarPicker';
import {cnvrtDate} from 'utils/convertDateTime';
import {VACATION_TYPE} from 'utils/constants';
import theme from 'styles/theme';
import {useDispatch} from 'react-redux';
import {SwpVcReq} from 'redux/actions/UserAction';

export const VacationViewPage = ({vav, onClickVavDetail}) => {
  const dispatch = useDispatch();
  const date = new Date(vav[0].vDate);
  const vId = vav[0]?.vId;
  const vDate = vav[0]?.vDate;
  const vType = VACATION_TYPE.filter(
    (v) => v.id === Number(vav[0].vType) && v
  )[0].title;
  const onCloseModal = () => {
    onClickVavDetail([]);
  };
  const onCancelVac = () => {
    if(window.confirm('정말로 휴가를 취소하겠습니까?')) {
      dispatch(SwpVcReq(vId, vDate));
      onClickVavDetail([]);
    }
  };

  return (
    <Wrapper onClick={onCloseModal}>
      <Container onClick={(e) => e.stopPropagation()}>
        <TextLayout>
          <h2>휴가 조회 / 취소</h2>
          <h3>해당 날짜의 휴가를 조회하거나 취소합니다.</h3>
        </TextLayout>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CalendarPicker
            date={date}
            readOnly
            onChange={() => date}
          />
        </LocalizationProvider>
        <DataWrapper>
          <DataItemLayout>
            <Title>휴가 신청일</Title>
            <InputContainer w={90} value={cnvrtDate(date)} readOnly/>
          </DataItemLayout>
          <DataItemLayout>
            <Title>휴가 종류</Title>
            <InputContainer w={90} value={vType} readOnly/>
          </DataItemLayout>
        </DataWrapper>
        <DataWrapper2>
          <Title>휴가 사유</Title>
          <InputContainer w={100} value={vav[0].vContents} readOnly/>
        </DataWrapper2>

        {
          vav[0]?.vId !== null ?
            <BtnLayout>
              <Btn bgColor={theme.colorSet.SECONDARY.GRAY_CC} onClick={onCancelVac}>휴가 취소</Btn>
            </BtnLayout> :
            <BtnLayout>
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
  Btn
} = style;


VacationViewPage.propTypes = {
  onClickVavDetail:PropTypes.func.isRequired,
  vav:PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
  ).isRequired,
};
