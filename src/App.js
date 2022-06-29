import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Dashboard from 'pages/manager/dashboard';
import EmpManagement from 'pages/admin/emp_mangement';
import AtdcManagement from 'pages/user/attendence';
import SignIn from 'pages/signin';
import Header from 'components/Header';
import Navigation from './components/Navigation';
import {ADMIN_MENU, MANAGER_MENU, USER_MENU, API, LOCAL_STORAGE} from 'utils/constants';
import Setting from 'pages/manager/setting';
import {useSelector} from 'react-redux';
import Alert from 'components/Alert';
import RearrangeMngment from 'pages/manager/rearrangeMngment';
import {EmpInsert} from 'pages/admin/emp_insert/EmpInsert';

function getMenu(role) {
  switch (role) {
    case API.ADMIN:
      return ADMIN_MENU;
    case API.MANAGER:
      return MANAGER_MENU;
    default:
      return USER_MENU;
  }
}

function App() {
  const alert = useSelector((state) => state.AlertReducer);
  const signIn = useSelector((state) => state.SignInReducer);
  const rearrange = useSelector((state) => state.MangerReducer);
  const [roleURL, setRoleURL] = useState(window.location.pathname);
  const [select, setSelect] = useState(getMenu(roleURL));
  const [setting, setSetting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [openATR, setOpenATR] = useState(0);

  const onClickMenu = (e) => {
    const change = getMenu(roleURL).map(value => (value.id === Number(e.target.id) ? {
      ...value,
      check: true
    } : {...value, check: false}));
    setSelect(change);
  };
  const onClickSubMenu = (e) => {
    const target = select.map(value => value.sub.map(v => (v.id === Number(e.target.id) ? {
      ...v,
      check: true
    } : {...v, check: false})));

    const result = select.map((v, i) => v.sub.id === target[i].id && {...v, sub: target[i]});
    setSelect(result);
  };

  const onGetTarget = () => {
    const target = select.filter(value => value.check && value)[0];
    const result = target.sub.length > 0 ? target.sub.filter(v => v.check && v)[0].id : target.id;
    setSelectedItem(result);
  };

  const position = () => {
    return (select.filter(v => v.check)[0].sub.length > 0) ? (65 + 238) : 185;
  };
  const onClickSetting = () => {
    setSetting(!setting);
  };
  const onClickATR = (target) => {
    setOpenATR(target);
  };

  const atvDetail = React.useMemo(() => {
    if(openATR > 0 && (
      rearrange.data?.length > 0 && rearrange.data[0].rId !== undefined
    )) {
      return (rearrange.data.filter((v) => v.rId === openATR)[0]);
    }
    return '';
  }, [rearrange, openATR]);

  const onClickInsertEmp = () => {
    setOpenModal(!openModal);
  };
  useEffect(() => {
    if (signIn?.data === 'ADMIN') {
      setSelect(getMenu(API.ADMIN));
    } else if (signIn?.data === 'USER') {
      setSelect(getMenu(API.USER));
    } else {
      LOCAL_STORAGE.set('depId', signIn?.data?.depId);
      setSelect(getMenu(API.MANAGER));
    }
    return (() => {
      console.log('안농');
      setRoleURL(window.location.pathname);
    });
  }, [signIn]);

  useEffect(() => {
    setSelect(getMenu(roleURL));
  }, []);

  useEffect(() => {
    onGetTarget();
  }, [select]);
  return (
    <>

      {openATR !== 0 && <RearrangeMngment onClickATR={onClickATR} atvDetail={atvDetail}/>}

      {alert.open && <Alert status={alert.status} msg={alert.msg}/>}
      {roleURL !== API.ROOT && (
        <>
          <Header role={roleURL} setting={onClickSetting}/>
          <Navigation
            role={roleURL}
            menu={select}
            onClickMenu={onClickMenu}
            onClickSubMenu={onClickSubMenu}
          />
        </>
      )}
      {setting && <Setting open={onClickSetting}/>}
      {openModal && <EmpInsert/>}
      <BrowserRouter>
        <Switch>
          <Route exact path={API.ROOT} component={SignIn}/>
          <Wrap p={position()}>
            <Route
              path={API.ADMIN}
              render={() => <EmpManagement onClickInsertEmp={onClickInsertEmp}/>}
            />
            <Route
              path={API.MANAGER}
              render={() => (
                <Dashboard
                  selectedId={selectedItem}
                  onClickATR={onClickATR}
                />)}
            />
            <Route path={API.USER} render={() => <AtdcManagement selectedId={selectedItem}/>}/>
          </Wrap>
        </Switch>
      </BrowserRouter>
    </>
  );
}

const Wrap = styled.div`
  ${({theme}) => theme.flexSet()};
  position: absolute;
  padding: 30px;
  top: 70px;
  left: ${({p}) => p}px; // 수정
  width: calc(100% - (65px + 238px));
  height: calc(100% - 70px);
`;
export default App;
