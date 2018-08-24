import React from 'react';
import ReactDOM from 'react-dom';

import Store from './store/store'
import { Provider } from 'react-redux'
// 引用reset文件
import './reset.css';
import 'antd-mobile/dist/antd-mobile.css'
import './index.css';
import App from './App';


!(function(win, doc) {
    function setFontSize() {
        // 获取window 宽度
        // zepto实现 $(window).width()就是这么干的
        var winWidth = window.innerWidth;
       
        doc.documentElement.style.fontSize = (winWidth / 1080) * 100 + 'px';
    }
    var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';
    var timer = null;
    win.addEventListener(evt, function() {
        clearTimeout(timer);

        timer = setTimeout(setFontSize, 300);
    }, false);
    win.addEventListener("pageshow", function(e) {
        if (e.persisted) {
            clearTimeout(timer);

            timer = setTimeout(setFontSize, 300);
        }
    }, false);
    //初始化
    setFontSize();
}(window, document));



ReactDOM.render(<Provider store={Store}>
    < App />
</Provider>, document.getElementById('root'));


