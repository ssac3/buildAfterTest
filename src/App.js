import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from 'pages/manager/dashboard';
import EmpManagement from 'pages/admin/emp_mangement';
import AtdcManagement from 'pages/user/attendence';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/" component={}/> */}
        <Route path={'/admin'} render={() => <EmpManagement role={'admin'}/>}/>
        <Route path={'/manager'} render={() => <Dashboard role={'manager'}/>}/>
        <Route path={'/user'} render={() => <AtdcManagement role={'user'}/>}/>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
