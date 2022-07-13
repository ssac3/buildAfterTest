import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {style} from './VacationMngmentStyle';
import { Calendar } from 'antd';
import {MdSearch, MdCalendarToday} from 'react-icons/md';
import Dropbox from 'components/Dropbox';
import {VACATION_TYPE, MANAGER_APPROVAL_TYPE, LOCAL_STORAGE} from 'utils/constants';
import {useDispatch, useSelector} from 'react-redux';
import {SwpVarReq, SwpVavReq} from 'redux/actions/ManagerAction';
import {calcVacationTime, convertMintoHour, formatter} from 'utils/convertDateTime';
import Pagination from 'components/Pagination';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import krLocale from 'date-fns/locale/ko';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import {PieChart, Pie, Cell, Legend} from 'recharts';
import theme from 'styles/theme';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const VacInfoPiChart = ({data}) => {
  const COLORS = [
    theme.colorSet.ATTENDANCE_STATUS.OK,
    theme.colorSet.SECONDARY.GRAY_CC,
    theme.colorSet.PRIMARY.BLUE_1A,
    theme.colorSet.ATTENDANCE_STATUS.VACATION,
  ];
  const convertData = [
    {name: '출근', value: Number(LOCAL_STORAGE.get('depTotal')) - data},
    {name: '휴가', value: data},
  ];
  return (
    <PieChart width={250} height={190}>
      <Pie
        data={convertData}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {convertData?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]}/>
        ))}
      </Pie>
      <Legend layout={'vertical'} verticalAlign="bottom" align={'left'} height={40}/>
    </PieChart>
  );
};

const InputComponent = ({id, type, item, onChange}) => {
  const [open, setOpen] = useState(false);
  const onClickCalendar = () => {
    setOpen(!open);
  };

  const onPanelChange = (value) => {
    value.format('YYYY-MM-DD');
  };

  return(
    <SearchContainer>
      {type === 'text' &&
        <MdSearch size={25} color={'white'}/> }
      <SearchInput id={id} onChange={onChange} value={item.id}/>
      {type === 'date' &&
        <MdCalendarToday
          size={25}
          color={'white'}
          onClick={onClickCalendar}
          style={{cursor:'pointer'}}
        />}
      {open &&
        <Calendar
          fullscreen={false}
          onPanelChange={onPanelChange}
          style={{width:300, position:'absolute', left:0, top:45, zIndex:1}}
        />}
    </SearchContainer>
  );
};

const ListItemComponent = ({item, onClickDetail}) => {
  return(
    <ListItemContainer>
      <ItemContainer>{item?.username}</ItemContainer>
      <ItemContainer>{item?.name}</ItemContainer>
      <ItemContainer>{item?.date}</ItemContainer>
      <ItemContainer>{VACATION_TYPE[item?.type]?.title}</ItemContainer>
      <ItemContainer>{item.contents}</ItemContainer>
      <ItemContainer>{MANAGER_APPROVAL_TYPE[item?.approvalFlag]?.title}</ItemContainer>
      <ItemContainer>
        <BtnContainer id={item?.vId} onClick={onClickDetail}>상세보기</BtnContainer>
      </ItemContainer>
    </ListItemContainer>
  );
};

const InfoInputComponent = ({text}) => {
  return(
    <InfoInputContainer>{text}</InfoInputContainer>
  );
};

