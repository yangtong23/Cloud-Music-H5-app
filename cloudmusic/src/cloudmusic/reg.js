import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
import { InputItem, Toast } from 'antd-mobile';

import axios from 'axios';
import { ip} from '../default_term'
class Reg extends Component {

    render() {
        return (
            <div style={{ background: "white" }}>
                <div className="login_top">
                    <img src="./image/oq.png" alt="" className="reback" onClick={this.reback.bind(this)} />
                    <span>手机号注册</span>
                </div>
                <div className="login_input">
                    <InputItem placeholder="+86 请输入手机号" style={{ marginTop: ".3rem" }} ref="uname">
                        <div style={{
                            backgroundImage: 'url("http://192.168.0.101:3000/image/a74.png")', backgroundSize: 'cover', height: '22px',
                            width: '22px'
                        }} />
                    </InputItem>
                    <InputItem placeholder="请输入密码" ref="pwd">
                        <div style={{
                            backgroundImage: 'url("http://192.168.0.101:3000/image/a76.png")', backgroundSize: 'cover', height: '22px',
                            width: '22px'
                        }} />
                    </InputItem>

                    <button onClick={this.reg.bind(this)}>

                        下一步
              </button>

                    <Link to='/login'>
                        <p>快速登录</p>
                    </Link>

                </div>
                <div className="login_bottom">
                    <img src="./image/a7s9.png" style={{ width: "100%" }} />
                    <p>其他注册方式</p>
                    <div className="reg_bottom">
                        <figure>
                            <img src="./image/a7k.png" style={{ width: '1.4rem' }} />

                            <figcaption>微信</figcaption>
                        </figure>
                        <figure>
                            <img src="./image/a7g.png" style={{ width: '1.4rem' }} />

                            <figcaption>QQ</figcaption>
                        </figure>
                        <figure>
                            <img src="./image/a7i.png" style={{ width: '1.4rem' }} />

                            <figcaption>微博</figcaption>
                        </figure>
                        <figure>
                            <img src="./image/a7d.png" style={{ width: '1.4rem' }} />

                            <figcaption>网易邮箱</figcaption>
                        </figure>
                    </div>
                </div>

            </div>
        )
    }
    reback() { this.props.history.goBack();}
    reg() {
      
        let params = {
            uname: this.refs.uname.state.value,
            pwd: this.refs.pwd.state.value,
        }
        axios.post(ip + "/check_reg", { uname: this.refs.uname.state.value }).then((msg) => {
            if (msg.data.length > 0) {
                Toast.offline('该手机号已注册!', 1);
            } else {
                axios.post(ip + "/reg", params).then((msg) => {
                    Toast.success('注册成功 !', 1);
                    setTimeout(() => {
                        this.props.history.push('./login')
                    }, 1000);
                })
            }
        })
    }
}
export default Reg;

