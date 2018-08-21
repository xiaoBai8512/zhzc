//format date

function dateFtt(fmt, date) {
    var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
//获取url变量
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}
function routerSty(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    if (window.location.hash.indexOf('?') > 0) {
        var r = window.location.hash.substr(1).split('?')[1].match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    } else {
        return null;
    }
}
function urlToRouter(Hash) {
    Hash = Hash || window.location.hash.substr(2)
    let data = Hash.split('?')
    let outData = {
        path: data[0],
        query: {},
    };
    if (data[1]) {
        let queryList = data[1].split('&');
        let reg = new RegExp("(^|&)([^&]*)=([^&]*)(&|$)");
        for (var i = 0; i < queryList.length; i++) {
            let r = queryList[i].match(reg);
            if (r != null) {
                outData.query[r[2]] = r[3]
            }
        }
    }
    return outData;


    // console.log(queryLis);
    //
    //
    // // if(r!=null)return  unescape(r[2]); return null;
    // if (r != null){
    //     console.log(r);
    //     return decodeURIComponent(r[2]);
    // }
    //
    // return null;
}
function uLogin() {
    let inData = {
        uname: localStorage.u_n,
        upass: localStorage.u_p
    };

    let o = inData.upass.split(''), v = 0, k = '', r = 0;

    for (var j = 0; j < o.length; j++) {
        if (j == r) {
            if (o[j] == 1) {
                r = j + 3;
                v = 3;
            } else {
                r = j + 2;
                v = 2;
            }
            k = k + String.fromCharCode(inData.upass.substr(j, v));
        }
    }
    inData.upass = k;
    return inData;
    //
}
function wXlongInEr() {
    store.commit('PROMPT', {
        type: 'confirm', text: '登陆失败请重试', textSure: '重试', eventLeft: function () {
            if (GetQueryString('state')) {
                window.location.href = window.location.protocol + '//' + window.location.host + '/?#' + GetQueryString('state');
            } else {
                location.reload();
            }
        }
    })
}

export  {dateFtt, GetQueryString, routerSty, urlToRouter, uLogin, wXlongInEr}
