import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {SwpEmpselReq} from 'redux/actions/AdminAction';
import {style} from './EmpManagementStyle';
import {cnvrtDate} from 'utils/convertDateTime';
import Pagination from 'components/Pagination';
import {DEPARTMENT_NAME_TYPE, GENDER_TYPE, POSITION_TYPE} from 'utils/constants';
import Dropbox from 'components/Dropbox';
import {MdSearch} from 'react-icons/md';

const ListItemComponent = ({emp, onClickDetailEmp}) => {
  return (
    <ListItemContainer>
      <ItemContainer>{emp.username}</ItemContainer>
      <ItemContainer>{emp.name}</ItemContainer>
      <ItemContainer>{emp.email}</ItemContainer>
      <ItemContainer>{GENDER_TYPE[emp.gender].title}</ItemContainer>
      <ItemContainer>{DEPARTMENT_NAME_TYPE[emp.depId - 1].title}</ItemContainer>
      <ItemContainer>{emp.position}</ItemContainer>
      <ItemContainer>{cnvrtDate(new Date(emp.createdAt))}</ItemContainer>
      <ItemContainer>
        <BtnLayout onClick={() => onClickDetailEmp(emp.username)}>보기</BtnLayout>
      </ItemContainer>
    </ListItemContainer>
  );
};
export const EmpManagement = ({onClickInsertEmp, onClickDetailEmp}) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.AdminReducer);
  const [emps, setEmps] = useState([]);
  // console.log(emps);
  // 검색
  // const [schVal, setSchVal] = useState('');
  // const handleSchValChange = (e) => {
  //   setSchVal(e.target.value);
  // };
  // const usernameSch = emps.filter((emps) => {
  //   return emps.emp.username.includes(schVal);
  // });
  // 페이지네이션
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 6;
  // 드롭박스
  const [openDropbox, setOpenDropbox] = useState(false);
  const [openStatusDropbox, setOpenStatusDropbox] = useState(false);
  const [selectItem, setSelectItem] = useState({
    position:'선택하세요',
  });
  const onClickType = () => {
    setOpenDropbox(!openDropbox);
  };
  const onClickStatus = () => {
    setOpenStatusDropbox(!openStatusDropbox);
  };
  const onClickDropBoxItem = (e, target) => {
    setSelectItem({...selectItem, [target]: e.target.id});

    if(target === 'position') {
      onClickType();
    }else{
      onClickStatus();
    }
  };
  useEffect(() => {
    dispatch(SwpEmpselReq());
  }, []);
  useEffect(() => {
    console.log(selector);
    if(selector.emps?.length > 0 && selector.emps[0]?.username !== undefined) {
      setEmps(selector.emps);
    } else {
      setEmps([]);
    }
  }, [selector]);
  return(
    <>
      <Container>
        <PageNameContainer>
          <h2>사원 관리</h2>
        </PageNameContainer>
        <TopComponent>
          <Wrapper>
            <SchContainer>
              <SchBtnContainer>
                <MdSearch size={25}/>
              </SchBtnContainer>
              <SchInput
                autoFocus
                // value={schVal}
                placeholder="사원번호 혹은 사원명을 입력하세요."
                // onChange={handleSchValChange}
                // data={usernameSch}
              />
            </SchContainer>
            <DivContainer>
              <SelectBox>
                <Dropbox id={'position'} open={openDropbox} onClickDropBox={onClickType} menu={POSITION_TYPE} select={selectItem.position} onClickDropBoxItem={(e) => onClickDropBoxItem(e, 'position')}/>
              </SelectBox>
            </DivContainer>
          </Wrapper>
          <DelBtn value="regBtn">삭제</DelBtn>
          <RegBtn value="regBtn" onClick={onClickInsertEmp}>추가</RegBtn>
        </TopComponent>
        <ListHeader>
          <ListItem w={100}>사원 번호</ListItem>
          <ListItem w={100}>사원명</ListItem>
          <ListItem w={150}>이메일</ListItem>
          <ListItem w={100}>성별</ListItem>
          <ListItem w={100}>부서</ListItem>
          <ListItem w={100}>직급</ListItem>
          <ListItem w={100}>입사일</ListItem>
          <ListItem w={100}>상세보기</ListItem>
        </ListHeader>
        {emps?.slice(offset, offset + 6).map((v) => {
          return <ListItemComponent
            key={v.username}
            emp={v}
            // data={usernameSch}
            onClickDetailEmp={onClickDetailEmp}
          />;
        })}
      </Container>
      <Pagination
        total={emps?.length}
        limit={6}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

EmpManagement.propTypes = {
  onClickInsertEmp:PropTypes.func.isRequired,
  onClickDetailEmp: PropTypes.func.isRequired,
};
ListItemComponent.propTypes = {
  emp: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ).isRequired,
  // data: PropTypes.objectOf(
  //   PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  // ).isRequired,
  onClickDetailEmp: PropTypes.func.isRequired,
};
const {
  Container,
  PageNameContainer,
  TopComponent,
  Wrapper,
  SchContainer,
  SchBtnContainer,
  SchInput,
  DivContainer,
  SelectBox,
  DelBtn,
  RegBtn,
  ListHeader,
  ListItem,
  ListItemContainer,
  ItemContainer,
  BtnLayout} = style;