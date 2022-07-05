import React from 'react';
import {style} from './DetailEmplAtndcStyle';
import PropTypes from 'prop-types';
import AtndcLabel from 'components/AtndcLabel';
import {MdArrowForwardIos} from 'react-icons/md';

export const DetailEmplAtndc = ({openEadDetail, onClickEadDetail}) => {
  const date = openEadDetail[0]?.date !== null ? openEadDetail[0].date : openEadDetail[0].vDate;
  const status = {status: openEadDetail[0]?.status,
    vStatus: openEadDetail[0].vApprovalFlag,
    vType: openEadDetail[0].vType};
  const cnvrtTime = (target) => {
    let result = '-- : --';
    if(target !== null) {
      result = target;
    }
    return result;
  };
  return (
    <Wrapper onClick={() => onClickEadDetail(null)}>
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
              <div id={'time'}>{cnvrtTime(openEadDetail[0].startTime)}</div>
            </BoxLayout>

            <MdArrowForwardIos size={25}/>

            <BoxLayout>
              <div id={'title'}>퇴근 시간</div>
              <div id={'time'}>{cnvrtTime(openEadDetail[0].endTime)}
              </div>
            </BoxLayout>
          </DataLayout>
        </InfoLayout>
        <VacationInput>
          {openEadDetail[0]?.vType !== null &&
          <>
            <div id={'title'}>휴가 사유</div>
            <div id={'contents'}>{openEadDetail[0]?.vContents}</div>
          </>}
        </VacationInput>
      </Container>
    </Wrapper>
  );
};

const {
  Wrapper,
  Container,
  TextLayout,
  InfoLayout,
  DateLayout,
  LabelLayout,
  DataLayout,
  BoxLayout,
  VacationInput,
} = style;

DetailEmplAtndc.propTypes = {
  openEadDetail   : PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string]))
  ).isRequired,
  onClickEadDetail: PropTypes.func.isRequired,
};