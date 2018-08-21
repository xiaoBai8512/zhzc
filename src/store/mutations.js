import * as c from './cons'

export default {
    [c.PROMPT](state, obj){
        if(obj.show === undefined){
            state.prompt = {
                show: true,
                text: obj.text,
                type: obj.type,
                maskClear: obj.maskClear,
                textSure: obj.textSure || '知道了',
                textLeft: obj.textLeft || '取消',
                textRight: obj.textRight || '确定',
                eventLeft: obj.eventLeft,
                eventRight: obj.eventRight
            };
            if(obj.type && obj.type.match(/prompt/)){
                state.promptTime = setTimeout(function () {
                    obj.cb && obj.cb();
                    state.prompt.show = false
                }, obj.time||2000)
            }else {
                clearInterval(state.promptTime);
            }
        }else{
            state.prompt.show = false;
        }
    },
    [c.LOADER](state, bool){
        state.load = bool
    },

    SETEND(state, obj){
        // var type = state.orgType=='seller' ? 'buyer' : 'seller';
        localStorage.setItem('orgType',obj);
        state.orgType = obj;
    },

    SETTOKEN(state, inData){
        sessionStorage.setItem('token',inData);
        state.token = !!Number(inData);
    },

    SETBACKNAME(state,inData){
        sessionStorage.setItem('backName',JSON.stringify(inData));
        state.backName = inData;
    },

    SETWINXINCODE(state,inData){
        sessionStorage.setItem('winXinCode',inData);
        state.winXinCode = inData;
    },

    MODIFYCITY(state,inData){
        state.city = inData;
    },

    SETUID(state,inData){
        sessionStorage.setItem('u_id',inData);
        state.u_id = inData;
    },

    SETWEIXINCOFING(state,inData){
        state.weixincofing = inData;
    },

    SETLOCATION(state,inData){
        state.location = inData;
    },

    SETPERMISSIONOFF(state,inData){
        state.permissionOff = inData;
    },

    SETPERMISSIONGPS(state,inData){
            state.permissionGPS = inData;
        },

    SET_JP_FOCUS(state, obj){
        state.jpFocus = obj;
    },
    
    SET_NEEDRELOAD_STATUS(state, obj){
        state.need_reload = Object.assign({}, state.need_reload, obj)
    },

    RESET(state, obj){
        // state.orgType = null,
        //reset product
        state.product.p_recommend = {
            data: null
        };
        state.product.p_id = null;
        state.product.p_detail = null;
        state.product.calendarMonths = null;
        //reset order
        state.order.orderList = null;
        state.order.orderListStatus = {
            all: null,
            not_pay: null,
            not_sure: null,
            not_go: null,
            is_sure: null,
        };
    }
}
