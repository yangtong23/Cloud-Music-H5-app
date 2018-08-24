import React, { Component } from 'react';
import { List, Icon } from 'antd-mobile';
import axios from 'axios'
import { ip } from '../default_term'
import './mine.css'
import History  from './history'
const Item = List.Item;


class Mine extends Component {
    constructor(p){
        super(p);
        this.state={
            history:0
        }
    }

    render() {
        return (
            <div className="mine_page_box">
            <div className="mine_page">
                <List >
                    <Item
                        thumb="./image/a01.png"

                        onClick={() => { }}
                    >本地音乐 <span>(52)</span></Item>
                    <Item
                        thumb="./image/a02.png"
                        
                        onClick={this.open_history.bind(this)}
                    > 最近播放 <span>({this.state.history})</span></Item>
                    <Item
                        thumb="./image/a03.png"

                        onClick={() => { }}
                    > 下载管理 <span>(42)</span></Item>
                    <Item
                        thumb="./image/a04.png"

                        onClick={() => { }}
                    > 我的电台 <span>(11)</span></Item>
                    <Item
                        thumb="./image/a05.png"

                        onClick={() => { }}
                    > 我的收藏 <span>(26)</span></Item>

                </List>
                <div className="mine_list">
                    <div>
                        <Icon type="right" size="sm" color="#a19e9e" />
                        <span>创建的歌单(0)</span>
                    </div>
                    <img src="./image/a5y.png" />
                </div>
            </div>
            <div id="history_page" ref="history" className="history_page_hidden">
              <History />
            </div>
            </div>

        )
    }
    open_history(){
       this.refs.history.className="history_page_display";
      
    }
    componentDidMount() {
        
        axios.post(ip + '/find_history', {}).then((msg) => {
            console.log(msg)
             this.setState({
                history:msg.data.length
             }) 
        })


    }
}

export default Mine

