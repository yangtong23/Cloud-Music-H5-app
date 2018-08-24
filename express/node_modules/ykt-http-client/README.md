# 使用HTTP连接远程服务器接口

## 使用方法

    1. 导入http-client模块

    const hc = require("ykt-http-client");

    2. 发送get请求

        //不带参数
        hc.get("localhost:8080/users/show").then(function(data){
            //data为远程服务器返回的数据
        });
        //带请求参数
        hc.get("localhost:8080/users/show",{phone:phone}).then(function(data){
            //data为远程服务器返回的数据
        });

    3. 发送post请求

        //不带参数
        hc.post("localhost:8080/users/show").then(function(data){
            //data为远程服务器返回的数据
        });
        //带请求参数
        hc.post("localhost:8080/users/show",{phone:phone}).then(function(data){
            //data为远程服务器返回的数据
        });
