import React, { Component } from 'react';
import {
    HashRouter as Router,
    Route, Link
} from 'react-router-dom';
import { Drawer, NavBar, Toast } from 'antd-mobile';
import Music from "./music"  //引入音乐模块
import Mine from './mine'    //引入我的模块
import Video from './video'    //引入视频模块
import axios from 'axios'
import { ip1, ip } from '../default_term'


let sidebar = (
    <div className="sidebar">
        <div className="sidebar_login" style={{ backgroundImage: `url(./image/zc.jpg) ` }}>
            <p>登录网易云音乐</p>
            <p>320k高音质无线下载，手机电脑多段同步</p>
            <Link to='/login'>
                <button>立即登录</button>
            </Link>
        </div>
        <ul className="sidebar_list">
            <li><img src="./image/a73.png" alt="" /> <span>我的消息</span> </li>
            <li><img src="./image/ah1.png" alt="" /> <span>会员中心</span> </li>
            <li><img src="./image/akb.png" alt="" /> <span>商场</span> </li>
            <li><img src="./image/ajz.png" alt="" /> <span>在线听歌免流量</span> </li>
            <div className="mem">
                <li><img src="./image/ajy.png" alt="" /> <span>我的好友</span> </li>
                <li><img src="./image/ah1.png" alt="" /> <span>附近的人</span> </li>
            </div>
            <li><img src="./image/a2c.png" alt="" /> <span>个性换肤</span> </li>
            <li><img src="./image/ak4.png" alt="" /> <span>附近的人</span> </li>

            <li><img src="./image/air.png" alt="" /> <span>停止定时播放</span> </li>
        </ul>
        <div className="sidebar_bottom">
            <p><img src="./image/ak5.png" alt="" /><span>夜间模式</span></p>
            <p><img src="./image/ak6.png" alt="" /><span>设置</span></p>
            <p><img src="./image/ajw.png" alt="" /><span>退出</span></p>

        </div>
    </div>

);
class Main extends React.Component {
    state = {
        open: false,
        img: "",
        user: ""
    }
    onOpenChange = (...args) => {
        console.log(args);
        this.setState({ open: !this.state.open });
        console.log(document.querySelector(".my-drawer").style.position)
    }
    componentDidMount() {
        let type = window.location.hash.split("/").pop()
        this.change(type);
        axios.post(ip + '/isLogin').then(msg => {
            if (msg.data !== "") {
                let { name = "未设置", img, bimg, _id } = msg.data
                // 绑定ID 到state中
                this.setState({
                    user: _id
                })
                // 判断有无头像 设置默认头像
                if (!img) {
                    this.setState({
                        img: "./image/a5c.png"
                    })
                }
                else {
                    this.setState({
                        img: ip  + img
                    })
                }
                // 判断有无背景图 设置默认背景图
                if (!bimg) { bimg = "./image/109951162919419715.jpg" }
                else { bimg = ip + "/images/" + bimg }
                sidebar = (
                    <div className="sidebar">
                        <div className="sidebar_login_s" style={{ backgroundImage: `url(${bimg}) ` }}>

                            <img src={this.state.img} className="user_head"  id="user_head_small" onClick={this.changeHead.bind(this)} />
                            <div className="user_msg">
                                <p className="user_name">{name}</p>
                                <div>
                                    <img src="./image/r8.png" />
                                    <span>签到</span>
                                </div>
                            </div>

                        </div>
                        <ul className="sidebar_list">
                            <li><img src="./image/a73.png" alt="" /> <span>我的消息</span> </li>
                            <li><img src="./image/ah1.png" alt="" /> <span>会员中心</span> </li>
                            <li><img src="./image/akb.png" alt="" /> <span>商场</span> </li>
                            <li><img src="./image/ajz.png" alt="" /> <span>在线听歌免流量</span> </li>
                            <div className="mem">
                                <li><img src="./image/ajy.png" alt="" /> <span>我的好友</span> </li>
                                <li><img src="./image/ah1.png" alt="" /> <span>附近的人</span> </li>
                            </div>
                            <li><img src="./image/a2c.png" alt="" /> <span>个性换肤</span> </li>
                            <li><img src="./image/ak4.png" alt="" /> <span>附近的人</span> </li>

                            <li><img src="./image/air.png" alt="" /> <span>停止定时播放</span> </li>
                        </ul>
                        <div className="sidebar_bottom">
                            <p><img src="./image/ak5.png" alt="" /><span>夜间模式</span></p>
                            <p><img src="./image/ak6.png" alt="" /><span>设置</span></p>
                            <p><img src="./image/ajw.png" alt="" /><span>退出</span></p>

                        </div>
                    </div>

                );
            }


        })

    }
   
