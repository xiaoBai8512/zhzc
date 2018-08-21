import {apiRequest, requestMethod} from './api'
var webHandler = {};

/**
 * 模拟web调app
 * @param method
 * @param params
 * @param cb
 */
function callHandler(method, params, cb){
    console.log('requestApp.json =>', method)
    apiRequest('/static/data/requestApp.json', requestMethod.API_GET, {})
        .then(data => {
            if(!data[method]) {
                cb(null);
                return;
            }
            if(!data[method].sync){
                //模拟app异步回调
                requestWeb(data[method].method)
            }else{
                cb(JSON.stringify(data[method].data))
            }
        })
        .catch(e => {
            console.log(method, err)
        })
}

/**
 * web注册方法
 * @param method
 * @param cb(app传递的数据,js回调方法)
 */
function registerHandler(method, cb){
    webHandler[method] = function(){
        apiRequest('/static/data/requestWeb.json', requestMethod.API_GET, {})
            .then(data => {
                cb(data[method].data, function(msg){
                    console.log('msg to app: ', msg)
                });
            })
            .catch(e => {
                console.log(e)
            })
    }
}

/**
 * 模拟app调web
 * @param method
 */
function requestWeb(method){
    if(webHandler[method]){
        webHandler[method].call(webHandler)
    }else{
        throw new Error('没有注册回调方法 => ' + method)
    }

}

var e = {
    callHandler,
    registerHandler
}

export default e

