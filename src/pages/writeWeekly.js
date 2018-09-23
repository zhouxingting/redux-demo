import React, { Component } from 'react'
import { Header } from '../components/from.js'
import './css/writeWeekly.css'
import { Picker,List,WhiteSpace,DatePicker,InputItem,TextareaItem } from 'antd-mobile';

const district = [{value: '001',label: '宁夏综合气象信息管理系统'},{value: '002',label: '广西气象业务内网建设'},{value: '003',label: '贵州智慧旅游气象服务平台建设'}]
const districtType = [{value: '001',label: '软件开发（基于HK的前、后端开发）'},{value: '002',label: '软件设计（项目的概要、详细设计工作）'},
                    {value: '003',label: '软件设计（项目的概要、详细设计工作）'},{value: '004',label: '软件测试（软件项目测试工作）'},
                    {value: '0013',label: '软件实施（项目相关的安装、部署、调试、培训等工作）'},{value: '006',label: '技术支持（支撑其他部门的技术工作，技术交流、系统演示、售前需求调研等）'},
                    {value: '005',label: '项目运维（软件项目在生产环境、公司环境的运维工作)'},{value: '008',label: '汇报工作（项目各阶段的汇报、部门分享汇报，对外交流汇报）'},
                    {value: '007',label: '技术研究（与项目相关的技术研究、学习工作）'},{value: '0010',label: '方案编写（可行性方案、投标、解决方案等编写工作）'},
                    {value: '009',label: '管理工作（部门管理、团队管理等相关工作)'},{value: '0011',label: '人员培养（业务、技术、项目管理等培训工作）'},
                    {value: '0012',label: '知识沉淀（构件、专利、软件著作权等相关知识制作）'}];
const districtDay = [{value: '001',label: '0.5'},{value: '002',label: '1'},{value: '003',label: '1.5'},{value: '004',label: '2'},
                    {value: '005',label: '2.5'},{value: '006',label: '3'},{value: '007',label: '3.5'},{value: '008',label: '4'},
                    {value: '009',label: '4.5'},{value: '0010',label: '5'}];
const districtAchievement = [{value:"001",label:"功能代码"},{value:"002",label:"系统数据"}]

class WriteWeekly  extends Component {
    state = {
        value:"",
        typeValue:"",
        dayValue:"",
        AchievementValue:"",
        date:""
    }
    hide() {
        this.props.history.push("./home/secondpage");
    }
    submitClick() {
        var state = this.state;
        state.taskName = this.taskName.state.value;
        state.taskExplain = this.taskExplain.state.value;
        state.taskReason = this.taskReason.state.value;
        state.taskMemo = this.taskMemo.state.value;
        console.log(state);
    }
    componentDidMount() {
        console.log("我进来了。。");//获取数据
    }
    render() {
        return(
            <div className="wrapperCnt">
                <Header title="周报填写" hide={this.hide.bind(this)} />
                <div className="weekReport">
                    <Picker data={district} cols={1} className="forss" onOk={v => this.setState({ value: v })} value={this.state.value} >
                        <List.Item arrow="horizontal">项目名称</List.Item>
                    </Picker>
                    <div style={{"margin-top":"10px"}}>
                        <Picker data={districtType} cols={1} className="forss" onOk={v => this.setState({ typeValue: v })} value={this.state.typeValue} >
                            <List.Item arrow="horizontal">任务类型</List.Item>
                        </Picker>
                    </div>
                    <div style={{"margin-top":"10px"}} className="taskInput">
                        <InputItem placeholder="请填写任务名称" clear ref={el => this.taskName = el} >任务名称</InputItem>
                    </div>
                    <div style={{"margin-top":"10px"}} className="taskTextarea">
                        <TextareaItem placeholder="任务简要说明" rows={3} autoHeight ref={el => this.taskExplain = el} />
                    </div>
                    <div style={{"margin-top":"10px"}}>
                        <Picker data={districtDay} cols={1} className="forss" onOk={v => this.setState({ dayValue: v })} value={this.state.dayValue} >
                            <List.Item arrow="horizontal">执行天数</List.Item>
                        </Picker>
                    </div>
                    <div style={{"margin-top":"10px"}} className="taskInput">
                        <InputItem placeholder="请填写原因" clear ref={el => this.taskReason = el} >未完成原因</InputItem>
                    </div>
                    <div style={{"margin-top":"10px"}}>
                        <DatePicker mode="date" extra="请选择" value={this.state.date} onChange={date => this.setState({ date })} >
                            <List.Item arrow="horizontal">完成时间</List.Item>
                        </DatePicker>
                    </div>
                    <div style={{"margin-top":"10px"}}>
                        <Picker data={districtAchievement} cols={1} className="forss" onOk={v => this.setState({ AchievementValue: v })} value={this.state.AchievementValue} >
                            <List.Item arrow="horizontal">成果物</List.Item>
                        </Picker>
                    </div>
                    <div style={{"margin-top":"10px"}} className="taskTextarea">
                        <TextareaItem placeholder="备注" rows={1} autoHeight ref={el => this.taskMemo = el} />
                    </div>
                    <div className="submit">
                        <button onClick={this.submitClick.bind(this)}>提交</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default WriteWeekly;