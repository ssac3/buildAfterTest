import React, {useState, useEffect} from 'react';
import {style} from './ReportEmvPageStyle';
import {useDispatch, useSelector} from 'react-redux';
import {SwpEivReq} from 'redux/actions/ManagerAction';
import {GENDER_TYPE, LOCAL_STORAGE} from 'utils/constants';
import {cnvrtDate} from 'utils/convertDateTime';
import PropTypes from 'prop-types';
import Pagination from 'components/Pagination';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import krLocale from 'date-fns/locale/ko';

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
        <BtnContainer onClick={() => onClickDetail([item.username, item.name])}>상세보기</BtnContainer>
      </ItemContainer>
    </ListItemContainer>
  );
};

export const ReportEmvPage = ({onClickEavDetail, findDate, onClickFindDate}) => {
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

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={krLocale}>
          <DatePicker
            views={['year', 'month']}
            label="조회할 날짜"
            value={findDate}
            onChange={(newValue) => {
              onClickFindDate(newValue);
            }}
            renderInput={(params) => (
              <TextField
                size={'small'}
                {...params}
                helperText={null}
                style={{backgroundColor:'white'}}
              />
            )}
          />
        </LocalizationProvider>
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
              onClickDetail={onClickEavDetail}
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
  onClickEavDetail: PropTypes.func.isRequired,
  findDate:PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func])
  ).isRequired,
  onClickFindDate:PropTypes.func.isRequired,
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