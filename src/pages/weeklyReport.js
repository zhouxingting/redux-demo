import React, { Component } from 'react'
import { Header,WeekReport } from '../components/from.js'
import './css/weeklyReport.css'


const data = [{project:"贵州智慧旅游气象服务平台建设",subTime:"2018-5-7 16:99",time:"2018-5-7",type:"软件开发（基于HK的前、后端开发）",name:"智慧旅游项目原型开发",day:'10',taskExplain:"网站功能开发，灾害实况增加全部显示，环境实况取消市县选择，露点温度色标修改"},
            {project:"贵州智慧旅游气象服务平台建设",subTime:"2018-5-7 16:99",time:"2018-5-7",type:"软件开发（基于HK的前、后端开发）",name:"智慧旅游项目原型开发",day:'10',taskExplain:"网站功能开发，灾害实况增加全部显示，环境实况取消市县选择，露点温度色标修改"}]
class WeeklyReport  extends Component {
    hide() {
        this.props.history.push("./home/secondpage");
    }
    render() {
        var arr = [];
        data.forEach(function(item,index){
            arr.push(<WeekReport {...item} />);
        })
        return (
            <div className="reportCnt">
                <Header title="周报记录" hide={this.hide.bind(this)} />
                <div className="weekReport">
                    <div className="choseCondition">
                        <div>条件筛选</div>
                    </div>
                    <div>{arr}</div>
                 </div>
            </div>
        )
    }
}

export default WeeklyReport;