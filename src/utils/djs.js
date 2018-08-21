function ShowRemainTime(el, leftTime, prefix='倒计时') {
    this.el = el;
    this.leftTime = leftTime;
    this.prefix = prefix;
}

ShowRemainTime.prototype = {
    showT: function () {
        var self = this;
        var el = this.el;
        var timer = setInterval(function () {
            var needTime = parseInt(self.leftTime / 1000);
            var nd = parseInt(needTime / (24 * 60 * 60));
            var nh = parseInt(needTime / (60 * 60) % 24);
            var nm = parseInt(needTime / 60 % 60);
            var ns = parseInt(needTime % 60);
            if (needTime <= 0) {
                clearInterval(timer);
                el.innerHTML = '已结束';
            } else {
                if(nd > 0){
                    el.innerHTML = `${self.prefix} ${nd}天${nh}时${nm}分${ns}秒`;
                }else if(nh > 0){
                    el.innerHTML = `${self.prefix} ${nh}时${nm}分${ns}秒`;
                }else{
                    el.innerHTML = `${self.prefix} ${nm}分${ns}秒`;
                }
                // el.innerHTML = `${self.prefix} ${nd}天${nh}时${nm}分${ns}秒`;
                self.leftTime -= 1000;
            }
        },1000);
    }
};

export default ShowRemainTime;
