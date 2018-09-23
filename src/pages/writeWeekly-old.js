import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './css/writeWeekly.css'

class WriteWeekly  extends Component {
    handleClikc() {
        this.props.history.push("./home");
    }
    componentDidMount() {
        console.log("我进来了。。")
    }
    render() {
        return(
            <ReactCSSTransitionGroup  transitionName="animate-slide-left" transitionAppear={true} transitionLeave={true} transitionEnter={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                <div key={window.location.pathname}>
                    <div onClick={this.handleClikc.bind(this)}>返回》</div>
                    我是周报填写页面
                    我是周报填写页面
                    我是周报填写页面
                    我是周报填写页面
                    我是周报填写页面
                    我是周报填写页面
                    我是周报填写页面
                    我是周报填写页面
                    我是周报填写页面
                    我是周报填写页面
                </div>
            </ReactCSSTransitionGroup>
        )
    }
}

export default WriteWeekly;