<template>
    <div class="day_box">
        <div class="day_con">
            <input type="hidden" name="effectiveDate" class="effectiveDate">
            <ul class="week clearfix">
                <li>日</li>
                <li>一</li>
                <li>二</li>
                <li>三</li>
                <li>四</li>
                <li>五</li>
                <li>六</li>
            </ul>
            <ul class="day clearfix">
                <li v-for="item in empty[0]"></li>
                <li v-for="(item, index) in dayList" :class="item.class"><a @click="onclick(item.cont)" v-if="item.cont" href="javascript:;"><i>{{item.cont}}</i><span>{{item.money}}</span><u>{{item.stock}}</u></a></li>
                <li v-for="item in empty[1]"></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'Schedule',
        props: ['inData','value', 'month'],
        data(){
            return {
                openTime: this.value
            }
        },
        computed:{
            nowData(){
                return this.GetDateString(this.month+'-01');
            },
            empty(){
                let outData=[[],[]];
                for (var i = 1; i < this.nowData[5]+1; i++) {
                    outData[0].push('');
                }
                if((7 - this.nowData[7])!== 0){
                    for (var i = 7; i > this.nowData[7]+1; i--) {
                        outData[1].push('');
                    }
                }
                return outData
            },
            openMonth(){
                let openDate=this.GetDateString(this.openTime);
                console.log(openDate);
                if(this.month==openDate[0]+'-'+this.timeLength(openDate[1])){
                    return this.timeLength(openDate[2]);
                }
                return false
            },
            dayList(){
                let dayL={};
                for (var i = 1; i <= this.nowData[4]; i++) {
                    var ds={'cont':i};
                    if(this.openMonth == this.timeLength(i)){
                        ds.class='open'
                    }
                    if(this.inData.hasOwnProperty(this.timeLength(i))){
                        ds.money=this.inData[this.timeLength(i)][0];
                        ds.stock=this.inData[this.timeLength(i)][1];
                    }
                    dayL[i]=ds;
                }
                return dayL;
            }
        },
        watch: {
            value(v){
                this.openTime = v
            }
        },
        methods: {
            //时间格式化
            timeStyFun(intData){
                if(intData.indexOf("-") > 0){
                    var a = intData.split('-');
                    return a[0]+'-'+a[1]+'-'+a[2];
                }
            },
            //初始时间格式化
            GetDateString(inDate) {
                let myDate = new Date(inDate);
                var m = myDate.getMonth();
                var d = myDate.getDate();
                var y = myDate.getFullYear();
                var z = myDate.getDay();
                var n = new Date(y, m + 1, 0).getDate();
                var p = new Date(y, m, 0).getDate();
                myDate.setDate(1);
                var f = myDate.getDay();
                myDate.setDate(n);
                var q = myDate.getDay();
                return [y, m+1, d, z, n, f, p, q];
            },
            onclick(index){
//                console.log(event);
                if(this.inData.hasOwnProperty(this.timeLength(index))){
                    let sss = this.month+'-'+this.timeLength(index)
                    this.openTime=sss;
                    this.$emit('input', sss);
                    this.$emit('callBack', sss, this.timeLength(index));
                }
            },
//            //时间对比
//            timeContrast(data) {
//                var d = parseInt(data[0] + '' + this.timeLength(data[1]));
//                var ld = parseInt(this.lastData[0] + '' + this.timeLength(this.lastData[1]));
//                var td = parseInt(this.today[0] + '' + this.timeLength(this.today[1]));
//                return ((d == td) && 'firstMonth') || ((d == ld) && 'lastMonth');
//            },
//            //时间对比
//            timeContrast1(IntData) {
//                var d = IntData.split('.');
//                d=parseInt(d[0]+''+d[1]+''+d[2]);
//                var ld = parseInt(this.lastData[0] + '' + this.timeLength(this.lastData[1]) + '' +this.timeLength(this.lastData[2]));
//                var td = parseInt(this.today[0] + '' + this.timeLength(this.today[1]) + '' +this.timeLength(this.today[2]));
//                if(td<=d && d<=ld){
//                    return true;
//                }else{
//                    return false;
//                }
//            },
            timeLength(timeData) {
                return timeData < 10 ? '0' + timeData : timeData;
            }
        }
    }
</script>
