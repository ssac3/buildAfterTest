import React, {useEffect, useState} from 'react';
import {MdOutlineClose} from 'react-icons/md';
import theme from 'styles/theme';
import {style} from './EmpDetailStyle';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {SwpEmpupReq} from 'redux/actions/AdminAction';
import {
  ATTENDENCE_MANAGER_TYPE,
  DEPARTMENT_NAME_TYPE,
  GENDER_TYPE,
  LOCATION_TYPE,
  POSITION_TYPE,
  ROLE_TYPE
} from 'utils/constants';
import {DropboxEmp} from 'components/DropboxEmp/DropboxEmp';

export const EmpDetail = ({emp, onClickDetailEmp}) => {
  // 드롭박스
  const [openGenderDropbox, setOpenGenderDropbox] = useState(false);
  const [openLocationDropbox, setOpenLocationDropbox] = useState(false);
  const [openPositionDropbox, setOpenPositionDropbox] = useState(false);
  const [openRoleDropbox, setOpenRoleDropbox] = useState(false);
  const [openDepNameDropbox, setOpenDepNameDropbox] = useState(false);
  const [openManagerDropbox, setOpenManagerDropbox] = useState(false);
  const onClickGenderDrop = () => {
    setOpenGenderDropbox(!openGenderDropbox);
    setOpenLocationDropbox(false);
    setOpenPositionDropbox(false);
    setOpenRoleDropbox(false);
    setOpenDepNameDropbox(false);
    setOpenManagerDropbox(false);
  };
  const onClickLocationDrop = () => {
    setOpenLocationDropbox(!openLocationDropbox);
    setOpenGenderDropbox(false);
    setOpenPositionDropbox(false);
    setOpenRoleDropbox(false);
    setOpenDepNameDropbox(false);
    setOpenManagerDropbox(false);
  };
  const onClickPositionDrop = () => {
    setOpenPositionDropbox(!openPositionDropbox);
    setOpenGenderDropbox(false);
    setOpenLocationDropbox(false);
    setOpenRoleDropbox(false);
    setOpenDepNameDropbox(false);
    setOpenManagerDropbox(false);
  };
  const onClickRoleDrop = () => {
    setOpenRoleDropbox(!openRoleDropbox);
    setOpenGenderDropbox(false);
    setOpenDepNameDropbox(false);
    setOpenPositionDropbox(false);
    setOpenLocationDropbox(false);
    setOpenManagerDropbox(false);
  };
  const onClickDepNameDrop = () => {
    setOpenDepNameDropbox(!openDepNameDropbox);
    setOpenGenderDropbox(false);
    setOpenLocationDropbox(false);
    setOpenPositionDropbox(false);
    setOpenRoleDropbox(false);
    setOpenManagerDropbox(false);
  };
  const onClickManagerDrop = () => {
    setOpenManagerDropbox(!openManagerDropbox);
    setOpenGenderDropbox(false);
    setOpenLocationDropbox(false);
    setOpenPositionDropbox(false);
    setOpenRoleDropbox(false);
    setOpenDepNameDropbox(false);
  };
  const [selectItem, setSelectItem] = useState({
    gender: GENDER_TYPE[emp.gender].title,
    location: LOCATION_TYPE[emp.depId - 1].title,
    position: POSITION_TYPE[emp.depId - 1].title,
    role: ROLE_TYPE[emp.role].title,
    depName: DEPARTMENT_NAME_TYPE[emp.depId - 1].title,
    manager: ATTENDENCE_MANAGER_TYPE[(emp.role > 1) - 1].title,
  });
  console.log('이거확인', emp);
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
    } else if (target === 'manager') {
      onClickManagerDrop();
    } else {
      onClickDropBoxItem();
    }
  };
  // 이미지 수정
  const [empUpImg, setEmpUpImg] = useState(null);
  const onChangeImg = (e) => {
    if(e.target.files) {
      const uploadFile = e.target.files[0];
      // formData로 담아서 한꺼번에 전송할거얌
      // const formData = new FormData();
      // formData.append('image', uploadFile);
      setEmpUpImg(uploadFile);
    }
  };
  // 통신
  const dispatch = useDispatch();
  const [change, setChange] = useState(
    {
      username: emp.username,
      name: emp.name,
      email: emp.email,
      qrPath: emp.qrPath,
      // img: emp.img
    }
  );
  const onClickDetailCloseEmp = () => {
    onClickDetailEmp(0);
  };
  const Update = () => {
    console.log(emp);
    console.log(selectItem);
    const convertData = {
      gender : GENDER_TYPE.filter((v) => v.title === selectItem?.gender)[0].id,
      location: LOCATION_TYPE.filter((v) => v.title === selectItem?.location)[0].id,
      position: POSITION_TYPE.filter((v) => v.title === selectItem?.position)[0].title,
      role: ROLE_TYPE.filter((v) => v.title === selectItem?.role)[0].id,
      depId: DEPARTMENT_NAME_TYPE.filter((v) => v.title === selectItem?.depName)[0].id,
      manager: ATTENDENCE_MANAGER_TYPE.filter((v) => v.title === selectItem?.manager)[0].title,
    };
    const packedMsg = Object.assign(change, convertData);
    const updateForm = new FormData();
    updateForm.append('image', empUpImg);
    dispatch(SwpEmpupReq(packedMsg));
  };
  const onChange = (e) => {
    setChange({...change, [e.target.id]: e.target.value});
  };
  useEffect(() => {
  }, [emp]);
  return (
    <Wrap>
      <Container>
        <TextLayout>
          <CloseLayout>
            <MdOutlineClose size={25} onClick={onClickDetailCloseEmp} style={{cursor: 'pointer'}}/>
          </CloseLayout>
          <h2>사원 상세 정보</h2>
          <h3>해당 사원의 상세 내역을 조회하고 수정합니다.</h3>
          <hr/>
        </TextLayout>
        <InsertForm>
          <UserInfoWrap>
            <UserInfoLayout>
              <CaptionLayout>사원번호</CaptionLayout>
              <LabelLayout
                readOnly
                style={{backgroundColor: '#EFEFEF'}}
                value={change?.username}
              />
            </UserInfoLayout>
            <UserInfoLayout>
              <CaptionLayout>사원명</CaptionLayout>
              <LabelLayout
                id={'name'}
                value={change?.name}
                onChange={onChange}
              />
            </UserInfoLayout>
          </UserInfoWrap>
          <UserProfileLayout
            alt={'Img'}
            src={emp.img}
            type={'file'}
            id={'profileImg'}
            accept={'image/*'}
            enctype={'multipart/form-data'}
            onChange={onChangeImg}
          />
        </InsertForm>
        <UserInfoLayout2>
          <CaptionLayout>이메일</CaptionLayout>
          <CaptionLayout>성별</CaptionLayout>
          <LabelLayout
            readOnly
            style={{backgroundColor: '#EFEFEF'}}
            value={emp.email || ''}
          />
          <DropboxEmp
            // id={'gender'}
            open={openGenderDropbox}
            onClickDropBox={onClickGenderDrop}
            menu={GENDER_TYPE}
            select={selectItem.gender}
            onClickDropBoxItem={(e) => onClickDropBoxItem(e, 'gender')}
          />
          <CaptionLayout>지사</CaptionLayout>
          <CaptionLayout>직급</CaptionLayout>
          <DropboxEmp
            // id={'location'}
            open={openLocationDropbox}
            onClickDropBox={onClickLocationDrop}
            menu={LOCATION_TYPE}
            select={selectItem.location}
            onClickDropBoxItem={
              (e) => onClickDropBoxItem(e, 'location')
            }
          />
          <DropboxEmp
            // id={'position'}
            open={openPositionDropbox}
            onClickDropBox={onClickPositionDrop}
            menu={POSITION_TYPE}
            select={selectItem.position}
            onClickDropBoxItem={
              (e) => onClickDropBoxItem(e, 'position')
            }
          />
          <CaptionLayout>담당역할</CaptionLayout>
          <CaptionLayout>QR코드</CaptionLayout>
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
            readOnly
            style={{backgroundColor: '#EFEFEF'}}
            value={emp.qrPath}
          >
          </LabelLayout>
          <CaptionLayout>부서</CaptionLayout>
          <CaptionLayout>근태담당자</CaptionLayout>
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
          <DropboxEmp
            id={'manager'}
            open={openManagerDropbox}
            onClickDropBox={onClickManagerDrop}
            menu={ATTENDENCE_MANAGER_TYPE}
            select={selectItem.manager}
            onClickDropBoxItem={
              (e) => onClickDropBoxItem(e, 'manager')
            }
          />
        </UserInfoLayout2>
        <ResultBtnLayout>
          <Btn color={theme.colorSet.SECONDARY.GRAY_BE} onClick={onClickDetailCloseEmp}>닫기</Btn>
          <Btn
            color={theme.colorSet.SECONDARY.GRAY_79}
            onClick={Update}
          >
            수정
          </Btn>
        </ResultBtnLayout>
      </Container>
    </Wrap>
  );
};

EmpDetail.propTypes = {
  emp: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  onClickDetailEmp: PropTypes.func.isRequired,
};
const {Wrap,
  Container,
  TextLayout,
  CloseLayout,
  InsertForm,
  UserInfoWrap,
  UserInfoLayout,
  UserProfileLayout,
  CaptionLayout,
  UserInfoLayout2,
  LabelLayout,
  ResultBtnLayout,
  Btn,
} = style;
