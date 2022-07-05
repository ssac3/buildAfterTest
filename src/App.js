import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Dashboard from 'pages/manager/dashboard';
import EmpManagement from 'pages/admin/emp_mangement';
import AtdcManagement from 'pages/user/AtdcManagement';
import SignIn from 'pages/signin';
import Header from 'components/Header';
import Navigation from './components/Navigation';
import {ADMIN_MENU, MANAGER_MENU, USER_MENU, API} from 'utils/constants';
import Setting from 'pages/manager/setting';
import {useSelector} from 'react-redux';
import Alert from 'components/Alert';
import RearrangeMngment from 'pages/manager/rearrangeMngment';
import DetailEmplAtndc from 'pages/manager/DetailEmplAtndc';
import EamPage from 'pages/manager/EamPage';
import EmpInsert from 'pages/admin/emp_insert';
import EmpDetail from 'pages/admin/emp_detail';
import DetailDavPage from 'pages/user/DetailDavPage';

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
  const emplist = useSelector((state) => state.AdminReducer);
  const [roleURL, setRoleURL] = useState(window.location.pathname);
  const [select, setSelect] = useState(getMenu(roleURL));
  const [setting, setSetting] = useState(false);
  const [openInsertModal, setOpenInsertModal] = useState(false);
  const [selectedEmpl, setSelectedEmpl] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);
  const [openATR, setOpenATR] = useState(0);
  const [openEadDetail, setOpenEadDetail] = useState([]); // 근태 담당자 사원별 근태 조회(일별)
  const [openEamDetail, setOpenEamDetail] = useState([]); // 근태 담당자 사원별 근태 조회(월별)
  const [openDavDetail, setOpenDavDetail] = useState([]); // 사원 일별 근태 조회
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


  const emplDetail = React.useMemo(() => {
    if(selectedEmpl > 0 && (
      emplist?.emps?.length > 0 && emplist.emps[0].username !== undefined
    )) {
      return (emplist.emps.filter((v) => v.username === selectedEmpl)[0]);
    }
    return {};
  }, [emplist, selectedEmpl]);
  const onClickInsertEmp = () => {
    setOpenInsertModal(!openInsertModal);
  };
  const onClickDetailEmp = (target) => {
    setSelectedEmpl(target);
  };
  const onClickEadDetail = (target) => {
    setOpenEadDetail(target);
  };

  const onClickEamDetail = (target) => {
    console.log(target);
    setOpenEamDetail(target);
  };


  const onClickDavDetail = (target) => {
    setOpenDavDetail(target);
  };
  useEffect(() => {
    if (signIn?.data === 'ADMIN') {
      setSelect(getMenu(API.ADMIN));
    } else if (signIn?.data === 'USER') {
      setSelect(getMenu(API.USER));
    } else {
      setSelect(getMenu(API.MANAGER));
    }
    return (() => {
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
      {setting && <Setting open={onClickSetting}/>}
      {openInsertModal && <EmpInsert/>}
      {selectedEmpl !== 0 && <EmpDetail emp={emplDetail} onClickDetailEmp={onClickDetailEmp}/>}
      {openEadDetail?.length > 0 &&
        <DetailEmplAtndc openEadDetail={openEadDetail} onClickEadDetail={onClickEadDetail}/>}
      {openEamDetail?.length > 0 &&
        <EamPage/>}

      {openDavDetail?.length > 0 &&
        <DetailDavPage detailInfo={openDavDetail} onClickDavDetail={onClickDavDetail}/>}

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
      <BrowserRouter>
        <Switch>
          <Route exact path={API.ROOT} component={SignIn}/>
          <Wrap p={position()}>
            <Route
              path={API.ADMIN}
              render={() => (
                <EmpManagement
                  onClickInsertEmp={onClickInsertEmp}
                  onClickDetailEmp={onClickDetailEmp}
                />)}
            />
            <Route
              path={API.MANAGER}
              render={() => (
                <Dashboard
                  selectedId={selectedItem}
                  onClickATR={onClickATR}
                  onClickEadDetail={onClickEadDetail}
                  onClickEamDetail={onClickEamDetail}
                />)}
            />
            <Route
              path={API.USER}
              render={() => (
                <AtdcManagement
                  selectedId={selectedItem}
                  onClickDavDetail={onClickDavDetail}
                />)}
            />
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