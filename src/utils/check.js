//校验身份证
function checkCard(e) {
    return t(e) && n(e) && i(e) && r(e)
}
function t(e) {
    return /(^\d{15}$)|(^\d{17}(\d|X)$)/.test(e)
}
function n(e) {
    var t = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    }
        , n = e.substr(0, 2);
    return !!t[n]
}
function i(e) {
    var t, n, i, r, s, a = e.length;
    if ("15" == a) {
        var l = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
        return t = e.match(l),
            n = t[2],
            i = t[3],
            r = t[4],
            s = new Date("19" + n + "/" + i + "/" + r),
            o("19" + n, i, r, s)
    }
    if ("18" == a) {
        var c = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
        return t = e.match(c),
            n = t[2],
            i = t[3],
            r = t[4],
            s = new Date(n + "/" + i + "/" + r),
            o(n, i, r, s)
    }
    return !1
}
function o(e, t, n, i) {
    if (i.getFullYear() == e && i.getMonth() + 1 == t && i.getDate() == n) {
        var o = (new Date).getFullYear() - e;
        return o >= 0 && 130 >= o
    }
    return !1
}
function r(e) {
    e = s(e);
    var t = e.length;
    if ("18" == t) {
        var n, i, o = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], r = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"], a = 0;
        for (n = 0; 17 > n; n++)
            a += e.substr(n, 1) * o[n];
        return i = r[a % 11],
        i == e.substr(17, 1)
    }
    return !1
}
function s(e) {
    if ("15" == e.length) {
        var t, n = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], i = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"], o = 0;
        for (e = e.substr(0, 6) + "19" + e.substr(6, e.length - 6),
                 t = 0; 17 > t; t++)
            o += e.substr(t, 1) * n[t];
        return e += i[o % 11]
    }
    return e
}

function checkMobile(e) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(e)
}

function checkCardNum(ic) {//只能输入字母数字
    return /^[0-9a-zA-Z]*$/g.test(ic);
}


// //获取出生日期
// var ic = '510522199110137291'
// var birth = ic.substring(6, 10) + "-" + ic.substring(10, 12) + "-" + ic.substring(12, 14);
// console.log(ic, birth)

function getBirth(ic) {
    return ic.substring(6, 10) + "-" + ic.substring(10, 12) + "-" + ic.substring(12, 14);
}

// //获取性别
function getGender(psidno){
    var sexno,sex
    if(psidno.length==18){
        sexno=psidno.substring(16,17)
    }else if(psidno.length==15){
        sexno=psidno.substring(14,15)
    }else{
        alert("错误的身份证号码，请核对！")
        return false
    }
    var tempid=sexno%2;
    if(tempid==0){
        sex='F'
    }else{
        sex='M'
    }
    return sex
}

function getAge(Card){
    var Age = '';
    var cLen = Card.length;
    var date = new Date();
    switch(cLen){
        case 15:
            var y = Card.substr(6,2);  //年
            var m = Card.substr(8,2);  //月
            var d = Card.substr(10,2); //日

            var birth = "19" + y + '-' + m + '-' + d;
            if(m < 9){
                var zs = date.getFullYear() - 1900 - y ; //9月份前出生的周岁
            }else{
                var zs = date.getFullYear() - 1900 - y - 1 ; //9月份出生后的周岁
            }
            var Age = zs; // 返回周岁
            break;
        case 18:
            var y = Card.substr(6,4);   //年
            var m = Card.substr(10,2);  //月
            var d = Card.substr(12,2);  //日
            var birth = y + '-' + m + '-' + d;
            if(m < 9 ){
                var zs = date.getFullYear() - y;
            }else{
                var zs = date.getFullYear() - y - 1;
            }
            var Age = zs;
            break;
    }
    return Age;
}

const sexSta = ['男', '女']
/**
 * 200: 通过验证
 * @param card_type
 * @param card_code
 * @param t_limit_type
 * @param t_limit_condition
 * @returns {{code: number}}
 */
function checkCxr(card_type, card_code, t_limit_type, t_limit_condition) {
    var re = {code: 0}
    if(card_type=='身份证'){
        if(checkCard(card_code)){
            if(t_limit_type=='限制年龄' || t_limit_type=='限年龄'){
                let age = getAge(card_code);
                let bool = false;
                if(t_limit_condition.indexOf("-")>=0){
                    var bt = t_limit_condition.split("-");
                    bool = age>bt[0] && age<bt[1];
                }else if(t_limit_condition.indexOf("<")>=0){
                    var gt=t_limit_condition.split("<");
                    bool = age<gt[1];
                }else if(t_limit_condition.indexOf(">")>=0){
                    var gt=t_limit_condition.split(">");
                    bool = age>gt[1];
                }else{
                    bool = age==t_limit_condition;
                }
                if(bool){
                    re.code = 200
                }else{
                    re.msg = `此票种${t_limit_type}: ${t_limit_condition},当前年龄: ${age}`
                }
            }else if(t_limit_type=='限制性别' || t_limit_type=='限性别'){
                let sex = getGender(card_code);
                sex = sexSta[sex];
                if(sex == t_limit_condition){
                    re.code = 200
                }else{
                    re.msg = `此票种${t_limit_type}: ${t_limit_condition},当前性别: ${sex}`
                }
            }else{
                //实名票-。。。
                re.code = 200
            }
        }else{
            re.msg = '身份证格式错误'
        }
    }else{
        //非身份证 不校验 直接通过
        re.code = 200
    }
    return re;
}
export { checkCard, checkMobile, getAge, getBirth,getGender, checkCardNum,checkCxr }

