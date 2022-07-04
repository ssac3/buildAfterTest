import React, {useEffect} from 'react';
import {style} from './DetailEmplAtndcStyle';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import AtndcLabel from 'components/AtndcLabel';

export const DetailEmplAtndc = ({openEadDetail, onClickEadDetail}) => {
  const selector = useSelector((state) => state.MangerReducer);
  const date = openEadDetail[0]?.date !== null ? openEadDetail[0].date : openEadDetail[0].vDate;
  const status = {status: openEadDetail[0]?.status,
    vStatus: openEadDetail[0].vApprovalFlag,
    vType: openEadDetail[0].vType};

  useEffect(() => {
    console.log(openEadDetail);
    console.log(selector);
    console.log(date);
  }, []);
  return (
    <Wrapper onClick={() => onClickEadDetail(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <TextLayout>
          <h2>근태 상세 정보</h2>
          <h3>해당 날짜의 근태 정보를 조회합니다.</h3>
        </TextLayout>
        <InfoLayout>
          <DateLayout>
            {date}
          </DateLayout>
          <LabelLayout>
            <AtndcLabel status={status}/>
          </LabelLayout>
        </InfoLayout>
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
} = style;

DetailEmplAtndc.propTypes = {
  openEadDetail   : PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string]))
  ).isRequired,
  onClickEadDetail: PropTypes.func.isRequired,
};