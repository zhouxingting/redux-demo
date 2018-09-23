import React, { Component,PureComponent } from 'react';
import {ol,cancelUpdate,Preload,plus,mui,getDateInfo,getBodyTop} from '../utils/extern.js';
import './css/from.css'
import MC2 from './img/MC2.png';
import MC1 from './img/MC1.png';
import positon from './img/positon.png';
import bell from './img/bell.png';
import * as weather from './weatherImg.js';
// 登录input
class LoginInput extends Component{
    render() {
        let props = this.props;
        return (
            <div className={props.data.className}>
                <input onFocus={props.onFocus ||function(){}} onBlur={props.onBlur||function(){}} type={props.data.type} placeholder={props.data.placeholder} value={props.data.value} ref={props.data.ref} onChange={props.updateStateProp} />
            </div>
        )
    }
}

function LoginBtn(props) {
	return (
		<div className={props.data.classNameDiv}>
			<button type="button" className={props.data.className} onClick={props.handelClick}>{props.data.text}</button>
		</div>
	)
}
function LoginImg(props) {
	return(
		<div style={{paddingTop:"35px"}}>
			<div className="logo-img ">
				<img src={MC2} />
				<img src={MC1} />
			</div>
		</div>
	)
}
/*首页组件*/
function FooterSingle(props) {
	var data=props.data,span,num=data.num;
	var cs=data.active?'mui-tab-item mui-active':'mui-tab-item';
	if(num){
		span=(num)=>(
			<span className="mui-badge">num</span>
		)
	}
	return (
		<a className={cs} data-role={data.path} onClick={() => { props.click() }}>
			<div className={data.path === 'indexPage' ? 'main-active' : ''}>
				<span className={data.className} data-role={data.path}></span>{span}
				<span className="mui-tab-label" data-role={data.path}>{data.text}</span>
			</div>
		</a>
	)
}
class Footer extends Component{
	render() {
		var arr=[];
		this.props.data.forEach((item,index) => {
			arr.push(<FooterSingle key={index} data={item} click={()=>{this.props.handleClick(index,item.path)}}/>)
		});
		return(
			<div>
				<footer className="mui-bar mui-bar-tab footer">
					{arr}
				</footer>
			</div>
		)
	}
}

function HeaderTop(props) {
	var classText;
	props.circleNews ? classText="circleNews" : classText="";
	var name;
	// mui.plusReady(function(){
	// 	name=plus.storage.getItem('adminCodes')||'成都市';
	// });
	return(
		<div className="topCnt">
			<div className="topLeft">
				<img src={positon} />{name}
			</div>
			<div className="topCenter" onClick={props.search}>
				淞幸科技
			</div>
		</div>
	)
}
function ScrollItem(props){
	return(
		<li onClick={props.click}>
			<span>{props.signaltype}</span>
			<span>{props.signallevel}</span>
		</li>
	)
}
class ScrollContainer extends React.PureComponent{
	componentDidMount(){
		this.props.data.length>1 && this.startTimer()
	}
	startTimer(){
		var _this=this;
		this.stopTimer();
		this.timer=setInterval(function(){
			
			 if(_this.box.scrollTop>=_this.con.offsetHeight){
                    _this.box.scrollTop=0;
                }else{
                    _this.box.scrollTop++
                }
		}.bind(this),100)
	}
	stopTimer(){
		if(!this.timer){return}
		clearInterval(this.timer);
		this.timer=null
	}
	componentWillReceiveProps(nextprops){
		if(nextprops.data.length>1){
			this.startTimer()
		}else{
			this.stopTimer()
		}
	}
	render(){
		return (
			<div className="scrollBox" ref={(box)=>{this.box=box}}>
					<ul ref={(con)=>{this.con=con}}>{this.props.data}</ul>
					<ul>{this.props.data}</ul>
			</div>
		)
	}
}
function getdayTime(time) {
	var h=time.getHours();
	var m=time.getMinutes();
	if(h > 12) {
		return h+":"+(m<10?'0'+m:m)+" PM";
	} else {
		return h+":"+(m<10?'0'+m:m)+" AM";
	}
}
var dataTime = getDateInfo(new Date());

