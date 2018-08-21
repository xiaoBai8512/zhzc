function PluginForVersion(opts) {}

PluginForVersion.prototype.apply = function (compiler) {
    compiler.plugin('compilation', function (compilation, opts) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, cb) {
            var temp_html = htmlPluginData.html;
            if(temp_html.match(/<!-- version -->/)){
                var arr = htmlPluginData.html.split('<!-- version -->');
                var out = 'build time: ' + dateFtt('yyyy-MM-dd hh:mm:ss', new Date());
                arr.splice(1, 0, '<script>console.log(\' '+out+' \'); localStorage.setItem(\'build_time\', \' '+out+' \')</script>\n');
                htmlPluginData.html = arr.join('')
            }
            cb(null, htmlPluginData)
        })
    })
}

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
}

module.exports = PluginForVersion

// add <!-- version --> at index.html
// 如果打印版本号，需要传递参数
