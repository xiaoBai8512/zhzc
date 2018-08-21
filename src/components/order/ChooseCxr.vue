<template>
    <div class="item-input">
        <div class="flex-center">
            <span class="normal-mr inline-flex-center"><span>{{ticket.t_standards_name}}</span><span class="font-label font22 normal-ml">{{ticket.t_limit_type | condition_str(ticket.t_limit_condition)}}</span></span>
            <img class="icon-cxr" src="../../assets/icons/product/jg@2x.png" alt="" @click="showInfo" v-if="ticket.t_remark.trim()">
        </div>

        <span class="flex tr font-gray normal-mr" v-if="cho=='1'" @click="addCXR(ticket.t_id, ind, ticket.mans, ticket.t_limit_type, ticket.t_limit_condition)">请选择出行人</span>
        <span class="flex" v-else @click="addCXR(ticket.t_id, ind, ticket.mans, ticket.t_limit_type, ticket.t_limit_condition)">
            <span class="normal-mr">{{name}}</span>
            <span>{{mob}}</span>
        </span>

        <x-icon class="icon-gray" type="ios-arrow-forward" size=".5rem" @click="addCXR(ticket.t_id, ind, ticket.mans, ticket.t_limit_type, ticket.t_limit_condition)"></x-icon>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        name: 'choose-cxr',
        props:{
            ticket: {
                type: Object,
                required: true
            },
            ind: {
                type: null,
                required: true
            },
            cho: {
                type: null,
            },
            name: {
                type: null,
            },
            mob: {
                type: null,
            }
        },
        methods:{
            //新增出行人
            addCXR(t_id, ind, num, t_limit_type, t_limit_condition){
                //判断平台
                if(this.$store.state.orgType == 'seller'){
                    //编辑
                    if(this.cxr && this.cxr[t_id] && this.cxr[t_id][ind]){
                        this.edit(t_id, ind, this.cxr[t_id][ind])
                    }else{
                        this.$router.push({name: 'addNewTraveller', query: {seller: 'seller', t_id, ind}})
                    }
                }else{
                    this.$router.push({name: 'travelPeoples', query: {
                        end: 'buyer', ...arguments
                    }})
                }
            },
            //编辑出行人
            edit(t_id, ind, ele){
                this.$store.commit('SET_EDITTRAVELLER', {
                    name: ele.vip_name,
                    mobile: ele.vip_mob,
                    card_type: ele.vip_card_type,
                    card_code: ele.vip_card,
                    sex: ele.vip_sex,
                    birthday: ele.vip_birthday
                });
                this.$router.push({name: 'addNewTraveller', query: {needMessage: true, seller: 'seller', t_id, ind}})
            },
            showInfo(){
                this.$store.commit('PROMPT', {type: 'confirm', text: this.ticket.t_remark})
            }
        },
        computed:{
            //出行人
            cxr(){
                return this.$store.state.order.orderSeat
            }
        }
    }
</script>
