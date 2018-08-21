import { apiRequest, apiRequestNormal, requestMethod, ajaxError } from '@/utils/api'
import wx from 'weixin-js-sdk'
import store from "../index";
import {Confirm} from 'vue-ydui'
import { Message } from 'element-ui'
import {PROMPT} from "../cons";
import device from '@/utils/device'

const instance  = {
    state:{
        user:(sessionStorage.user && JSON.parse(sessionStorage.user)) || null,
        wxUser:(localStorage.wxUser && JSON.parse(localStorage.wxUser)) || null,
        token:localStorage.token || null,
        openid:localStorage.openid || null,
        type:localStorage.type || null,
        businessArea: (sessionStorage.businessArea && JSON.parse(sessionStorage.businessArea)) || [],
        qualification: (sessionStorage.qualification && JSON.parse(sessionStorage.qualification)) || [],
        industries: (sessionStorage.industries && JSON.parse(sessionStorage.industries))  || [],
        selectUserType: sessionStorage.select_user_type || 0,
    },
    getters:{
        type: state => {
            return state.type
        },
        user: state => {
            return state.user
        }
    },
    mutations:{
        SET_USER:(state,inData) =>{
            sessionStorage.setItem("user", JSON.stringify(inData));
            state.user = inData
        },
        CLEAR_USER:(state,inData) =>{
            sessionStorage.removeItem("user");
            state.user = null
        },
        SET_WXUSER:(state,inData) =>{
            localStorage.setItem("wxUser", JSON.stringify(inData));
            state.wxUser = inData
        },
        SET_TOKEN:(state,inData) =>{
            localStorage.setItem("token", inData);
            state.token = inData
        },
        CLEAR_TOKEN:(state,inData) =>{
            localStorage.removeItem("token");
            state.token = null
        },
        SET_OPENID:(state,inData) =>{
            localStorage.setItem("openid", inData);
            state.openid = inData
        },
        SET_TYPE:(state,inData) =>{
            localStorage.setItem("type", inData);
            state.type = inData
        },
        SET_SELECT_USER_TYPE:(state,inData) =>{
            sessionStorage.setItem("select_user_type", inData);
            state.selectUserType = inData
        },
        SET_BUSINESSAREA:(state,inData) =>{
            sessionStorage.setItem("businessArea", JSON.stringify(inData));
            state.businessArea = inData
        },
        SET_QUALIFICATION:(state,inData) =>{
            sessionStorage.setItem("qualification", JSON.stringify(inData));
            state.qualification = inData
        },
        SET_INDUSTRIES:(state,inData) =>{
            sessionStorage.setItem("industries", JSON.stringify(inData));
            state.industries = inData
        },
        LOGINOUT:(state) =>{
            sessionStorage.removeItem("user");
            state.user = null;
            localStorage.removeItem("token");
            state.token = null;
            localStorage.removeItem("type");
            // state.type = null
        },
    },
    actions: {
        upImg({ commit, state, dispatch },inData) {
            return new Promise((resolve, reject) => {
                if (!device.isWeixin){
                    resolve({path:'/images/201805/20/b31015d5841d44c6a1e975e2295f028f.jpg', url: 'http://static.zhzc.bjhqzl.com/images/201805/20/b31015d5841d44c6a1e975e2295f028f.jpg_80x80x2.jpg'})
                }
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        wx.uploadImage({
                            localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (res) {
                                var serverId = res.serverId; // 返回图片的服务器端ID
                                apiRequest(`/api/wechat/download_image?media_id=${serverId}`, 'get').then((data)=>{
                                    resolve(data)
                                }).catch((err)=>{
                                    reject(err)
                                })
                            }
                        });
                    },
                    fail:function (res) {
                        reject(res)
                    }
                })
            })
        },
        loginOut({ commit, state, dispatch },inData) {
            commit('LOGINOUT')

        },

        weiXinFenXiang({ commit, state, dispatch },inData) {
            // return apiRequest('/user','get',{code:inData})
            return new Promise((resolve, reject) => {
                let url = encodeURIComponent(window.location.href.split('#')[0]);
                // console.log('url', location.origin)
                apiRequest(`/api/wechat/jsapi?url=${url}`, 'get')
                    .then(data => {
                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
                            timestamp: data.timestamp, // 必填，生成签名的时间戳
                            nonceStr: data.nonceStr, // 必填，生成签名的随机串
                            signature: data.signature,// 必填，签名，见附录1
                            jsApiList: ['uploadImage', 'chooseImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                        wx.ready(function(){
                            resolve(data)
                            console.log('JSAPI授权成功')
                        });
                        wx.error(res =>{
                            // Message({
                            //     message: '授权失败',
                            //     type: 'warning',
                            //     duration: 0
                            // });
                            console.log('JSAPI授权成功')
                            reject(res);
                        });
                    })
                    .catch(err => {
                        reject(err)
                    });
                //     .then(function (response) {
                //         wx.config({
                //             // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                //             appId: response.data.app_id, // 必填，企业号的唯一标识，此处填写企业号corpid
                //             timestamp:response.data.timestamp, // 必填，生成签名的时间戳
                //             nonceStr: response.data.nonce_str, // 必填，生成签名的随机串
                //             signature: response.data.signature,// 必填，签名，见附录1
                //             jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage', 'getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                //         });
                //         wx.ready(function(){
                //             wx.getLocation({
                //                 type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                //                 success: function (res) {
                //                     let inData={};
                //                     inData.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                //                     inData.longitude = res.longitude ; // 经度，浮点数，范围为180 ~ -180。
                //                     //     var speed = res.speed; // 速度，以米/每秒计
                //                     //     var accuracy = res.accuracy; // 位置精度
                //                     commit('SETLOCATION',inData)
                //                     dispatch('weiXinFenXiangRe','shop');
                //                     dispatch('locationToCityCode').finally(()=>{
                //                         resolve(response.data);
                //                     });
                //                 },
                //                 error: function (res) {
                //                     reject(res);
                //                 },
                //             });
                //             // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                //         });
                //         wx.error(res =>{
                //             reject(res);
                //
                //             // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                //         });
                //     }).catch(error=>{
                //     reject(error)
                // });
            })
            // commit('SETWEIXINCOFING',aaa)
        },

        getOpenId :function ({commit, state}, indata) {
            // return apiRequest('H5/User/login', 'post', obj)
            return new Promise((resolve, reject) => {
                apiRequest(`/api/wechat/get_userinfo?code=${indata}`, 'get')
                    .then(data => {
                        commit('SET_WXUSER', data)
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },

        getUserInfo :function ({commit, state}, indata) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/u/info', 'get')
                    .then(data => {
                        store.commit('SET_USER', data)
                        store.commit('SET_TYPE', data.subUserType)
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },

        userVerificode :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/user/verificode/', 'POST',obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },

        loginWithOpenid :function ({commit, state}, obj) {
            // return apiRequest('H5/User/login', 'post', obj)
            return new Promise((resolve, reject) => {
                apiRequest('/api/user/loginWithOpenid', 'POST', obj)
                    .then(data => {
                        store.commit('SET_TOKEN', data.token)
                        store.commit('SET_USER', data.user)
                        store.commit('SET_TYPE', data.user.subUserType)
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        userReg :function ({commit, state}, obj) {
            // return apiRequest('H5/User/login', 'post', obj)
            return new Promise((resolve, reject) => {
                apiRequest('/api/user/reg', 'POST', obj)
                    .then(data => {
                        store.commit('SET_TOKEN', data.token)
                        store.commit('SET_USER', data.user)
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        userLogin :function ({commit, state}, obj) {
            // return apiRequest('H5/User/login', 'post', obj)
            return new Promise((resolve, reject) => {
                apiRequest('/api/user/login', 'POST', obj)
                    .then(data => {
                        store.commit('SET_TOKEN', data.token)
                        store.commit('SET_USER', data.user)
                        store.commit('SET_TYPE', data.user.subUserType)
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },

        userLoginOut :function ({commit, state}, obj) {
            // return apiRequest('H5/User/login', 'post', obj)
            return new Promise((resolve, reject) => {
                commit('CLEAR_USER');
                commit('CLEAR_TOKEN');
                // sessionStorage.clear();
                // localStorage.clear();
                resolve()
            })
        },
        //完善资料 专家学生
        expertPerfect :function ({commit, state}, obj) {
            // return apiRequest('H5/User/login', 'post', obj)
            return new Promise((resolve, reject) => {
                apiRequest('/api/expert/perfect', 'POST', obj)
                    .then(data => {
                        store.commit('SET_USER', data)
                        store.commit('SET_TYPE', data.subUserType)
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //完善资料 机构公司
        enterprisePerfect :function ({commit, state}, obj) {
            // return apiRequest('H5/User/login', 'post', obj)
            return new Promise((resolve, reject) => {
                apiRequest('/api/enterprise/perfect', 'POST', obj)
                    .then(data => {
                        store.commit('SET_USER', data)
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //完善资料 机构公司
        enterprisePerfectCompany :function ({commit, state}, obj) {
            // return apiRequest('H5/User/login', 'post', obj)
            return new Promise((resolve, reject) => {
                apiRequest('/api/enterprise/perfect_company', 'POST', obj)
                    .then(data => {
                        store.commit('SET_USER', data)
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //修改我的资料（企业）
        updateCompanyInfo :function ({commit, state}, obj) {
            // return apiRequest('H5/User/login', 'post', obj)
            return new Promise((resolve, reject) => {
                apiRequest('/api/enterprise/update_company_info', 'POST', obj)
                    .then(data => {
                        store.commit('SET_USER', data)
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //修改我的资料（机构）
        enterpriseUpdateInfo :function ({commit, state}, obj) {
            // return apiRequest('H5/User/login', 'post', obj)
            return new Promise((resolve, reject) => {
                apiRequest('/api/enterprise/update_info', 'POST', obj)
                    .then(data => {
                        store.commit('SET_USER', data)
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //设置机构是否成为合作机构
        enterpriseSetCooperation :function ({commit, state}, obj) {
            // return apiRequest('H5/User/login', 'post', obj)
            return new Promise((resolve, reject) => {
                apiRequest('/api/enterprise/set_cooperation', 'POST', obj)
                    .then(data => {
                        store.commit('SET_USER', data)
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //设置机构是否加入企业备选库
        enterpriseSetBusinessAlternative :function ({commit, state}, obj) {
            // return apiRequest('H5/User/login', 'post', obj)
            return new Promise((resolve, reject) => {
                apiRequest('/api/enterprise/set_business_alternative', 'POST', obj)
                    .then(data => {
                        store.commit('SET_USER', data)
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //获取banner
        commonBanners :function ({commit, state}, obj) {
            // return apiRequest('H5/User/login', 'post', obj)
            return new Promise((resolve, reject) => {
                apiRequest('/api/common/banners/'+obj, 'GET')
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //获取新闻
        getNewsList :function ({commit, state}, obj) {
            // return apiRequest('H5/User/login', 'post', obj)
            return new Promise((resolve, reject) => {
                apiRequest('/api/news', 'POST', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //获取新闻
        getNewsDetails :function ({commit, state}, obj) {
            // return apiRequest('H5/User/login', 'post', obj)
            return new Promise((resolve, reject) => {
                apiRequest('/api/news/'+obj, 'GET')
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //修改专家资料
        expertUpdateInfo :function ({commit, state}, obj) {
            // return apiRequest('H5/User/login', 'post', obj)
            return new Promise((resolve, reject) => {
                apiRequest('/api/expert/update_info', 'post', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
    }
}

export default instance
