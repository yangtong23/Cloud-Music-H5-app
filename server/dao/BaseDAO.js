var db = require("ykt-mongo");
module.exports.reduce = function(collection,operate,param,func){
    if(operate.toLowerCase() == "find"){
        find(collection,param,func);
    }else if(operate.toLowerCase() == "add"){
        insert(collection,param,func);
    }else if(operate.toLowerCase() == "update"){
        update(collection,param,func);
    }else if(operate.toLowerCase() == "del"){
        del(collection,param,func);
    }else{
        console.error("请求方法错误："+operate);
        func("请求方法错误："+operate);
    }
}

var find = function(collection,param,func){
    var page = param.page;
    var rows = param.rows;
    delete param.page;
    delete param.rows;
    if(param.submitType){
        var submitType = param.submitType;
        delete param.submitType;
    }
    if(param.findType){
        var findType = param.findType;
        delete param.findType;
    }
    if(param.ref){
        var ref = param.ref;
        delete param.ref;
    }

    for(var key in param){
        if(key == "_id" || /.+\$id$/.test(key)){
            param[key] = db.ObjectID(param[key]);
        }else{
            if(findType && findType == "exact"){
                param[key] = param[key];
            }else{
                param[key] = {$regex:param[key]};
            }

        }
    }

    if(!page && !rows){
        db.collection(collection).find(param,function(data){
            
            if(submitType == "findJoin"){
                if(ref){
                    
                    db.findJoin(data,ref,function(joinData){
                        if(param._id){
                            func(joinData[0]);
                        }else{
                            func(joinData);
                        }
                    });
                }else{
                    console.error("请求参数错误：没有指定关联的集合。");
                    func("请求参数错误：没有指定关联的集合。");
                }

            }else{
                if(param._id){
                    func(data[0]);
                }else{
                    func(data);
                }
            }

        });
    }else{
        page = parseInt(page);
        rows = parseInt(rows);
        db.collection(collection).findByPage(page,rows,param,function(data){
            if(submitType == "findJoin"){
                if(ref){
                   
                    db.findJoin(data.rows,ref,function(joinData){
                        data.rows = joinData;
                        func(data);
                    });
                }else{
                    console.error("请求参数错误：没有指定关联的集合。");
                    func("请求参数错误：没有指定关联的集合。");
                }

            }else{
                func(data)
            }
        });

    }

}

var insert = function(collection,param,func){

    if(param.submitType == "addMore"){
        if(!param.data){
            console.error("增加多条数据时参数错误");
            func("增加多条数据时参数错误");
        }else{
			let totalCount = param.data.length;
			let count = 0;
			let IdArrs = [];
			
			console.log('11111111111111111111111')
			console.log(typeof param.data)
			console.log(param)
			
            for(var i = 0;i < param.data.length;i++){
                delete param.data[i]._id;
                for(var k in param.data[i]){
                    if(typeof(param.data[i][k]) == "object" && param.data[i][k].$id){
                        param.data[i][k].$id = db.ObjectID(param.data[i][k].$id);
                    }
                }
                db.collection(collection).insert(param.data[i],function(param){
					count++;
					IdArrs.push(param.insertedIds[0]);
					
					if(count == totalCount)
						func(IdArrs);
				});
            }
            
        }
    }else{
        delete param._id;
        for(var k in param){
            if(param[k].$id){
                param[k].$id = db.ObjectID(param[k].$id);
            }
        }
        db.collection(collection).insert(param,function(){
            func(param._id);
        });
    }

}

var update = function(collection,param,func){
    var _id = param._id;
    delete param._id;
    
    var _option = {$set: param};
    if(param.isPush){
        _option = {$push: param};
        delete param.isPush;
    }
    
    db.collection(collection).update({_id:db.ObjectID(_id)}, _option ,function(){
        func("suc");
    });
}

var del = function(collection,param,func){

    if(param._id){
        param._id = db.ObjectID(param._id);
        db.collection(collection).remove({_id:param._id},function(){
            func("suc");
        });
    }else if(param.ids){
        var removeIds = param.ids.map(function(id){
            return db.ObjectID(id);
        });
        db.collection(collection).remove({_id:{$in:removeIds}},function(){
            func("suc");
        });
    }else{
        for(var key in param){
            if(/.+\$id$/.test(key)){
                param[key] = db.ObjectID(param[key]);
            }
        }
        db.collection(collection).remove(param,function(){
            func("suc");
        });
    }

}
