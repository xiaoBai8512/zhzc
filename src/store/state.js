export default {
    prompt: {
        show: false,
        type: 'prompt',
        text: '',
        textLeft: '',
        textRight: '',
        eventLeft: null,
        eventRight: null,
    },
    promptTime:null,
    load: false,
    token: !!Number(sessionStorage.token),
    orgType: localStorage.orgType, //(app：seller；微信：buyer)
    backName: sessionStorage.backName ? JSON.parse(sessionStorage.backName) : '',
    winXinCode:sessionStorage.winXinCode,
    openId:localStorage.wx_info ? JSON.parse(localStorage.wx_info).open_id : '1',
    u_id:sessionStorage.u_id || null,
    weixincofing:null,
    location:null,
    permissionOff:null,
    permissionGPS:null,
    jpFocus: false, //键盘是否弹起
    need_reload: {
        p_detail: true, //产品详情
        o_detail: true, //订单详情
    }, //需要刷新的数据的开关
}
