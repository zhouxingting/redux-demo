import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import asyncComponent from '../components/asyncComponent';
import LoginIn from '../pages/login.js';
import './router.css';
import writeWeekly from '../pages/writeWeekly.js';
import WeeklyReport from '../pages/weeklyReport.js';
import home from '../pages/home.js';
// react-router4 不再推荐将所有路由规则放在同一个地方集中式路由，子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活
// 300新组件显示和旧组件消失的过渡时间，需和css的动画时间保持一致，否则会出现多个组件的情况
const RouteConfig = () => (
    <Router>
        <Route
            render={({ location }) => {
                //console.log(location)
                var className = "slide-in";
                var dom = location.pathname == "/" ? "ul" :"div"; //避免没有过渡页面高度double
                if (location.pathname == "/home/login") {
                    className = "slide-login";
                }
                if (location.pathname == "/home/secondpage") {
                    className = "slide-out";
                }
                if (location.pathname == "/writeWeekly") {
                    className = "slide-in";
                }
                return (
                    <div>
                        <Route path="/" exact component={LoginIn} />
                        <TransitionGroup component={dom}>
                            <CSSTransition key={location.key} classNames={className} timeout={300}>
                                <Switch location={location}>
                                    <Route exact path="/home/:linkname" component={home} />
                                    <Route exact path="/writeWeekly" component={writeWeekly} />
                                    <Route exact path="/weeklyReport" component={WeeklyReport} />
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    </div>
                )
            }}
        />
    </Router>
);

export default RouteConfig;