import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import { connect } from 'react-redux';
import { changeHome ,initHome,getWeatherInfo} from '../store/login/login.js';
import { LoginInput,LoginBtn,LoginImg,Footer,IndexHeader,IndexCenter} from '../components/from.js';
import './css/indexPage.css';
import {ol,cancelUpdate,Preload,plus,mui} from '../utils/extern.js';


import { Select } from 'antd';
const Option = Select.Option;

class IndexPage  extends Component {
    render() {
        return (
            <div style={{display:this.props.display?'block':'none'}}>
                <IndexHeader {...this.props} />
                <IndexCenter indexPageInfo = {this.props.indexPageInfo} handleClick={this.props.handleClick} />
            </div>
        )
    }
}
class Realtime  extends Component {
    render() {
        return (
            <div style={{display:this.props.display?'block':'none'}}>我是空白页</div>
        )
    }
}
class MyPage  extends Component {
    render() {
        return (
            <div style={{display:this.props.display?'block':'none'}}>我是个人主页</div>
        )
    }
}

class HomePage extends Component {
    componentDidMount() {
        var _this = this;
        this.props.initHome();
        mui.plusReady(function(){
            getPosition(function() {
                var name=plus.storage.getItem('adminCodes')||'成都市';
                _this.props.getWeatherInfo({params:{city:name}})
            })
        });
        //this.props.getWeatherInfo({params:{city:"成都市"}})
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    handleClick(value) {
        var name = value.text;
        switch (name) {
            case "周报填写" :
                this.props.history.push("/writeWeekly");
                break;
            case "周报记录" :
                this.props.history.push("/weeklyReport");
            break;
        }
       // 
    }
    handleChange() {

    }
    render () {
        return(
            <div>
                <Select defaultValue="lucy" style={{ "width": 120,"z-index":"999" }} onChange={this.handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
				<IndexPage display={this.props.indexPanel.indexPage} weatherInfo={this.props.weatherInfo} indexPageInfo={this.props.indexPageInfo} handleClick={this.handleClick.bind(this)}/>
				<Realtime display={this.props.indexPanel.realtime}/>
				<MyPage display={this.props.indexPanel.mypage}/>
                <Footer data={this.props.footerInfo} handleClick={this.props.changeHome}/>
            </div>
        )
    }
}
function getPosition(fun){//获取位置信息
	// plus.webview.currentWebview().setStyle({replacewebapi:{geolocation:'auto'}})
	// plus.geolocation.getCurrentPosition(function(position){
	// 			var address=position.address;//获取位置信息；
	// 			var province=address.province,
	// 				city=address.city,
	// 				district=address.district;
	// 				plus.storage.setItem('adminCity',city)
	// 				plus.storage.setItem('adminCodes',district);//保存城市给地图读取
	// 				plus.storage.setItem('adminCoords',JSON.stringify(position.coords))//保存位置信息
	// 				//alert(district)
	// 				fun&&fun()
					
	// 	},function(){fun&&fun()})
}
const Home = connect(function(state){
    console.log(state);
     return {
        userInfo: state.default.loginIn.userInfo,
        footerInfo: state.default.loginIn.footerData,
        centerInfo: state.default.loginIn.canterData,
        indexPanel:state.default.loginIn.indexPanel,
        weatherInfo:state.default.loginIn.weatherInfo || {},
        indexPageInfo:state.default.loginIn.indexPageInfo
    }
 },{
    changeHome,
    initHome,
    getWeatherInfo
 })(HomePage);

export default Home;