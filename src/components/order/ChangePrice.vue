<template>
    <div class="mask" v-show="value=='show'">
        <div class="normalMask boxMaskBlack"></div>
        <div class="od-change-price">
            <p class="od-change-price-title">修改价格</p>
            <div style="margin-top: .4rem">
                <div class="od-change-price-input ovh pad">
                    <span class="fl">统一零售价</span>
                    <div class="fr">
                        <input type="number" v-model="money">
                        <span>元</span>
                    </div>
                </div>
                <div class="font-gray pad">不能低于平台结算价{{o_settle_real}}元</div>
            </div>
            <div>
                <button class="od-change-price-sure" @click="changePrice">确认</button>
                <button class="od-change-price-cancel" @click="cancelChangePrice">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'change-price',
        props: ['value', 'o_settle_real', 'o_number', 'page', 'status'],
        data(){
            return{
                money: ''
            }
        },
        methods: {
            //小b修改订单金额--做校验
            changePrice(){
                let m = Number(this.money);
                let sr = Number(this.o_settle_real);
                if(isNaN(m) || !m){
                    this.$store.commit('PROMPT', {type: 'prompt', text: '请输入整数'})
                }else if(m<sr){
                    this.$store.commit('PROMPT', {type: 'prompt', text: '不能低于平台结算价'})
                }else{
                    this.$emit('input', 'hide');
                    this.$store.dispatch('changeOrderPrice', {
                        orderno: this.o_number,
                        money: this.money,
                        remark: this.remark || '',
                        page: this.page,
                        status: this.status,
                        vm: this
                    });
                }
            },
            cancelChangePrice(){
                this.$emit('input', 'hide')
            }
        }
    }
</script>
