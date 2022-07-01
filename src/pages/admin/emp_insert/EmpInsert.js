import React, {useState} from 'react';
import theme from 'styles/theme';
import {style} from './EmpInsertStyle';
import {MdOutlineClose} from 'react-icons/md';
import {useDispatch} from 'react-redux';
import {SwpEmpinReq} from 'redux/actions/AdminAction';



export const EmpInsert = () => {
  const dispatch = useDispatch();

  const [emp, setEmp] = useState(
    {
      username : '',
      name : '',
      email : '',
      gender : '',
      location : '',
      position : '',
      role : '',
      qrPath : '',
      depId : '',
      password:'1234',
      img:'testest',
    }
  );
  const getDataHandler = (e) => {
    setEmp({...emp, [e.target.id]: e.target.value});
  };
  const Insert = () => {
    console.log(emp);
    dispatch(SwpEmpinReq(emp));
    // 등록 성공 얼럿
    // dispatch(openAlert('success', '신규 사원을 성공적으로 등록했습니다.'));
    // 등록 실패 얼럿
    // dispatch(openAlert('fail', '에러가 발생했습니다. 다시 시도하세요.'));
  };

  return (
    <Wrap>
      <Container>
        <TextLayout>
          <CloseLayout>
            <MdOutlineClose size={25} style={{cursor: 'pointer'}}/>
          </CloseLayout>
          <h2>신규 사원 등록</h2>
          <h3>신규 사원을 등록하고 QR코드를 자동으로 생성합니다.</h3>
          <hr />
        </TextLayout>
        <InsertForm>
          <UserInfoWrap>
            <UserInfoLayout>
              <CaptionLayout>
                사원번호
                <BtnLayout>생성</BtnLayout>
              </CaptionLayout>
              <LabelLayout
                id={'username'}
                value={emp.username}
                onChange={getDataHandler}
                type={'username'}
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
          <UserProfileLayout/>
        </InsertForm>
        <UserInfoLayout2>
          <CaptionLayout >이메일
            <BtnLayout>생성</BtnLayout>
          </CaptionLayout>
          <CaptionLayout>성별</CaptionLayout>
          <LabelLayout
            id={'email'}
            value={emp.email}
            onChange={getDataHandler}
            type={'email'}
          />
          <LabelLayout
            id={'gender'}
            value={emp.gender}
            onChange={getDataHandler}
            type={'gender'}
          />
          <CaptionLayout>지사</CaptionLayout>
          <CaptionLayout>직급</CaptionLayout>
          <LabelLayout
            id={'location'}
            value={emp.location}
            onChange={getDataHandler}
            type={'location'}
          />
          <LabelLayout
            id={'position'}
            value={emp.position}
            onChange={getDataHandler}
            type={'position'}
          />
          <CaptionLayout>담당역할</CaptionLayout>
          <CaptionLayout>QR코드
            <BtnLayout>생성</BtnLayout>
          </CaptionLayout>
          <LabelLayout
            id={'role'}
            value={emp.role}
            onChange={getDataHandler}
            type={'role'}
          />
          <LabelLayout
            id={'qrPath'}
            value={emp.qrPath}
            onChange={getDataHandler}
            type={'qrPath'}
          />
          <CaptionLayout>부서</CaptionLayout>
          <div/>
          <LabelLayout
            id={'depId'}
            value={emp.depId}
            onChange={getDataHandler}
            type={'depId'}
          />
        </UserInfoLayout2>
        <ResultBtnLayout>
          <Btn color={theme.colorSet.SECONDARY.GRAY_BE}>취소</Btn>
          <Btn color={theme.colorSet.SECONDARY.GRAY_79} onClick={Insert}>확인</Btn>
        </ResultBtnLayout>
      </Container>
    </Wrap>
  );
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
  BtnLayout,
  LabelLayout,
  ResultBtnLayout,
  Btn,
} = style;

