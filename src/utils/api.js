import axios from 'axios';
import store from '../store/index';
import router from '../router/index';
import { Toast, Indicator } from 'mint-ui';


const client = axios.create({
    // baseURL: process.env.API_URL,
    timeout: 10000,
    withCredentials: true,
    responseType: 'json'
});

const client_normal = axios.create({
    // baseURL: process.env.API_URL,
    timeout: 10000,
    withCredentials: true,
    responseType: 'json'
});

//拦截
client.interceptors.request.use(function (config) {
    Indicator.open();
    if (store.state.login.token) {
        config.headers['token'] = store.state.login.token; // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config;
}, function (error) {
    Indicator.close();
    return Promise.reject(error);
});

client.interceptors.response.use(function (response) {
    setTimeout(function () {
        Indicator.close();
    }, 300);
    try{
        let res = response.data;
        if (res.code == 200) {
            return res.result
        } else if (res.code == 403) {
            Toast({
                message: '登陆失效，请重新登陆。',
                position: 'bottom',
                duration: 3000
            });
            store.commit('LOGINOUT')
            setTimeout(function () {
                if(store.state.login.type == 1 || store.state.login.type == 2){
                    store.dispatch('loginWithOpenid',{openid:store.state.login.openid}).then((data)=>{
                        router.push('/');
                    }).catch((err)=>{
                        router.push({name:'login'});
                    })
                }else {
                    router.push({name: 'login'})
                }
            }, 0);
            // errorResponse(new Error(10007))
            return Promise.reject(new Error(403));
        } else if (res.code == 400){
            let msg = res.message;
            if(Object.prototype.toString.call(res.result) === "[object Object]"){
                msg = Object.values(res.result)[0];
            }
            errorResponse(new Error(msg));
            return Promise.reject(new Error(msg));
        } else {
            errorResponse(new Error(res.message || res.msg));
            return Promise.reject(new Error(res.message || res.msg));
        }
    }catch (e){
        return Promise.reject(e);
    }
}, function (error) {
    setTimeout(function () {
        Indicator.close();
        errorRequest(error);
    }, 300);
    return Promise.reject(error);
});

//拦截
client_normal.interceptors.request.use(function (config) {
    if (store.state.login.token) {
        config.headers['token'] = store.state.login.token; // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

client_normal.interceptors.response.use(function (response) {
    try{
        let res = response.data;
        if (res.code == 200) {
            return res.result
        } else if (res.code == 403) {
            Toast({
                message: '登陆失效，请重新登陆。',
                position: 'bottom',
                duration: 5000
            });
            store.commit('LOGINOUT')
            setTimeout(function () {
                if(store.state.login.type==1 && store.state.login.type==2){
                    store.dispatch('loginWithOpenid',{openid:store.state.login.openid}).then((data)=>{
                        router.push('/');
                    }).catch((err)=>{
                        router.push({name:'login'});
                    })
                }else {
                    router.push({name: 'login'})
                }
            }, 2000);
            // errorResponse(new Error(10007))
            return Promise.reject(new Error(403));
        } else {
            errorResponse(new Error(res.message || res.msg));
            return Promise.reject(new Error(res.message || res.msg));
        }
    }catch (e){
        return Promise.reject(e);
    }
}, function (error) {
    errorRequest(error);
    return Promise.reject(error);
});

/**
 * API请求方式
 * @type {{API_GET: string, API_POST: string, API_DELETE: string, API_PUT: string}}
 */
const requestMethod = {
    API_GET: 'get',
    API_POST: 'post',
    API_DELETE: 'delete',
    API_PUT: 'put'
};

/**
 * API请求函数
 * @param path
 * @param method
 * @param param
 * @returns {*}
 */
function apiRequest(path, method, param) {
    if (method.toLowerCase() == 'get') {
        return client.request({
            url: 'http://api.zhzc.bjhqzl.com/'+ path.replace(/^\//, ''),
            method: method,
            params: Object.assign({}, param, {})
        })
    } else if (method.toLowerCase() == 'post') {
        return client.request({
            url: 'http://api.zhzc.bjhqzl.com/'+ path.replace(/^\//, ''),
            method: method,
            data: Object.assign({}, param, {})
        })
    }
}

/**
 * API请求函数, 无菊花
 * @param path 地址
 * @param method 方式
 * @param param 参数
 * @returns {*}
 */
function apiRequestNormal(path, method, param) {
    if (method.toLowerCase() == 'get') {
        return client_normal.request({
            url: 'http://api.zhzc.bjhqzl.com/'+ path.replace(/^\//, ''),
            method: method,
            params: Object.assign({}, param, {})
        })
    } else if (method.toLowerCase() == 'post') {
        return client_normal.request({
            url:'http://api.zhzc.bjhqzl.com/'+ path.replace(/^\//, ''),
            method: method,
            data: Object.assign({}, param, {})
        })
    }
}

function errorRequest(error) {
    var msg = error.message;
    if (msg == 'Network Error') {
        Toast({
            message: '加载数据失败, 请稍后尝试',
            position: 'bottom',
            duration: 5000
        });
    } else if (msg.match(/timeout/gi)) {
        Toast({
            message: '请求超时, 请稍后尝试',
            position: 'bottom',
            duration: 5000
        });
    } else {
        Toast({
            message: msg,
            position: 'bottom',
            duration: 5000
        });
    }
}
function errorResponse(error) {
    Toast({
        message: error.message,
        position: 'bottom',
        duration: 3000
    });
}

function ajaxError(error) {
    // if (error.request) {
    //     errorRequest(error)
    // } else {
    //     errorResponse(error)
    // }
}

function nubR(func,B) {
    store.dispatch(func,B)
}

export {apiRequest, apiRequestNormal, requestMethod, ajaxError, nubR};
