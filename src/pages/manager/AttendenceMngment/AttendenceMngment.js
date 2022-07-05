import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {style} from './AttendenceMngmentStyle';
import Label from 'components/Label';
import {MdModeEditOutline} from 'react-icons/md';
import {useDispatch, useSelector} from 'react-redux';
import {SwpRavReq} from 'redux/actions/ManagerAction';
import {cnvrtDate, cnvrtTime} from 'utils/convertDateTime';
import {LOCAL_STORAGE, MANAGER_APPROVAL_TYPE} from 'utils/constants';
import Pagination from 'components/Pagination';

const ListItemComponent = ({item, onClickATR}) => {
  let [startHour, startMin, endHour, endMin] = [0, 0, 0, 0];
  if(item.startTime !== null && item.endTime !== null) {
    const startTime = item.startTime.split(':');
    const endTime = item.endTime.split(':');
    startHour = Number(startTime[0]);
    startMin = Number(startTime[1]);
    endHour = Number(endTime[0]);
    endMin = Number(endTime[1]);
  }
  const resultStartTime = cnvrtTime(new Date(
    0,
    0,
    0,
    startHour,
    startMin,
  )).replace('00:00', '--:--');
  const resultEndTime = cnvrtTime(new Date(
    0,
    0,
    0,
    endHour,
    endMin,
  )).replace('00:00', '--:--');

  return(
    <ListItemContainer>
      <ItemContainer>{item.username}</ItemContainer>
      <ItemContainer>{item.name}</ItemContainer>
      <ItemContainer>{cnvrtDate(new Date(item.rStartTime))}</ItemContainer>
      <ItemContainer>{item.contents}</ItemContainer>
      <ItemContainer>
        {cnvrtTime(new Date(item.rStartTime))
          .concat('~')
          .concat(cnvrtTime(new Date(item.rEndTime)))}
      </ItemContainer>
      <ItemContainer>
        {resultStartTime.concat(' ~ ').concat(resultEndTime)}
      </ItemContainer>
      <ItemContainer>
        <Label type={MANAGER_APPROVAL_TYPE[Number(item.approvalFlag)].title}/>
      </ItemContainer>
      <ItemContainer>
        <IconLayout>
          <MdModeEditOutline size={20} onClick={onClickATR}/>
        </IconLayout>
      </ItemContainer>
    </ListItemContainer>
  );
};


export const AttendenceMngment = ({onClickATR}) => {
  const dispatch = useDispatch();
  const [infos, setInfos] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 8;
  const offset = (page - 1) * limit;
  const selector = useSelector((state) => state.MangerReducer);

  useEffect(() => {
    console.log('RAV');
    dispatch(SwpRavReq(LOCAL_STORAGE.get('depId')));
  }, []);


  useEffect(() => {
    if(selector.data?.length > 0 && selector.data[0]?.rId !== undefined) {
      setInfos(selector.data);
    } else {
      setInfos([]);
    }
  }, [selector]);

  return (
    <Wrapper>
      <TitleContainer/>

      <Container>
        <ListContainer>
          <HeaderContainer>
            <InnerLayout>사원번호</InnerLayout>
            <InnerLayout>사원명</InnerLayout>
            <InnerLayout>조정 요청일</InnerLayout>
            <InnerLayout>사유</InnerLayout>
            <InnerLayout>조정 요청 시간</InnerLayout>
            <InnerLayout>기존 근태 시간</InnerLayout>
            <InnerLayout>상태</InnerLayout>
            <InnerLayout>수정</InnerLayout>
          </HeaderContainer>

          {infos?.slice(offset, offset + limit).map((item) => (
            <ListItemComponent key={item.rId} item={item} onClickATR={() => onClickATR(item.rId)}/>
          ))}

          <Pagination
            total={infos?.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </ListContainer>
      </Container>
    </Wrapper>
  );
};
AttendenceMngment.propTypes = {
  onClickATR: PropTypes.func.isRequired,
};

ListItemComponent.propTypes = {
  item: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  onClickATR: PropTypes.func.isRequired,
};

const {
  Wrapper,
  TitleContainer,
  Container,
  ListContainer,
  HeaderContainer,
  InnerLayout,
  ListItemContainer,
  ItemContainer,
  IconLayout,
} = style;