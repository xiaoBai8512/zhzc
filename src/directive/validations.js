import ShowRemainTime from '../utils/djs'
var D = {}

D.install = function (Vue, opt) {
    Vue.directive('mobilePhone', {
        inserted: function (el, binding) {
            console.info("el " + el.value)
            let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            el.addEventListener('blur', function () {
                if(!myreg.test(el.value)) {
                    el.error = true
                } else {
                    el.error = null
                }
            })
        }
    });

    Vue.directive('password', {
        inserted: function (el) {
            el.addEventListener('blur', function () {
                let val = el.value
                if (val == null || val.length === 0) {
                    console.info('password error')
                    el.error = true
                } else {
                    console.info('password pass')
                    el.error = null
                }
            })
        }
    });

    Vue.directive('concat', {
        inserted: (el, binding) => {
            var phone = binding.value.phone;
            if(phone && phone != '***'){
                el.addEventListener('click', () => {
                    console.log('phone', phone);
                    location.href='tel:'+phone;
                    // if(!device.isWeixin && device.ios){
                    //     callNative('requestSystemCall', {number: phone}, data => console.log(data))
                    // }else{
                    //     location.href='tel:'+phone;
                    // }
                })
            }
        }
    });

    Vue.directive('djs', {
        inserted: (el, binding) => {
            var time = binding.value.time; //秒数
            var end = Number(time)*1000;
            var now = new Date().getTime();
            if(now<end){
                var djs = new ShowRemainTime(el, end-now);
                djs.showT();
            }else{
                el.innerHTML = '已结束';
            }
        }
    });
}

export default D
