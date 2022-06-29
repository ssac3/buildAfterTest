import React from 'react';
import PropTypes from 'prop-types';
import {API} from 'utils/constants';
import {style} from './HeaderStyle';
import logo from 'assets/logo.png';
import {MdLogout, MdSettings} from 'react-icons/md';

export const Header = ({role, setting}) => {
  const onClickSetting = () => {
    setting();
  };
  return(
    <Container>
      <img src={logo} alt="로고" width={130}/>
      <IconLayout>
        {role === API.MANAGER &&
          <SettingLayout>
            <MdSettings onClick={onClickSetting} size={35}/>
          </SettingLayout>}
        <SignOutLayout>
          <MdLogout size={35} />
        </SignOutLayout>
      </IconLayout>

    </Container>
  );
};

Header.propTypes = {
  role:PropTypes.string.isRequired,
  setting:PropTypes.func.isRequired,
};

const {Container, IconLayout, SettingLayout, SignOutLayout} = style;
