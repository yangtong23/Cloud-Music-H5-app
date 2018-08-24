const http = require("http");
const querystring =  require("querystring");
const urlobj = require("url");
const fetch = require("node-fetch");
const request = function(method,url,data){
    
            let opt = {
                method:method
              
            };
            if(method.toLowerCase() == "get"){
                url += "?"+querystring.stringify(data);
            }else{
                opt.headers = { 'Content-Type': 'application/json' };
                opt.body = JSON.stringify(data);

            }
        
        return new Promise(function(resolve,reject){
            fetch(url,opt).then(function(res){
                res.text().then(function(data){
                    try{
                        data = JSON.parse(data);
                    }catch(e){}
                    resolve(data);
                    
                });
            });
        });
        
       
}
let opt = {};
let common = function(url,data){
    if(host){
        url = host + url;
    }
    if(url.search("://") == -1){
        url = "http://"+url;
    }
    opt.url = url;
    opt.data = data;
    return request(opt.method,url,data);
}
let get = function(url,data){
    opt.method = "GET";
    return common(url,data);
}
let post = function(url,data){
    opt.method = "POST";
    return common(url,data);
}
let del = function(url,data){
    opt.method = "DELETE";
    return common(url,data);
}
let put = function(url,data){
    opt.method = "PUT";
    return common(url,data);
}

let host;
module.exports = {
    get,post,put,delete:del,url:function(param){
        host = param;
    }
}
