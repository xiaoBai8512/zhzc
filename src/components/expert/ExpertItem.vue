<template>
    <div class="HH_List publicMen" @click="$router.push({name: 'enterpriseExpertsDetails',query:{userId:item.userId,inInvite:inInvite}})">
        <div class="men_1">
            <img class="logo" :src="item.avatar | imgUrl" alt="">
            <div class="men_1_con">
                <div class="men_1_con_top">
                    <h5 class="HH_Grow HH_ellipsis">
                        {{item.isAnonymous == 0 && item.realname ? item.realname : item.nickname}}
                        <!-- <svg-icon icon-class="renzheng" v-if="item.isCertification==1"></svg-icon> -->
                        <span class="rz" v-if="item.isCertification==1">认证</span>
                        <span v-if="item.type==2">专家</span>
                        <span v-if="item.type==1">实习生</span>
                    </h5>
                    <div v-if="showOp==true">
                        <button type="text" v-if="!!item.isPrepare" class="open" @click.stop="prepare">
                            <svg-icon icon-class="xuanzhong"></svg-icon>已备选
                        </button>
                        <button type="text" v-else @click.stop="prepare">
                            <svg-icon icon-class="weixuan"></svg-icon>备选
                        </button>
                    </div>
                </div>
                <div class="men_1_con_bottom">
                    <svg-icon icon-class="nv" v-if="item.gender==2"></svg-icon>
                    <svg-icon icon-class="nan" v-if="item.gender==1"></svg-icon>
                    <span>{{item.age}}岁</span>
                    <svg-icon icon-class="adds"></svg-icon>
                    <span>{{item.city_name}}</span>
                    <svg-icon icon-class="bao"></svg-icon>
                    <span>{{!!item.businessTrip ? '接受出差' : '不接受出差'}}</span>
                </div>
            </div>
        </div>
        <div class="men_2">
            <p class="coll">{{item.type==1?"实习方向":"业务领域"}}：<span v-for="(itemTree,index) in item.businessAreaItems" :key="index">{{itemTree.name}}&nbsp;</span></p>
            <svg-icon :icon-class="'q_'+q.qualificationId" v-if="index < 3" v-for="(q, index) in item.qualificationItems" :key="index"></svg-icon>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'expert_item',
        data(){
            return{

            }
        },
        props: ['item', 'showOp', "index", 'inInvite'],
        methods: {
            prepare: function(){
                this.$emit('Prepare', this.index);
            }
        },
        computed: {

        },
    }
</script>
