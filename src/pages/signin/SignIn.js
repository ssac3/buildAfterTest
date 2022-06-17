import React from 'react';
import {style} from './SignInStyle';
import Logo from 'assets/logo.png';
// import PropTypes from 'prop-types';

export const SignIn = () => {
  return (
    <Container>
      <CardContainer>
        <LogoLayout>
          <img src={Logo} alt={'로고'}/>
        </LogoLayout>
        <InputLayout autoFocus placeholder={'사원번호'}/>
        <InputLayout placeholder={'비밀번호'} type={'password'}/>

        <SignInButton>로그인</SignInButton>
      </CardContainer>
    </Container>
  );
};

SignIn.propTypes = {};

const {Container, CardContainer, LogoLayout, InputLayout, SignInButton} = style;
