import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Toast, InputItem } from 'antd-mobile';
import axios from 'axios';
import { ip ,ip1} from '../default_term'
axios.defaults.withCredentials=true;
class Login extends Component {
    render() {
        return (
            <div style={{ background: "white" }}>
                <div className="login_top">
                    <img src="./image/oq.png" alt="" className="reback" onClick={this.reback.bind(this)} />
                    <span>手机号登录</span>
                </div>
                <div className="login_input">
                    <InputItem placeholder="+86 请输入手机号" style={{ marginTop: ".3rem" }} ref="uname">
                        <div style={{
                            backgroundImage: `url(${ip1}/image/a74.png)`, backgroundSize:
                                'cover', height: '22px', width: '22px'
                        }} />
                    </InputItem>
                    <InputItem placeholder="请输入密码" ref="pwd">
                        <div style={{
                            backgroundImage: `url(${ip1}/image/a76.png)`, backgroundSize:
                                'cover', height: '22px', width: '22px'
                        }} />
                    </InputItem>

                    <button onClick={this.login.bind(this)}>

                        登录
                    </button>

                    <Link to='/reg'>
                        <p>快速注册</p>
                    </Link>
                </div>
                <div className="login_bottom">
                    <img src="./image/recommand_bg_3x.png" style={{ width: "100%" }} />
                </div>
            </div>
        )
    }
    reback() {

        this.props.history.goBack();

    }
    login() {
        Toast.loading('Loading...', 1, () => {
            console.log('Load complete !!!');
        });
       
        let params = {
            uname: this.refs.uname.state.value,
            pwd: this.refs.pwd.state.value,
        }
        if(this.refs.uname.state.value&&this.refs.pwd.state.value)
        axios.post(ip + "/login",params).then((msg) => {
            if (msg.data.length > 0) {
                Toast.loading('', 1, () => {

                });

                setTimeout(() => {
                    Toast.success('登录成功 ', 1);
                    this.props.history.push('./main/mine')
                }, 1000);
            } else {
                Toast.fail('手机号或密码错误!', 1);
            }
        })
        else
        Toast.fail('请输入账号或密码', 1)
    }
} export default Login;