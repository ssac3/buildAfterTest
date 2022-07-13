import React from 'react';
import PropTypes from 'prop-types';
import {API, LOCAL_STORAGE} from 'utils/constants';
import {style} from './HeaderStyle';
import logo from 'assets/logo.png';
import {MdLogout, MdSettings, MdReplay} from 'react-icons/md';
import {useDispatch} from 'react-redux';
import {SwpEasReq} from 'redux/actions/SignInAction';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
export const Header = ({setting}) => {
  const role = LOCAL_STORAGE.get('ROLE');
  const dispatch = useDispatch();
  const history = useHistory();
  const onClickSetting = () => {
    setting();
  };
  const Logout = () => {
    dispatch(SwpEasReq(history));
  };

  const onClickConvert = () => {
    const currentPage = window.location.pathname;
    if(currentPage === API.MANAGER) {
      window.location.replace(API.USER);
    } else {
      window.location.replace(API.MANAGER);
    }
  };
  return(
    <Container>
      <img src={logo} alt="로고" width={130}/>
      <IconLayout>
        {role === '1' &&
          <>
            <InnerLayout onClick={onClickConvert}>
              <div id={'tooltip'}>권한 변경</div>
              <MdReplay size={35}/>
            </InnerLayout>
            {window.location.pathname === API.MANAGER && (
              <InnerLayout onClick={onClickSetting}>
                <div id={'tooltip'}>출퇴근 시간 설정</div>
                <MdSettings onClick={onClickSetting} size={35}/>
              </InnerLayout>
            )}
          </>}
        <InnerLayout onClick={Logout}>
          <div id={'tooltip'}>로그아웃</div>
          <MdLogout size={35}/>
        </InnerLayout>
      </IconLayout>

    </Container>
  );
};

Header.propTypes = {
  setting:PropTypes.func.isRequired
};

const {Container, IconLayout, InnerLayout} = style;
