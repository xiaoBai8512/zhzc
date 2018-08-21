import axios from 'axios'
import router from '../router'
import { apiRequest, apiRequestNormal, requestMethod, ajaxError,nubR } from '@/utils/api'
import wx from 'weixin-js-sdk'
import store from "./index";
import {routerSty, wXlongInEr} from "../utils/utils";
export default {
    getDicts :function ({commit, state}, indata) {

        //get dict form sessionStorage
        var dicts = {};
        var dictCodes = indata['code'];

        var needGetFromServer = [];

        for (var i = 0; i < dictCodes.length; i++) {
            if(sessionStorage.getItem("dict_"+dictCodes[i])){
                // console.log(sessionStorage.getItem("dict_"+dictCodes[i]));
                dicts[dictCodes[i]] = JSON.parse(sessionStorage.getItem("dict_"+dictCodes[i]));
            }else{
                needGetFromServer.push(dictCodes[i]);
            }
        }
        // console.log(needGetFromServer);
        // console.log(dicts);
        if(needGetFromServer.length > 0)
        {
            return new Promise((resolve, reject) => {
                apiRequest('/api/common/dicts', 'post',{"code":needGetFromServer}).then(data => {
                    for(var i in data){
                        sessionStorage.setItem("dict_"+i, JSON.stringify(data[i]));
                    }
                    Object.assign(dicts, data);
                    resolve(dicts);
                }).catch(err => {
                    reject(err)
                });
            });
        }else{
            return new Promise((resolve, reject) => {
                resolve(dicts);
            });
        }
    },
    getAreas :function ({commit, state}, indata) {
        return new Promise((resolve, reject) => {
            apiRequest(`/api/common/areas/${indata}`, 'get').then(data => {
                    resolve(data)
                }).catch(err => {
                    reject(err)
                });
        })
    }
}
