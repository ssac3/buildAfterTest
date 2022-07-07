import React, {useState, useEffect} from 'react';
import {style} from './ReportEmvPageStyle';
import {useDispatch, useSelector} from 'react-redux';
import {SwpEivReq} from 'redux/actions/ManagerAction';
import {GENDER_TYPE, LOCAL_STORAGE} from 'utils/constants';
import {cnvrtDate} from 'utils/convertDateTime';
import PropTypes from 'prop-types';
import Pagination from 'components/Pagination';

const ListItemComponent = ({item, onClickDetail}) => {
  return (
    <ListItemContainer>
      <ItemContainer>{item.username}</ItemContainer>
      <ItemContainer>{item.name}</ItemContainer>
      <ItemContainer>{item.email}</ItemContainer>
      <ItemContainer>{GENDER_TYPE[item.gender].title}</ItemContainer>
      <ItemContainer>{item.dName}</ItemContainer>
      <ItemContainer>{item.position}</ItemContainer>
      <ItemContainer>{cnvrtDate(new Date(item.createdAt))}</ItemContainer>
      <ItemContainer>
        <BtnContainer onClick={() => onClickDetail(item.username)}>상세보기</BtnContainer>
      </ItemContainer>
    </ListItemContainer>
  );
};

export const ReportEmvPage = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.MangerReducer);
  const [info, setInfo] = useState([]);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 8;

  useEffect(() => {
    dispatch(SwpEivReq(LOCAL_STORAGE.get('depId')));
  }, []);

  useEffect(() => {
    if(selector.data?.length > 0 && selector.data[0]?.username !== undefined) {
      setInfo(selector.data);
    } else {
      setInfo([]);
    }
  }, [selector]);

  return (
    <Wrapper>
      <TitleContainer>
        보고서 / 사원별 근태 관리
      </TitleContainer>
      <Container>
        <ListContainer>
          <HeaderContainer>
            <InnerLayout>사원번호</InnerLayout>
            <InnerLayout>사원명</InnerLayout>
            <InnerLayout>이메일</InnerLayout>
            <InnerLayout>성별</InnerLayout>
            <InnerLayout>부서</InnerLayout>
            <InnerLayout>직급</InnerLayout>
            <InnerLayout>입사일</InnerLayout>
            <InnerLayout>상세보기</InnerLayout>
          </HeaderContainer>

          {info?.slice(offset, offset + 8).map((item) => {
            return <ListItemComponent
              key={item.username}
              item={item}
              onClickDetail={() => console.log('tsetest')}
            />;
          })}

        </ListContainer>
        <Pagination
          total={info?.length}
          limit={8}
          page={page}
          setPage={setPage}
        />
      </Container>
    </Wrapper>
  );
};

ListItemComponent.propTypes = {
  item: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ).isRequired,
  onClickDetail: PropTypes.func.isRequired,
};

ReportEmvPage.propTypes = {
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
  BtnContainer,
} = style;