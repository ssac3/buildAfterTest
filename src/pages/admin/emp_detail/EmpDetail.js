import React, {useEffect, useState} from 'react';
import {MdOutlineClose} from 'react-icons/md';
import theme from 'styles/theme';
import {style} from './EmpDetailStyle';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {SwpEmpupReq} from 'redux/actions/AdminAction';

export const EmpDetail = ({emp}) => {
  const dispatch = useDispatch();

  const Update = () => {
    console.log();
    alert('사원수정~');
    dispatch(SwpEmpupReq(
      emp.name,
      emp.gender,
      emp.location,
      emp.position,
      emp.role,
      emp.manager
    ));
  };
  const [change, setChange] = useState(
    {
      name: emp.name,
      gender: emp.gender,
      location: emp.location,
      position: emp.position,
      role: emp.role,
      depId: emp.depId,
      manager: emp.manager
    }
  );
  const onChange = (e) => {
    setChange({...change, [e.target.id]: e.target.value});
  };
  useEffect(() => {
    console.log(emp);
  }, [emp]);
  return (
    <Wrap>
      <Container>
        <TextLayout>
          <CloseLayout>
            <MdOutlineClose size={25} style={{cursor: 'pointer'}}/>
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
                value={emp.username}
              />
            </UserInfoLayout>
            <UserInfoLayout>
              <CaptionLayout>사원명</CaptionLayout>
              <LabelLayout
                id={'name'}
                value={change.name}
                defaultValue={emp.name}
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
            value={emp.email}
          />
          <LabelLayout
            id={'gender'}
            defaultValue={emp.gender}
            onChange={onChange}
          />
          <CaptionLayout>지사</CaptionLayout>
          <CaptionLayout>직급</CaptionLayout>
          <LabelLayout
            id={'location'}
            defaultValue={emp.location}
            onChange={onChange}
          />
          <LabelLayout
            id={'position'}
            defaultValue={emp.position}
            onChange={onChange}
          />
          <CaptionLayout>담당역할</CaptionLayout>
          <CaptionLayout>QR코드</CaptionLayout>
          <LabelLayout
            id={'role'}
            defaultValue={emp.role}
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
            defaultValue={emp.depId}
            onChange={onChange}
          />
          <LabelLayout
            id={'manager'}
            defaultValue={emp.manager}
            onChange={onChange}
          />
        </UserInfoLayout2>
        <ResultBtnLayout>
          <Btn color={theme.colorSet.SECONDARY.GRAY_BE}>닫기</Btn>
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
