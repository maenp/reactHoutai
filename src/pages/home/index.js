import React, { Component } from 'react'
import ECharts from 'echarts'
import { connect } from "react-redux"
import { USERLIST } from '@actions'
const mapStateToProps = (state) => {
    return {
        prop: state.home
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getUserListHandler: () => {
            dispatch(USERLIST())
        }
    }
}
@connect(mapStateToProps, mapDispatchToProps)
class Home extends Component {
    constructor() {
        super()
        
        
    }
    render() {
        return (
            <div ref="echarts" style={{ height: '500px', width: "1000px" }}></div>
        )
    }
    componentWillMount() {
        console.log(this.props.prop)
        let {timeItem,timeSum}=this.props.prop
        console.log(timeItem,timeSum)
        this.option = {
            title: {
                text: '用户注册量(为0则不显示)'
            },
            tooltip: {},
            legend: {
                data: ['注册数']
            },
            xAxis: {
                data: timeItem
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '注册数',
                type: 'bar',
                data: timeSum
            }]
        }
        this.props.getUserListHandler()
    }
    componentDidMount() {
        ECharts.init(this.refs.echarts).setOption(this.option);
    }
}
export default Home