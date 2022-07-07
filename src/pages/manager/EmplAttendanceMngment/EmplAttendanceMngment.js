import React, {useState, useEffect, useCallback} from 'react';
import {style} from './EmplAttendanceMngmentStyle';
import {useDispatch, useSelector} from 'react-redux';
import ButtonGroup from 'components/ButtonGroup';
import {SwpEivReq} from 'redux/actions/ManagerAction';
import {LOCAL_STORAGE, GENDER_TYPE} from 'utils/constants';
import PropTypes from 'prop-types';
import {cnvrtDate} from 'utils/convertDateTime';
import AtdcCalendar2 from 'components/AtdcCalendar2';
import Pagination from 'components/Pagination';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

const ListItemComponent = ({item, onClickDetail}) => {
  return(
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

export const EmplAttendanceMngment = ({
  onClickEadDetail,
  onClickEamDetail,
  findYear,
  onClickFindYear}) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.MangerReducer);
  const [selectType, setSelectType] = useState('일별');
  const [info, setInfo] = useState([]);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 8;
  const [selectEmpl, setSelecEmpl] = useState(0);
  const onClickType = (target) => {
    setSelectType(target);
  };

  const onClickDetail = useCallback((target) => {
    if(selectType === '일별') {
      setSelecEmpl(target);
    } else {
      onClickEamDetail(info?.filter((v) => v.username === target));
    }
  }, [selectEmpl, selectType]);

  useEffect(() => {
    if(selectEmpl === 0) {
      dispatch(SwpEivReq(LOCAL_STORAGE.get('depId')));
    }
  }, [selectEmpl, selectType]);
  useEffect(() => {
    if(selector.data?.length > 0 && selector.data[0]?.username !== undefined) {
      setInfo(selector.data);
    } else {
      setInfo([]);
    }
  }, [selector]);
  return (
    <Wrapper>
      {(selectEmpl > 0 && selectType === '일별') && (
        <CalendarLayout>
          <AtdcCalendar2
            selectEmpl={selectEmpl}
            onClickDetail={onClickDetail}
            onClickEadDetail={onClickEadDetail}
          />
        </CalendarLayout>
      )}

      {selectEmpl === 0 && (
        <TitleContainer>
          <InnerContainer>
            <h2>사원별 근태 관리</h2>
            <ButtonGroup selectType={selectType} onClickType={onClickType}/>
          </InnerContainer>
          <YearSelectorLayout>
            {(selectType === '월별') && (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={['year']}
                  label="조회할 년도"
                  value={findYear}
                  onChange={(newValue) => {
                    onClickFindYear(newValue);
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
            )}
          </YearSelectorLayout>
        </TitleContainer>
      )}

      {selectEmpl === 0 && (
        <>
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
                  onClickDetail={onClickDetail}
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
        </>
      )}
    </Wrapper>
  );
};

ListItemComponent.propTypes = {
  item: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  onClickDetail: PropTypes.func.isRequired,
};

EmplAttendanceMngment.propTypes = {
  onClickEadDetail: PropTypes.func.isRequired,
  onClickEamDetail: PropTypes.func.isRequired,
  findYear:PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func])
  ).isRequired,
  onClickFindYear:PropTypes.func.isRequired,
};

const {
  Wrapper,
  TitleContainer,
  InnerContainer,
  Container,
  ListContainer,
  HeaderContainer,
  InnerLayout,
  ListItemContainer,
  ItemContainer,
  BtnContainer,
  CalendarLayout,
  YearSelectorLayout,
} = style;