function getTimeInfo(){
	return{
		time:getdayTime(new Date()),
		day:dataTime.year+"年"+dataTime.month+"月"+dataTime.day+"日",
		week:dataTime.week,
	}
}
function HeaderBottom(props) {
	var dataInfo = getTimeInfo();
	return(
		<div>
			<div className="topBottom">
				<div>{dataInfo.time}</div>
				<div>{dataInfo.week}</div>
				<div>{dataInfo.day}</div>
			</div>
		</div>
	)
}
function HeaderCenter(props) {
	var arr=[],len=0;
	if(props.data){
	    len=props.data.length;
		props.data.forEach(function(item,index){
			arr.push(<ScrollItem click={(e)=>{props.click(item)}} {...item} key={index}/>)
		})
	}
	
	return(
		<div className="topCenterCnt">
			<div className="topCenter">
				<img src={props.img} />
			</div>
			<div className="topCenterText">{props.wendu}</div>
			<div className="topCenterRight">
				<div><span style={{border: "2px solid white",float:"left",borderRadius:"50%",padding:"6px"}}></span>{props.type}</div>
				
				<div style={{display:len===0?'none':'block'}}>
					<img src={bell} />
					 <ScrollContainer data={arr}/>
				</div>
			</div>
		</div>
	)
}
class IndexHeader extends Component {
    render() {
		var weatherImg = this.props.weatherInfo.img && this.props.weatherInfo.img.split(".")[0];
        return(
			<div className="headerStyle" style={{...cancelUpdate.statusHeight(180,10),backgroundImage:'url('+Preload.url+this.props.weatherInfo.bgImg+')'}}>
				<HeaderTop {...this.props} />
				<div className="headerCenter">
					<HeaderCenter {...this.props.weatherInfo} click={this.props.click} img={ weather[weatherImg] ||weather.cloudy} />
				</div>
				<HeaderBottom />
			</div>
        )
    }
}
//主页中心构件
/*中间小组件*/
function IndexMainCenter(props) {
	return(
		<div style={props.style} onClick={props.handleClick} className="centerBtn">
			<a href='javascript:void(0)'>
				<div><img src={props.dataInfo.imgSrc} /></div>
				<div>{props.dataInfo.text}</div>
			</a>
		</div>
	)
}
class IndexCenter extends React.PureComponent {
	handleClick(value) {
		console.log(value);
		this.props.handleClick(value);
	}
	render() {
		var item = [],data=this.props.indexPageInfo || [],_this=this;
		data.forEach((value,index)=>{
			item.push(<IndexMainCenter handleClick={()=>{_this.handleClick(value)}} dataInfo={value} />);
		})
		console.log(this.props.indexPageInfo)
		return(
			<div className="centerStyle" style={getBodyTop(180)}>
				<div className="centerStyleCnt">
					{item}
				</div>
			</div>
		)
	}
}

function Header(props) {//高空实况title
	return(
		<div>
			<header className="mui-bar mui-bar-nav Bgbule">
				<div onClick={props.hide}>
					<a className="mui-action-back mui-icon mui-icon-left-nav mui-pull-left cloW" ></a>
					<h1 className="titleStyle cloW">{props.title}</h1>
				</div>
			</header>
		</div>
	);
}

function WeekReport(props) {
	return(
		<div className="weekReportCnt">
			<div className="reportTopInfo">
				<div><img src={bell} /></div>
				<div>
					<div>周兴婷</div>
					<div className="textGray">{props.subTime}</div>
				</div>
			</div>
			<div className="reportCenter">
				<div className="projectTitle">{props.project}</div>
				<div>
					<span className="textGray">任务名称：</span><span>{props.name}</span>
				</div>
				<div>
					<span className="textGray">任务类型：</span><span>{props.type}</span>
				</div>
				<div>
					<span className="textGray">任务简要说明：</span><span>{props.taskExplain}</span>
				</div>
			</div>
		</div>
	)
}

export {LoginInput,LoginBtn,LoginImg,Footer,IndexHeader,IndexCenter,Header,WeekReport};