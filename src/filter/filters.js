var F = {}

F.install = function (Vue, opts) {

    // Vue.filter('s2t', (value, config = {fmt: 'YYYY-MM-DD'}) => {
    //     // if(typeof value == 'string' && value.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) return value;
    //     var num_val = Number(value);
    //     if(isNaN(num_val)){
    //         return value
    //     }else{
    //         return moment(num_val).format(config.fmt)
    //     }
    // });

    Vue.filter('n2m', (value, config = {prefix: '¥', suffix: 2}) => {
        let v = parseFloat(value);
        let suf = Number(config.suffix);
        if (isNaN(v)) v = 0;
        if (v < 1) suf = 2;
        let result = v.toFixed(suf);
        return `${config.prefix}${result}`;
    });

    Vue.filter('e2z', (value, sty) => {
        if (value || value == null) {
            if (sty == 'm') {
                return 0.00
            } else {
                return 0
            }
        } else {
            return value;
        }
    });

    Vue.filter('condition_str', (value, condition) => {
        if (value == '限制年龄') {
            return condition + '岁'
        } else if (value == '限制身高') {
            return condition + 'cm'
        } else if (value == '无限制') {
            return '无限制'
        } else {
            return condition
        }
    });

    Vue.filter('translation', (val, name) => {
        let data={
            certification:{
                0: '未认证',
                1: '已认证',
                2: '认证未通过',
                3: '认证中'
            }
        }
        return data[name][val];
    });

    Vue.filter('n2t', (time, cFormat) => {
        if (arguments.length === 0) {
            return null
        }
        const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
        let date
        if (typeof time === 'object') {
            date = time
        } else {
            if (('' + time).length === 10) time = parseInt(time) * 1000
            date = new Date(time)
        }
        const formatObj = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            i: date.getMinutes(),
            s: date.getSeconds(),
            a: date.getDay()
        }
        const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
            let value = formatObj[key]
            if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
            if (result.length > 0 && value < 10) {
                value = '0' + value
            }
            return value || 0
        })
        return time_str
        // let myDate = new Date(Number(value));
        // var m = myDate.getMonth() + 1;
        // var d = myDate.getDate();
        // var y = myDate.getFullYear();
        // return y+'-'+timeLength(m)+'-'+timeLength(d);
    })

    Vue.filter('imgUrl', (val, data) => {
        let inData = data || '_80x80x2.jpg';
        return weiXinAuk + val + inData;
    })

    Vue.filter('mobileMask', (val) => {
        let mask = val.substr(3, 4);
        return val.replace(mask, "****");
    })
}

function timeLength(timeData) {
    return timeData < 10 ? '0' + timeData : timeData;
}

export default F;
