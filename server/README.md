# nodejs服务器模块

## 介绍

> 自动创建nodejs服务器，该服务器封装调用数据库的接口。

## 安装

* 下载插件

```
npm install -g ykt-server-cli
```

* 在命令行中运行server命令

```
server
```
*该命令会在当前目录下生成一个nodejs服务器的目录，名字为server。注意，如果该目录下已有该名称的目录或文件，则无法生成，需要先将该名称的目录或文件删除，也可以换一个其他目录再执行server命令。*

* 进入目录，下载依赖的插件

```
cd server
npm install
```

## 使用

* 启动服务器

```
npm start
```
*如果是window系统，可以执行项目根目录下的start.bat文件。*

*服务器默认在3000端口下启动。*

* 修改启动端口

打开package.json文件，修改port属性。（切勿和其他应用的端口冲突）

* 修改数据库连接配置

该服务器项目所使用的数据库为mongodb。该数据库请自行安装。

打开package.json文件，修改db属性。
其中url指连接数据库的ip和端口。
dbname指连接的数据库名。

## api

服务器的请求说明请参看项目中附带的api.xlsx