    cancelChange() {
        this.refs.head_block.className = "changeHead_none";
    }
    changeHead() {
        this.refs.head_block.className = "changeHead_block";
        this.setState({
            open: false,
        })
    }
    change(val) {
       
        switch (val) {
            case "mine": {
                this.changeAll();
                this.refs.mine.src = ip1 + "/image/t_actionbar_music_selected.png";
            }

                break;

            case "music": {
                this.changeAll();
                this.refs.music.src = ip1 + "/image/t_actionbar_discover_selected.png";
            }

                break;
            case "video": {
                this.changeAll();
                this.refs.video.src = ip1 + "/image/t_actionbar_video_selected.png";
            }

                break;
        }

    }
    changeAll() {
        this.refs.mine.src = ip1 + "/image/t_actionbar_music_normal.png";
        this.refs.music.src = ip1 + "/image/t_actionbar_discover_normal.png";
        this.refs.video.src = ip1 + "/image/t_actionbar_video_normal.png";
    }
    render() {
        // fix in codepen


        return (
            <Router>
                <div className="main_page">
                    <NavBar icon={<img src="./image/ov.png" style={{ width: ".8rem", height: '.8rem' }} />} onLeftClick={this.onOpenChange.bind(this, '22')} style={{ background: "rgb(212, 59, 51)", height: "1.79rem" }}>

                        <Link to='/main/mine' onClick={this.change.bind(this, "mine")} >
                            <img src="./image/t_actionbar_music_normal.png" ref="mine" style={{ width: "1.8rem" }} />
                        </Link>
                        <Link to='/main/music' onClick={this.change.bind(this, "music")}>
                            <img src="./image/t_actionbar_discover_normal.png" ref="music" style={{ width: "1.8rem" }} />
                        </Link>
                        <Link to='/main/video' onClick={this.change.bind(this, "video")}>
                            <img src="./image/t_actionbar_video_normal.png" ref="video" style={{ width: "1.8rem" }} />
                        </Link>
                   <img src='/image/pf.png' onClick={()=>{this.props.history.push('/search')}} className="serach_btn" />
                   </NavBar>
                    <Drawer
                        className="my-drawer"
                        style={{ minHeight: document.documentElement.clientHeight }}
                        enableDragHandle
                        contentStyle={{ color: 'red', textAlign: 'center', paddingTop: 42 }}
                        sidebar={sidebar}
                        open={this.state.open}
                        onOpenChange={this.onOpenChange}

                    >

                        <div>
                            <Route path='/main/music' component={Music} />
                            <Route path='/main/mine' component={Mine} />
                            <Route path='/main/video' component={Video} />
                        </div>

                    </Drawer>
                    {/* 更换头像 */}
                    <div id="changeHead" ref="head_block" className="changeHead_none">
                        <img src={this.state.img} className="headdd" onClick={this.cancelChange.bind(this)} />
                        <div className="change_head_box">
                            <input type="file" id="file_input" ref="file" onChange={this.update.bind(this)} name="inputFile" />
                            <button className="change_btn">更换头像</button>
                            <button className="submit_btn" onClick={this.save_change.bind(this)}>完成</button>
                        </div>

                    </div>
                </div>
            </Router>
        );
    }
    //  保存头像
    save_change(){
        Toast.success('保存成功 ', 1);
        this.refs.head_block.className = "changeHead_none";
    }
    update(e) {
        let file = e.target.files[0];

        let param = new FormData(); //创建form对象
        param.append('file', file, file.name);//通过append向form对象添加数据
        param.append('chunk', '0');//添加form表单中其他数据
        console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };  //添加请求头
        axios.post(ip + "/upFile", param, config)
            .then(response => {
                Toast.loading('Loading...', 1, () => {
                    console.log('Load complete !!!');
                });
                setTimeout(() => {
                    this.setState({
                        img: ip + response.data
                    
                    })
                document.getElementById('user_head_small').src = ip + response.data
                   
                }, 1000);

                axios.post(ip + "/update", { _id: this.state.user, img: response.data })


            })

    }

}

export default Main;



