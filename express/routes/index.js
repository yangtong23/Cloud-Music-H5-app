var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


// 验证用户是否注册
router.post('/check_reg', function (req, res, next) {
  req.body.findType = "exact"
  http.get('127.0.0.1:3333/user/find', req.body).then(function (data) {
    res.send(data)
  })
});
// 注册
router.post('/reg', function (req, res, next) {

  http.get('127.0.0.1:3333/user/add', req.body).then(function (data) {
    res.send(data)
  })
});

// 登录
router.post('/login', function (req, res, next) {
  req.body.findType = "exact"
  http.get('127.0.0.1:3333/user/find', req.body).then(function (data) {
    console.log(data)
    if (data.length > 0) {

      req.session.msg = data[0]
    }
    res.send(data)

  })
});
// 判断登录状态
router.post('/isLogin', function (req, res, next) {

  res.send(req.session.msg)

});
// 查询歌单
router.post('/find_sheet', function (req, res, next) {

  http.get('127.0.0.1:3333/song_sheet/find', req.body).then(function (data) {
    res.send(data)
  })
});
// 初始化歌曲列表
router.post('/init_playlist', function (req, res, next) {

  http.get('127.0.0.1:3333/song_sheet/find', req.body).then(function (data) {
    res.send(data)
  })
});
// 改变用户头像

router.post('/update', function (req, res, next) {

  http.get('127.0.0.1:3333/user/update', req.body).then(function (data) {
    res.send(data)
  })
});

// 查询歌曲历史记录

router.post('/find_history', function (req, res, next) {

  // req.body.submitType = "findJoin"
  // req.body.ref = ["music"]
  console.log(req.body)
  http.post('127.0.0.1:3333/history/find', req.body).then(function (data) {
    res.send(data)
  })
});
//  添加歌曲到历史记录
router.post('/add_history', function (req, res, next) {
  http.get('127.0.0.1:3333/history/add', req.body).then(function (data) {
    res.send(data)
  })
});
// 查询搜索历史
router.post('/find_search', function (req, res, next) {

  http.get('127.0.0.1:3333/search_history/find', req.body).then(function (data) {
    res.send(data)
  })
});
// 添加搜索历史

router.post('/add_search', function (req, res, next) {
  http.get('127.0.0.1:3333/search_history/add', req.body).then(function (data) {
    res.send(data)
  })
});

// 删除搜索历史
router.post('/del_search', function (req, res, next) {

  http.get('127.0.0.1:3333/search_history/del', req.body).then(function (data) {
    res.send(data)
  })
});

// 查询歌曲
router.post('/find_music', function (req, res, next) {

  http.get('127.0.0.1:3333/music/find', req.body).then(function (data) {
    res.send(data)
  })
});

// 查询视频
router.post('/find_video', function (req, res, next) {

  http.get('127.0.0.1:3333/video/find', req.body).then(function (data) {
    res.send(data)
  })
});














// 上传图片
var multiparty = require('multiparty');
var util = require("util");

/* 上传*/
router.post('/upFile', function (req, res) {
  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({ uploadDir: './public/userupload/' });  //文件路径可以修改，如果修改记得和下面的路径保持一致

  //上传完成后处理
  form.parse(req, function (err, fields, files) {
    console.log(files)
    // var filesTmp = JSON.stringify(files, null, 2);

    // if (err) {
    //   console.log('parse error: ' + err);
    // } else {
    //   console.log('parse files: ' + filesTmp);
    //   var files = files.inputFile;
    // }

    //发送第一张图片的信息
    let str = files.file[0].path;
    let newPath = str.replace(/public/, '');

    res.send(newPath);    //发送消息回去
  });
});



module.exports = router;




