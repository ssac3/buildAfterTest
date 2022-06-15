import React from 'react';
import {style} from './HeaderStyle';
import logo from 'assets/logo.png';
import {MdLogout} from 'react-icons/md';
function Header() {
  return(
    <Container>
      <img src={logo} alt="로고"/>
      <MdLogout size={35} color={'#797979'}/>

    </Container>
  );
}
const {Container} = style;
export default Header;
