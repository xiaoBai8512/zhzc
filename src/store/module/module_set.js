import { apiRequest, apiRequestNormal, requestMethod, ajaxError } from '@/utils/api'

const set  = {
    state:{
        dialogTimeout:1000,
        //缓存开关
        registered:false,
    },
    mutations:{
        OFF_REGISTERED:(state,inData) =>{
            state.registered = inData
        },
    },
    actions: {

    }
}

export default set
