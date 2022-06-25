import React, {useState} from 'react';
import {style} from './SignInStyle';
import Logo from 'assets/logo.png';
import {SwpEacReq} from 'redux/actions/SignInAction';
import {useDispatch} from 'react-redux';
// import PropTypes from 'prop-types';



export const SignIn = () => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState({username : '', password : ''});
  const getDataHandler = (e) => {
    setInfo({...info, [e.target.id]: e.target.value});
  };
  const Login = () => {
    dispatch(SwpEacReq(info.username, info.password));
  };
  return (
    <Container>
      <CardContainer>
        <LogoLayout>
          <img src={Logo} alt={'로고'}/>
        </LogoLayout>
        <InputLayout id={'username'} value={info.id} onChange={getDataHandler} autoFocus placeholder={'사원번호'}/>
        <InputLayout id={'password'} value={info.pw} onChange={getDataHandler} placeholder={'비밀번호'} type={'password'}/>

        <SignInButton onClick={Login}>로그인</SignInButton>
      </CardContainer>
    </Container>
  );
};

SignIn.propTypes = {};

const {Container, CardContainer, LogoLayout, InputLayout, SignInButton} = style;
