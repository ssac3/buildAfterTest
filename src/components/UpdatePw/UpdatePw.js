import React, {useEffect, useState} from 'react';
import {style} from './UpdatePwStyle';
import {useDispatch} from 'react-redux';
import {SwpSaprReq} from 'redux/actions/UserAction';
import {openAlert} from 'redux/actions/AlertAction';

export const UpdatePw = () => {
  const dispatch = useDispatch();
  const [nPwCheck, setNPwCheck] = useState('');
  const [rexCheck, setRexCheck] = useState('');
  const [info, setInfo] = useState({password : '', nPassword : '', nPasswordCheck : ''});

  const getDataHandler = (e) => {
    setInfo({...info, [e.target.id]: e.target.value});
  };

  function chkPW(pw) {
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,32}$/;
    if (reg.test(pw) === true) {
      setRexCheck('안전하게 사용하실 수 있는 비밀번호 입니다.');
    } else {
      setRexCheck('비밀번호는 8~32자이어야 하며, 대/소문자, 숫자, 특수기호를 모두 포함해야 합니다.');
    }
  }

  const onChangeInit = () => {
    setInfo({password: '', nPassword: '', nPasswordCheck: ''});
  };


  useEffect(() => {
    chkPW(info.nPassword);
  }, [info.nPassword]);

  useEffect(() => {
    if(info.nPassword === info.nPasswordCheck && (info.nPassword !== '' || info.nPasswordCheck !== '')) {
      setNPwCheck('비밀번호가 일치합니다.');
    } else {
      setNPwCheck('');
    }
    console.log(info);
  }, [info.nPassword, info.nPasswordCheck]);

  const Update = () => {
    if (rexCheck === '안전하게 사용하실 수 있는 비밀번호 입니다.') {
      if (nPwCheck === '비밀번호가 일치합니다.') {
        dispatch(SwpSaprReq(info.password, info.nPassword, info.nPasswordCheck));
        onChangeInit();
      } else {
        dispatch(openAlert('fail', '새 비밀번호와 비밀번호 확인이 일치하지 않습니다.'));
        onChangeInit();
      }
    } else {
      dispatch(openAlert('fail', '비밀번호는 8~32자이어야 하며, 대/소문자, 숫자, 특수기호를 모두 포함해야 합니다.'));
      onChangeInit();
    }
  };

  return(
    <Container>
      <Title>
        비밀번호 변경
      </Title>
      <Contents>
        <ContentTitle>
          현재 비밀번호
        </ContentTitle>
        <ChangePw>
          <InputLayout
            id={'password'}
            value={info.password}
            onChange={getDataHandler}
            autoFocus
            type={'password'}
          />
        </ChangePw>

        <ContentTitle>
          새 비밀번호
        </ContentTitle>
        <ChangePw>
          <InputLayout
            id={'nPassword'}
            value={info.nPassword}
            onChange={getDataHandler}
            type={'password'}
          />
          <Check>
            {rexCheck}
          </Check>
        </ChangePw>

        <ContentTitle>
          새 비밀번호 확인
        </ContentTitle>
        <ChangePw>
          <InputLayout
            id={'nPasswordCheck'}
            value={info.nPasswordCheck}
            onChange={getDataHandler}
            type={'password'}
          />
          <Check fc={'red'}>
            {nPwCheck}
          </Check>
        </ChangePw>
        <ChangeButton onClick={Update}>
          변경
        </ChangeButton>
      </Contents>
    </Container>
  );
};

const {
  Container,
  Title,
  Contents,
  ContentTitle,
  ChangePw,
  InputLayout,
  Check,
  ChangeButton
} = style;
