import React, {useEffect, useState} from 'react';
import theme from 'styles/theme';
import {style} from './EmpInsertStyle';
import {MdOutlineClose} from 'react-icons/md';
import {useDispatch, useSelector} from 'react-redux';
import {SwpEmpinReq, SwpEmpmkReq} from 'redux/actions/AdminAction';
import PropTypes from 'prop-types';
import {
  DEPARTMENT_NAME_TYPE,
  GENDER_TYPE,
  LOCATION_TYPE,
  POSITION_TYPE,
  ROLE_TYPE
} from 'utils/constants';
import {DropboxEmp} from 'components/DropboxEmp/DropboxEmp';

export const EmpInsert = ({onClickInsertEmp}) => {
  const dispatch = useDispatch();
  const [emp, setEmp] = useState(
    {
      name : '',
      password:'test123',
      img:'',
    }
  );
  // 사원번호 생성
  const [mkemp, setMkemp] = useState({
    username :'',
    email :'',
    qrPath :''
  });
  const selector = useSelector((state) => state.AdminReducer);
  useEffect(() => {
    console.log(selector);
    if (selector?.mkUsername !== undefined) {
      setMkemp({...mkemp, username : selector.mkUsername.username, email: (selector.mkUsername.username).concat('@douzone.co.kr'), qrPath: selector.mkUsername.qrPath});
    }
  }, [selector]);
  useEffect(() => {
  }, [mkemp]);
  const onClickMkUsername = () => {
    dispatch(SwpEmpmkReq());
  };
  // 사진 업로드
  const [empImg, setEmpImg] = useState(null);
  const onInsertImg = (e) => {
    if(e.target.files) {
      const uploadFile = e.target.files[0];
      setEmpImg(uploadFile);
    }
  };
  const getDataHandler = (e) => {
    setEmp({...emp, [e.target.id]: e.target.value});
  };
  const onClickInsertCloseEmp = () => {
    onClickInsertEmp(true);
  };
  // 드롭박스
  const [openGenderDropbox, setOpenGenderDropbox] = useState(false);
  const [openLocationDropbox, setOpenLocationDropbox] = useState(false);
  const [openPositionDropbox, setOpenPositionDropbox] = useState(false);
  const [openRoleDropbox, setOpenRoleDropbox] = useState(false);
  const [openDepNameDropbox, setOpenDepNameDropbox] = useState(false);
  const [selectItem, setSelectItem] = useState({
    gender:'선택하세요',
    location:'선택하세요',
    position:'선택하세요',
    role: '선택하세요',
    depName: '선택하세요'
  });
  const onClickGenderDrop = () => {
    setOpenGenderDropbox(!openGenderDropbox);
    setOpenLocationDropbox(false);
    setOpenPositionDropbox(false);
    setOpenRoleDropbox(false);
    setOpenDepNameDropbox(false);
  };
  const onClickLocationDrop = () => {
    setOpenLocationDropbox(!openLocationDropbox);
    setOpenGenderDropbox(false);
    setOpenPositionDropbox(false);
    setOpenRoleDropbox(false);
    setOpenDepNameDropbox(false);
  };
  const onClickPositionDrop = () => {
    setOpenPositionDropbox(!openPositionDropbox);
    setOpenGenderDropbox(false);
    setOpenLocationDropbox(false);
    setOpenRoleDropbox(false);
    setOpenDepNameDropbox(false);
  };
  const onClickRoleDrop = () => {
    setOpenRoleDropbox(!openRoleDropbox);
    setOpenGenderDropbox(false);
    setOpenDepNameDropbox(false);
    setOpenPositionDropbox(false);
    setOpenLocationDropbox(false);
  };
  const onClickDepNameDrop = () => {
    setOpenDepNameDropbox(!openDepNameDropbox);
    setOpenGenderDropbox(false);
    setOpenLocationDropbox(false);
    setOpenPositionDropbox(false);
    setOpenRoleDropbox(false);
  };
  const onClickDropBoxItem = (e, target) => {
    setSelectItem({...selectItem, [target]: e.target.id});
    if(target === 'gender') {
      onClickGenderDrop();
    } else if (target === 'location') {
      onClickLocationDrop();
    } else if (target === 'position') {
      onClickPositionDrop();
    } else if (target === 'role') {
      onClickRoleDrop();
    } else if (target === 'depName') {
      onClickDepNameDrop();
    } else {
      onClickDropBoxItem();
    }
  };
  const Insert = () => {
    // 드롭박스 값
    const convertData = {
      gender : GENDER_TYPE.filter((v) => v.title === selectItem?.gender)[0].id,
      location: LOCATION_TYPE.filter((v) => v.title === selectItem?.location)[0].id,
      position: POSITION_TYPE.filter((v) => v.title === selectItem?.position)[0].title,
      role: ROLE_TYPE.filter((v) => v.title === selectItem?.role)[0].id,
      depId: DEPARTMENT_NAME_TYPE.filter((v) => v.title === selectItem?.depName)[0].id
    };
    const packedMsg = Object.assign(emp, convertData, mkemp);
    const insertForm = new FormData();
    insertForm.append('image', empImg);
    insertForm.append('data', new Blob([JSON.stringify(packedMsg)], {type:'application/json'}));
    dispatch(SwpEmpinReq(insertForm));
    onClickInsertCloseEmp();
  };
  return (
    <Wrap>
      <Container>
        <TextLayout>
          <CloseLayout>
            <MdOutlineClose size={25} onClick={onClickInsertCloseEmp} style={{cursor: 'pointer'}}/>
          </CloseLayout>
          <h2>신규 사원 등록</h2>
          <h3>신규 사원을 등록하고 QR 코드를 자동으로 생성합니다.</h3>
          <hr />
        </TextLayout>
        <InsertForm>
          <UserInfoWrap>
            <UserInfoLayout>
              <CaptionLayout>
                사원번호
                <BtnLayout
                  onClick={onClickMkUsername}
                >
                  생성
                </BtnLayout>
              </CaptionLayout>
              <LabelLayout
                id={''}
                placeholder={'  버튼클릭'}
                value={mkemp?.username}
                type={'username'}
                readOnly
              />
            </UserInfoLayout>
            <UserInfoLayout>
              <CaptionLayout>
                사원명
              </CaptionLayout>
              <LabelLayout
                id={'name'}
                value={emp.name}
                onChange={getDataHandler}
                type={'name'}
                autoFocus
              />
            </UserInfoLayout>
          </UserInfoWrap>
          <UserProfileLayout htmlFor="img" onChange={onInsertImg}>
            {empImg && (
              <img
                src={URL.createObjectURL(empImg)}
                style={{ width: '100%', height: '100%' }}
                alt={'Img'}
              />
            )}
            {!empImg && <h6>.</h6>}
            <UserProfileLayoutBtn
              type={'file'}
              id={'profileImg'}
              accept={'image/*'}
              enctype={'multipart/form-data'}
              onChange={onInsertImg}
            />
          </UserProfileLayout>
        </InsertForm>
        <UserInfoLayout2>
          <CaptionLayout >이메일
          </CaptionLayout>
          <CaptionLayout>성별</CaptionLayout>
          <LabelLayout
            id={'email'}
            placeholder={'  자동할당'}
            value={mkemp.email}
            type={'email'}
            readOnly
          />
          <DropboxEmp
            id={'gender'}
            open={openGenderDropbox}
            onClickDropBox={onClickGenderDrop}
            menu={GENDER_TYPE}
            select={selectItem.gender}
            onClickDropBoxItem={(e) => onClickDropBoxItem(e, 'gender')}
          />
          <CaptionLayout>지사</CaptionLayout>
          <CaptionLayout>직급</CaptionLayout>
          <DropboxEmp
            id={'location'}
            open={openLocationDropbox}
            onClickDropBox={onClickLocationDrop}
            menu={LOCATION_TYPE}
            select={selectItem.location}
            onClickDropBoxItem={
            (e) => onClickDropBoxItem(e, 'location')
          }
          />
          <DropboxEmp
            id={'position'}
            open={openPositionDropbox}
            onClickDropBox={onClickPositionDrop}
            menu={POSITION_TYPE}
            select={selectItem.position}
            onClickDropBoxItem={
            (e) => onClickDropBoxItem(e, 'position')
          }
          />
          <CaptionLayout>담당역할</CaptionLayout>
          <CaptionLayout>QR코드
          </CaptionLayout>
          <DropboxEmp
            id={'role'}
            open={openRoleDropbox}
            onClickDropBox={onClickRoleDrop}
            menu={ROLE_TYPE}
            select={selectItem.role}
            onClickDropBoxItem={
            (e) => onClickDropBoxItem(e, 'role')
          }
          />
          <LabelLayout
            id={'qrPath'}
            placeholder={'  자동할당'}
            value={mkemp?.qrPath}
            type={'qrPath'}
            // disabled
            readOnly
          />
          <CaptionLayout>부서</CaptionLayout>
          <div/>
          <DropboxEmp
            id={'depName'}
            open={openDepNameDropbox}
            onClickDropBox={onClickDepNameDrop}
            menu={DEPARTMENT_NAME_TYPE}
            select={selectItem.depName}
            onClickDropBoxItem={
            (e) => onClickDropBoxItem(e, 'depName')
          }
          />
        </UserInfoLayout2>
        <ResultBtnLayout>
          <Btn color={theme.colorSet.SECONDARY.GRAY_BE} onClick={onClickInsertCloseEmp}>취소</Btn>
          <Btn color={theme.colorSet.SECONDARY.GRAY_79} onClick={Insert}>확인</Btn>
        </ResultBtnLayout>
      </Container>
    </Wrap>
  );
};
EmpInsert.propTypes = {
  onClickInsertEmp: PropTypes.func.isRequired,
};
const {Wrap,
  Container,
  TextLayout,
  CloseLayout,
  InsertForm,
  UserInfoWrap,
  UserInfoLayout,
  UserProfileLayout,
  UserProfileLayoutBtn,
  CaptionLayout,
  UserInfoLayout2,
  BtnLayout,
  LabelLayout,
  ResultBtnLayout,
  Btn,
} = style;