const UserInfoComponent = ({detail, detailInit}) => {
  const dispatch = useDispatch();
  // 드롭박스 활성화
  const [drop, setDrop] = useState(false);
  // 값변경 함수
  const [change, setChange] = useState('');
  useEffect(() => {
    if(detail?.approvalFlag) {
      setChange(MANAGER_APPROVAL_TYPE[detail?.approvalFlag]?.title);
    }
  }, [detail]);
  const onClickDrop = () => {
    setDrop(!drop);
  };
  const onClickItem = (e) => {
    setChange(e.target.id);
    onClickDrop();
  };

  const onClickStore = (e) => {
    const approvalFlag = MANAGER_APPROVAL_TYPE.filter(v => v.title === change && v)[0].id;
    dispatch(SwpVarReq(Number(e.target.id), approvalFlag, detailInit));
  };


  return(
    <UserInfoContainer info={detail?.name}>
      {detail?.name ? (
        <>
          <InnerInfoContainer>

            <InnerInfoItem>사원번호</InnerInfoItem>
            <InnerInfoItem>사원명</InnerInfoItem>
            <InnerInfoItem><InfoInputComponent text={detail.username}/></InnerInfoItem>
            <InnerInfoItem><InfoInputComponent text={detail.name}/></InnerInfoItem>

            <InnerInfoItem>휴가신청일</InnerInfoItem>
            <InnerInfoItem>신청 휴가시간</InnerInfoItem>
            <InnerInfoItem><InfoInputComponent text={detail.date}/></InnerInfoItem>
            <InnerInfoItem><InfoInputComponent text={detail.vacationTime}/></InnerInfoItem>

            <InnerInfoItem>사유</InnerInfoItem>
            <InnerInfoItem>남은 휴가시간</InnerInfoItem>
            <InnerInfoItem><InfoInputComponent text={detail.contents}/></InnerInfoItem>
            <InnerInfoItem>
              <InfoInputComponent text={convertMintoHour(detail.restTime)}/>
            </InnerInfoItem>

            <InnerInfoItem>상태</InnerInfoItem>
            <InnerInfoItem/>
            <InnerInfoItem>
              <Dropbox
                id={'vacation'}
                open={drop}
                onClickDropBox={onClickDrop}
                menu={MANAGER_APPROVAL_TYPE.slice(0, 3)}
                select={change}
                readOnly
                onClickDropBoxItem={onClickItem}
              />
            </InnerInfoItem>
          </InnerInfoContainer>
          <StoreBtn id={detail.vId} disabled={detail.approvalFlag !== '0'} onClick={onClickStore}>저장</StoreBtn>
        </>
      )
        :
        <>사원을 선택해주세요</>}

    </UserInfoContainer>
  );
};
// UserInfoComponent end

