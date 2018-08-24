import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';

//  登录界面
import Login from './cloudmusic/login';
//  注册页面
import Reg from './cloudmusic/reg';
//  主页
import Main from './cloudmusic/main';
// 歌曲列表
import Playlist from './cloudmusic/playlist.js'
// 播放器
import Player from './cloudmusic/player.js';                       
// 搜索界面
import Search from  './cloudmusic/search';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path='/login' component={Login} />
          <Route path='/reg' component={Reg} />
          <Route path='/main' component={Main} />
          <Route path='/playlist/:id' component={Playlist} />
          <Route path='/player' component={Player} />
          <Route path='/search' component={Search} />
        </div>
      </Router>
    );
  }
}

export default App;







