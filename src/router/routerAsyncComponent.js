import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from '../components/asyncComponent';

import LoginIn from '../pages/login';
const home = asyncComponent(() => import("../pages/home"));
const writeWeekly = asyncComponent(() => import("../pages/writeWeekly"));

// react-router4 不再推荐将所有路由规则放在同一个地方集中式路由，子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活
export default class RouteConfig extends Component{
  render(){
    return(
      <HashRouter>
        <Switch>
          <Route path="/" exact component={LoginIn} />
          <Route path="/home" component={home} />
          <Route path="/writeWeekly" component={writeWeekly} />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    )
  }
}