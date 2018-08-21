<template>
    <div class="HH_List publicMenpriseltem">
        <div class="men_1" @click="$router.push({name: 'OrganizationDetails', query:{userId:item.userId}})">
            <img class="logo" :src="item.logo | imgUrl" alt="">
            <div class="men_1_con">
                <div class="men_1_con_top">
                    <h5 class="HH_Grow HH_ellipsis">
                        {{item.fullname}}
                    </h5>
                    <span class="rz" v-if="item.isCertification==1">认证</span>
                    <!-- <svg-icon icon-class="vip" class="svg-icon_vip" v-if="item.isVip"></svg-icon> -->
                    <span class="emp"></span>
                    <button type="text" v-if="item.isPrepare==1 && showOp" class="open" @click.stop="prepare">
                        <svg-icon icon-class="xuanzhong"></svg-icon>已备选
                    </button>
                    <button type="text" v-if="item.isPrepare==0 && showOp" @click.stop="prepare">
                        <svg-icon icon-class="weixuan"></svg-icon>备选
                    </button>
                </div>
                <div class="men_1_con_bottom">
                    <svg-icon icon-class="adds"></svg-icon>
                    <span>{{item.city_name}}</span>
                </div>
                <div class="men_1_con_bottom coll">
                    <span>机构类别：
                        <template v-for="itemTow in item.organizationTypeItems">{{itemTow.name}} </template>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'enterprise_item',
        data(){
            return{

            }
        },
        props: ['item', 'showOp', "index"],
        methods: {
            prepare: function(){
                this.$emit('Prepare', this.index);
            }
        },
        computed: {

        },
    }
</script>
