import {combineReducers} from 'redux'
import {LOGIN,LOGIN_INPUT,HOME_INDEX,INIT_HOME,WEATHER_INFO} from './login.js';
import {Preload,plus,mui} from '../../utils/extern.js';
import { cw,data,radar } from '../../components/weatherImg.js'
//获取用户信息
var userInfo = {
	account:window.localStorage.getItem("account"),
	password:window.localStorage.getItem("password")
};
var loginInputData = [{className:'login-input login-input-c',type:'text',placeholder:'用户名',ref:'name',value:userInfo.account},{className:'login-input login-input-p',type:'password',placeholder:'密码',ref:'password',value:userInfo.password}];
var footerData = [{className:'mui-icon  iconfont icon-shishigaikuang',text:'实况',num:'',path:'realtime'},{className:'mui-icon  iconfont icon-zhuye',text:'主页',num:'',path:'indexPage',active:true},{className:'mui-icon  iconfont icon-wode-copy',text:'我的',num:'',path:'mypage'}]
var canterData = [{imgSrc:"../img/cw.png",text:"天气广播"},{imgSrc:"../img/emergency.png",text:"应急响应"},
			{imgSrc:"../img/warning.png",text:"预警信息"},{imgSrc:"../img/service.png",text:"重大专报"},
			{imgSrc:"../img/water.png",text:"降水实况"},{imgSrc:"../img/temperature.png",text:"温度实况"},
			{imgSrc:"../img/wind.png",text:"风实况"},{imgSrc:"../img/th.png",text:"露点温度"},
			{imgSrc:"../img/radar.png",text:"雷达实况"},{imgSrc:"../img/cloud.png",text:"卫星实况"},
			{imgSrc:"../img/typhoon.png",text:"台风实况"},{imgSrc:"../img/humidity.png",text:"相对湿度"},
			{imgSrc:"../img/proportion.png",text:"传输质量"},{imgSrc:"../img/stationNet.png",text:"站网信息"},
			{imgSrc:"../img/database.png",text:"市县材料"},{imgSrc:"../img/file.png",text:"气象信息"}];
//控制主页的显示数据
var indexPanel = {
	mypage:false,
	realtime:false,
	indexPage:false
}
var indexPageInfo = [{imgSrc:cw,text:"周报填写"},{imgSrc:data,text:"项目维护"},
					{imgSrc:radar,text:"周报记录"}]
function loginIn(state = [], action) {
	switch (action.type) {
		case LOGIN:
			var account = action.userInfo.account;
			var password = action.userInfo.password;
			var userInfo = state.inputInfo.map((item,num) => {
				if(num === 0) {
					return Object.assign({},item,{value:account});
				} else {
					return Object.assign({},item,{value:password})
				}
			});
			return {...state,...{inputInfo:userInfo}};
		case LOGIN_INPUT:
			return {...state,...{inputInfo:loginInputData}};
		case HOME_INDEX:
			console.log(action)
			var index = action.index;
			var footer = state.footerData.map((item,num) => {
				if(num === index) {
					return Object.assign({},item,{active:true});
				} else {
					return Object.assign({},item,{active:false})
				}
			});
			return {...state,...{footerData:footer},...{indexPanel:Object.assign({},indexPanel,{[action.name]:true})}};
		case INIT_HOME:
			return {...state,...{indexPageInfo:indexPageInfo},...{indexPanel:Object.assign({},indexPanel,{indexPage:true})}};
		case WEATHER_INFO:
			return {...state,...{weatherInfo:action.weatherInfo}};
		default:
			return {inputInfo:state,footerData:footerData,canterData:canterData,indexPanel:indexPanel}
	}
}

const loginInReducer = combineReducers({
	loginIn
})

export default loginInReducer;

