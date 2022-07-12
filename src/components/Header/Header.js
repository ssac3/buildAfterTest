import React from 'react';
import PropTypes from 'prop-types';
import {API} from 'utils/constants';
import {style} from './HeaderStyle';
import logo from 'assets/logo.png';
import {MdLogout, MdSettings} from 'react-icons/md';
import {useDispatch} from 'react-redux';
import {SwpEasReq} from 'redux/actions/SignInAction';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const Header = ({role, setting}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const [onLogoutModal, setOnLogoutModal] = useState(false);
  const onClickSetting = () => {
    setting();
  };
  const Logout = () => {
    dispatch(SwpEasReq(history));
  };
  return(
    <Container>
      <img src={logo} alt="로고" width={130}/>
      <IconLayout>
        {role === API.MANAGER &&
          <SettingLayout>
            <MdSettings onClick={onClickSetting} size={35}/>
          </SettingLayout>}
        <SignOutLayout >
          <MdLogout onClick={Logout} size={35} />
        </SignOutLayout>
      </IconLayout>

    </Container>
  );
};

Header.propTypes = {
  role:PropTypes.string.isRequired,
  setting:PropTypes.func.isRequired
};

const {Container, IconLayout, SettingLayout, SignOutLayout} = style;
