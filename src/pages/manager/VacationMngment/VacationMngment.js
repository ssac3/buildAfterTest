import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {style} from './VacationMngmentStyle';
import { Calendar } from 'antd';
import {MdSearch, MdCalendarToday} from 'react-icons/md';
import Dropbox from 'components/Dropbox';
import {VACATION_TYPE, MANAGER_APPROVAL_TYPE, LOCAL_STORAGE} from 'utils/constants';
import {useDispatch, useSelector} from 'react-redux';
import {SwpVarReq, SwpVavReq} from 'redux/actions/ManagerAction';
import {calcVacationTime} from 'utils/convertDateTime';
import Pagination from 'components/Pagination';

const InputComponent = ({type}) => {
  const [open, setOpen] = useState(false);
  const onClickCalendar = () => {
    setOpen(!open);
  };

  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return(
    <SearchContainer>
      {type === 'text' &&
        <MdSearch size={25} color={'white'}/> }
      <SearchInput/>
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
      <ItemContainer>{item.username}</ItemContainer>
      <ItemContainer>{item.name}</ItemContainer>
      <ItemContainer>{item.date}</ItemContainer>
      <ItemContainer>{VACATION_TYPE[item.type].title}</ItemContainer>
      <ItemContainer>{item.contents}</ItemContainer>
      <ItemContainer>{MANAGER_APPROVAL_TYPE[item.approvalFlag].title}</ItemContainer>
      <ItemContainer>
        <BtnContainer id={item.vId} onClick={onClickDetail}>상세보기</BtnContainer>
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
  const [drop, setDrop] = useState(false);
  const [change, setChange] = useState('');
  useEffect(() => {
    if(detail?.approvalFlag) {
      setChange(MANAGER_APPROVAL_TYPE[detail.approvalFlag].title);
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
    // SWP_VAR_REQ
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
            <InnerInfoItem><InfoInputComponent text={detail.restTime}/></InnerInfoItem>

            <InnerInfoItem>상태</InnerInfoItem>
            <InnerInfoItem/>
            <InnerInfoItem>
              <Dropbox
                open={drop}
                onClickDropBox={onClickDrop}
                menu={MANAGER_APPROVAL_TYPE}
                select={change}
                onClickDropBoxItem={onClickItem}
              />
            </InnerInfoItem>
          </InnerInfoContainer>
          <StoreBtn id={detail.vId} onClick={onClickStore}>저장</StoreBtn>
        </>
      )
        :
        <>사원을 선택해주세요</>}

    </UserInfoContainer>
  );
};

export const VacationMngment = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.MangerReducer);
  const [data, setData] = useState([]);
  const [openDropbox, setOpenDropbox] = useState(false);
  const [openStatusDropbox, setOpenStatusDropbox] = useState(false);
  const [detail, setDetail] = useState({});
  const [page, setPage] = useState(1);
  const limit = 7;
  const offset = (page - 1) * limit;
  const [selectItem, setSelectItem] = useState({
    vacation:'선택하세요',
    status:'선택하세요'
  });

  useEffect(() => {
    console.log('VAV');
    dispatch(SwpVavReq(LOCAL_STORAGE.get('depId')));
  }, []);

  useEffect(() => {
    if(selector.data?.length > 0 && selector.data[0]?.vId !== undefined) {
      setData(selector.data);
    } else {
      setData([]);
    }
  }, [selector]);


  const onClickDetail = (e) => {
    const detailData = data?.filter((v) => v.vId === Number(e.target.id))[0];
    let vacationTime;
    if(detailData.type === '0') {
      vacationTime = calcVacationTime(new Date(selector.startTime), new Date(selector.endTime));
    } else if(detailData.type === '1') {
      vacationTime = calcVacationTime(new Date(selector.startTime), new Date(0, 0, 0, 12));
    } else {
      vacationTime = calcVacationTime(new Date(0, 0, 0, 13), new Date(selector.endTime));
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
    setSelectItem({...selectItem, [target]: e.target.id});
    if(target === 'vacation') {
      onClickType();
    }else{
      onClickStatus();
    }
  };

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
            <InnerLayout><InputComponent type={'text'}/></InnerLayout>
            <InnerLayout><InputComponent type={'text'}/></InnerLayout>
            <InnerLayout><InputComponent type={'date'}/></InnerLayout>
            <InnerLayout><Dropbox id={'vacation'} open={openDropbox} onClickDropBox={onClickType} menu={VACATION_TYPE} select={selectItem.vacation} onClickDropBoxItem={(e) => onClickDropBoxItem(e, 'vacation')}/></InnerLayout>
            <InnerLayout><InputComponent type={'text'}/></InnerLayout>
            <InnerLayout><Dropbox id={'status'} open={openStatusDropbox} onClickDropBox={onClickStatus} menu={MANAGER_APPROVAL_TYPE} select={selectItem.status} onClickDropBoxItem={(e) => onClickDropBoxItem(e, 'status')}/></InnerLayout>
            <InnerLayout>-</InnerLayout>
          </HeaderContainer>

          {data?.slice(offset, offset + limit).map((item) => (
            <ListItemComponent key={item.vId} item={item} onClickDetail={onClickDetail}/>
          ))}


          <Pagination
            total={data?.length}
            limit={8}
            page={page}
            setPage={setPage}
          />
        </ListContainer>
        <SideContainer>
          <InfoContainer h={35}/>
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