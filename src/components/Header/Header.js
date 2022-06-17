import React from 'react';
import PropTypes from 'prop-types';
import {style} from './HeaderStyle';
import logo from 'assets/logo.png';
import {MdLogout, MdSettings} from 'react-icons/md';

export const Header = ({role}) => {
  return(
    <Container>
      <img src={logo} alt="로고" width={130}/>
      <IconLayout>
        {role === 'manager' && <MdSettings size={35} />}
        <MdLogout size={35} />
      </IconLayout>

    </Container>
  );
};

Header.propTypes = {
  role:PropTypes.string.isRequired,
};

const {Container, IconLayout} = style;
