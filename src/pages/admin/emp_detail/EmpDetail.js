import React, {useEffect, useState} from 'react';
import {MdOutlineClose} from 'react-icons/md';
import theme from 'styles/theme';
import {style} from './EmpDetailStyle';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {SwpEmpupReq} from 'redux/actions/AdminAction';

export const EmpDetail = ({emp, onClickDetailEmp}) => {
  // 드롭박스
  // 통신
  const dispatch = useDispatch();
  const [change, setChange] = useState(
    {
      username: emp.username,
      name: emp.name,
      email: emp.email,
      gender: emp.gender,
      location: emp.location,
      position: emp.position,
      role: emp.role,
      qrPath: emp.qrPath,
      depId: emp.depId,
      manager: emp.manager,
      img: emp.img
    }
  );
  const onClickDetailCloseEmp = () => {
    onClickDetailEmp(0);
  };

  const Update = () => {
    dispatch(SwpEmpupReq(change));
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
          <hr />
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
          <UserProfileLayout/>
        </InsertForm>
        <UserInfoLayout2>
          <CaptionLayout >이메일</CaptionLayout>
          <CaptionLayout>성별</CaptionLayout>
          <LabelLayout
            readOnly
            style={{backgroundColor: '#EFEFEF'}}
            value={emp.email || ''}
          />
          <LabelLayout
            id={'gender'}
            value={change?.gender}
            onChange={onChange}
          />
          <CaptionLayout>지사</CaptionLayout>
          <CaptionLayout>직급</CaptionLayout>
          <LabelLayout
            id={'location'}
            onChange={() => console.log('지사 바꿔야해')}
            value={change?.depId}
          />
          <LabelLayout
            id={'position'}
            value={change?.position}
            onChange={onChange}
          />
          <CaptionLayout>담당역할</CaptionLayout>
          <CaptionLayout>QR코드</CaptionLayout>
          <LabelLayout
            id={'role'}
            value={change?.role}
            onChange={onChange}
          />
          <LabelLayout
            readOnly
            style={{backgroundColor: '#EFEFEF'}}
            value={emp.qrPath}
          >
          </LabelLayout>
          <CaptionLayout>부서</CaptionLayout>
          <CaptionLayout>근태담당자</CaptionLayout>
          <LabelLayout
            id={'depId'}
            value={change?.depId}
            onChange={onChange}
          />
          <LabelLayout
            id={'manager'}
            value={change?.manager}
            onChange={onChange}
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