export const VacationMngment = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.MangerReducer);
  const [data, setData] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [openDropbox, setOpenDropbox] = useState(false);
  const [openStatusDropbox, setOpenStatusDropbox] = useState(false);
  const [detail, setDetail] = useState({});
  const [page, setPage] = useState(1);
  const [findDate, setFindDate] = useState(new Date());
  const [filterData, setFilterData] = useState([]); // 해당 일자에 전체 사원 중 휴가 사원 비율 구하기
  const limit = 7;
  const offset = (page - 1) * limit;
  const [filterItem, setFilterItem] = useState({
    username :'',
    name: '',
    vacation:'',
    status:'',
  });
  useEffect(() => {
    dispatch(SwpVavReq(LOCAL_STORAGE.get('depId')));
  }, []);

  useEffect(() => {
    if(selector.data?.length > 0 && selector.data[0]?.vId !== undefined) {
      setData(selector.data);
      setCopyData(selector.data);
    } else {
      setData([]);
    }
  }, [selector]);

  useEffect(() => {
    const date = (findDate.getFullYear().toString())
      .concat('-')
      .concat(formatter((findDate.getMonth() + 1).toString()))
      .concat('-')
      .concat(formatter((findDate.getDate()).toString()));
    const filter = data?.filter((v) => (v.date === date) && v);
    setFilterData(filter);
  }, [data, findDate]);

  const onClickDetail = (e) => {
    const detailData = data?.filter((v) => v.vId === Number(e.target.id))[0];
    let vacationTime;
    const startTimeSlice = selector.startTime.split(':');
    const depStartTime = new Date(0, 0, 0, startTimeSlice[0], startTimeSlice[1], startTimeSlice[2]);
    const endTimeSlice = selector.endTime.split(':');
    const depEndTime = new Date(0, 0, 0, endTimeSlice[0], endTimeSlice[1], endTimeSlice[2]);
    if(detailData.type === '0') {
      vacationTime = calcVacationTime(depStartTime, depEndTime);
    } else if(detailData.type === '1') {
      vacationTime = calcVacationTime(depStartTime, new Date(0, 0, 0, 12));
    } else {
      vacationTime = calcVacationTime(new Date(0, 0, 0, 13), depEndTime);
    }
    const detailInfo = {...detailData, vacationTime};
    setDetail(detailInfo);
  };

  const detailInit = () => {
    setDetail({});
  };

  const onClickType = () => {
    setOpenDropbox(!openDropbox);
  };

  const onClickStatus = () => {
    setOpenStatusDropbox(!openStatusDropbox);
  };

  const onClickDropBoxItem = (e, target) => {
    setFilterItem({...filterItem, [target]: e.target.id});
    if(target === 'vacation') {
      onClickType();
    }else{
      onClickStatus();
    }
  };

  const onChangeFindDate = (newDate) => {
    setFindDate(newDate);
  };
  const onChangeFilter = (e) => {
    console.log(e.target.value);
    setFilterItem({...filterItem, [e.target.id]: e.target.value});
  };

  useEffect(() => {
    let result = [];
    if(filterItem.username === '' &&
      filterItem.name === '' &&
      filterItem.vacation === '' &&
      filterItem.status === '') {
      result = data;
    }
    const filterInfo = (Object.keys(filterItem)).filter((key) => filterItem[key] !== '');
    if(filterInfo.length > 0) {
      let temp = data;
      filterInfo.forEach((item) => {
        if(item === 'username') {
          temp = temp.filter((v) => v.username === Number(filterItem[item]));
        }
        if(item === 'name') {
          temp = temp.filter((v) => v.name === filterItem[item]);
        }
        if(item === 'vacation') {
          temp = temp.filter((v) => VACATION_TYPE[v.type]?.title === filterItem[item]);
        }
        if(item === 'status') {
          temp = temp.filter((v) => MANAGER_APPROVAL_TYPE[v.approvalFlag]?.title ===
            filterItem[item]);
        }
        result = temp;
      });
    }
    setCopyData(result);
  }, [filterItem]);

  return (
    <Wrapper>
      <TitleContainer/>
      <Container>
        <ListContainer>
          <HeaderContainer>
            <InnerLayout>사원번호</InnerLayout>
            <InnerLayout>사원명</InnerLayout>
            <InnerLayout>휴가 신청일</InnerLayout>
            <InnerLayout>휴가 종류</InnerLayout>
            <InnerLayout>신청 사유</InnerLayout>
            <InnerLayout>상태</InnerLayout>
            <InnerLayout>세부 사항</InnerLayout>
            <InnerLayout><InputComponent type={'text'} id={'username'} item={filterItem} onChange={onChangeFilter}/></InnerLayout>
            <InnerLayout><InputComponent type={'text'} id={'name'} item={filterItem} onChange={onChangeFilter}/></InnerLayout>
            <InnerLayout>-</InnerLayout>
            <InnerLayout>
              <Dropbox
                id={'vacation'}
                open={openDropbox}
                onClickDropBox={onClickType}
                menu={VACATION_TYPE}
                select={filterItem.vacation}
                readOnly={false}
                onChangeFilter={onChangeFilter}
                onClickDropBoxItem={(e) => onClickDropBoxItem(e, 'vacation')}
              />
            </InnerLayout>
            <InnerLayout>-</InnerLayout>
            <InnerLayout>
              <Dropbox
                id={'status'}
                open={openStatusDropbox}
                onClickDropBox={onClickStatus}
                menu={MANAGER_APPROVAL_TYPE}
                select={filterItem.status}
                readOnly={false}
                onChangeFilter={onChangeFilter}
                onClickDropBoxItem={(e) => onClickDropBoxItem(e, 'status')}
              />
            </InnerLayout>
            <InnerLayout>-</InnerLayout>
          </HeaderContainer>

          {copyData?.slice(offset, offset + limit).map((item) => (
            <ListItemComponent key={item.vId} item={item} onClickDetail={onClickDetail}/>
          ))}


          <Pagination
            total={copyData?.length}
            limit={8}
            page={page}
            setPage={setPage}
          />
        </ListContainer>
        <SideContainer>
          <InfoContainer h={35}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={krLocale}>
              <DatePicker
                label="조회할 날짜"
                value={findDate}
                onChange={(newValue) => {
                  onChangeFindDate(newValue);
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
            <ChartLayout>
              <VacInfoPiChart data={filterData.length}/>
            </ChartLayout>
          </InfoContainer>
          <InfoContainer h={63}>
            <UserInfoComponent detail={detail} detailInit={detailInit}/>
          </InfoContainer>
        </SideContainer>
      </Container>

    </Wrapper>
  );
};

const {
  Wrapper,
  TitleContainer,

  Container,
  SideContainer,
  ChartLayout,
  InfoContainer,
  ListContainer,

  HeaderContainer,
  InnerLayout,
  SearchContainer,
  SearchInput,

  ListItemContainer,
  ItemContainer,
  BtnContainer,

  UserInfoContainer,
  InnerInfoContainer,
  InnerInfoItem,
  InfoInputContainer,
  StoreBtn,
} = style;

InputComponent.propTypes = {
  type:PropTypes.string.isRequired,
  id:PropTypes.string.isRequired,
  item:PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  onChange:PropTypes.func.isRequired,
};

ListItemComponent.propTypes = {
  item: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  onClickDetail:PropTypes.func.isRequired,
};

UserInfoComponent.propTypes = {
  detail:PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  detailInit:PropTypes.func.isRequired,
};

InfoInputComponent.propTypes = {
  text:PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

VacInfoPiChart.propTypes = {
  data: PropTypes.number.isRequired,
};