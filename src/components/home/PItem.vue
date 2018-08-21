<template>
    <div class="item-pro" @click="toProDetail(pro.p_id)">
        <div class="box-img-pro img-center-cover" :style="{backgroundImage: 'url('+pro.p_cover+')'}">
            <!--<img :src="pro.p_cover" alt="">-->
        </div>
        <div class="product-info">
            <p class="product-info-name coll2">{{pro.p_name}}</p>
            <div class="product-info-item">
                <span class="info-type">{{pro.p_type_name}}</span> <span>{{pro.p_days}}天</span>
            </div>
            <div class="product-info-small">
                <span v-if="pro.t_profit || pro.t_trade_price">
                    <span v-if="pro.t_trade_price">{{pro.t_trade_price | n2m}}起</span>
                    <span v-if="pro.t_profit || pro.t_profit==0" class="font-gray">利:{{pro.t_profit | n2m}} </span>
                </span>
                <span v-else></span>
                <span>
                    <span class="lsj">统一零售价</span>
                    <span class="font-theme bold font24">{{pro.ticket_min | n2m}}起</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'p-item',
        props: {
            pro: [Object]
        },
        methods: {
            toProDetail(id){
                this.$router.push({name: 'productDetails', query: {p_id: id}})
            },
        },
        computed: {
            orgType(){
                return this.$store.state.orgType
            }
        }
    }
</script>
