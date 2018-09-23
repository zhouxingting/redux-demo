import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import { addUserInfo, getInputInfo } from '../store/login/login.js';
import { connect } from 'react-redux';
import { LoginInput,LoginBtn,LoginImg } from '../components/from.js';
import API from '../api/api.js';
import {ol,cancelUpdate,Preload,plus} from '../utils/extern.js';
import './css/login.css';

class Login extends Component {
    state={
        checkedType:true,
        alertTip:''
    }
    userInfo = {};
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    componentDidMount() {
        if (!this.props.inputInfo.length) {
            this.props.getInputInfo();
        }
    }
    updateStateProp(event) {
        var inputValue = event.target.value;
		if(event.target.type === "text") {
			this.userInfo.account = inputValue; //用户名
		} else {
			this.userInfo.password = inputValue; //密码
        }
        this.props.addUserInfo(this.userInfo); //更新用户信息至store
    }
    onchange() {
        var checkedType = !this.state.checkedType;
        this.setState({
            checkedType:checkedType
        });
        if(checkedType === false) {
            window.localStorage.removeItem('password') //清除session
        }
    }
    handelClick = async () => {
        var name = this.refs.name.props.data.value;
        var password = this.refs.password.props.data.value;
        var checkedType = this.state.checkedType;
        if (name && password) {
           // this.props.history.push("/home/login");
            let result = await API.login({ params: {account:name,password:password} });
            console.log("************")
            console.log(result)
            console.log("************")
            if (result) {
                window.localStorage.setItem('account',"name");//用于记住密码功能
                if(checkedType) {window.localStorage.setItem('password',"password")};
                //plus.storage.setItem('userDataInfo',result) //保存用户信息至session
                this.props.history.push("/home/login");
            }
            console.log("*****我延迟执行了，但是没有阻塞*******")
        } else {
            console.log("输入不能为空");
        }
    }
    render() {
        var inputs=[];
        this.props.inputInfo.forEach((item,index)=>{
            inputs.push(<LoginInput key={index} data={item} ref={item.ref} updateStateProp={this.updateStateProp.bind(this)} />)
        })
        return (
            <div>
                <div className="login-bg">
                    <LoginImg />
                    {inputs}
                    <LoginBtn handelClick={this.handelClick.bind(this)} data={{classNameDiv:'login-btn',text:'登录',className:'mui-btn mui-btn-primary'}}/>
                    <div className="login-link">
                        <div className="mui-checkbox muiInputCnt">
                            <input onChange={this.onchange.bind(this)} type="checkbox" className="muiInput" name="checkbox1" value="Item 1" checked={this.state.checkedType} />
                            <span>记住密码</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const LoginIn = connect(function(state){
   // console.log(state);
    return {inputInfo:state.default.loginIn.inputInfo}
}, {
    addUserInfo, 
    getInputInfo, 
})(Login);

// console.log(state);
// const LoginIn = connect(state => ({
//     inputInfo: state.default.loginIn,
// }), {
//     addUserInfo, 
//     getInputInfo, 
// })(Login);

export default LoginIn;