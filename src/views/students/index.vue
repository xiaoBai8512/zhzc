<template>
    <div class="body students">

        <layout>
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="p_main" :auto-fill="false"
                         v-if="num">
                <yd-slider autoplay="3000" v-if="bannerList">
                    <yd-slider-item v-for="(item, index) in bannerList" :key="index">
                        <img :src="item.image | imgUrl(' ')">
                    </yd-slider-item>
                </yd-slider>
                <div class="HH_layer HH_flex con_1" v-if="type==1">
                    <button class="wdcj" @click="$router.push({name:'invitation', params:{reciver_status:1}})">我的承接</button>
                    <button class="wszl" @click="$router.push({name:'perfectInfo'})">完善资料</button>
                </div>
                <div class="HH_layer HH_flex con_1 con_11" v-else>
                    <button class="wdbx" @click="$router.push({name:'invitation', params:{reciver_status:1}})">我的承接</button>
                    <div class="webx_right">
                        <button class="wdsc" @click="$router.push({name:'perfectInfo'})">完善资料</button>
                        <button class="dzfw" @click="$router.push({name:'custom'})">定制服务</button>
                    </div>
                </div>
                <div class="HH_layer_mini HH_flex">
                    <p v-if="!openInvite" style="color:#f56c6c">您已关闭接受邀请功能，打开后可继续接收新的邀请。</p>
                    <p v-else>您已打开接受邀请功能</p>
                    <el-switch v-model="openInvite" @change="setOpenInvite"></el-switch>
                </div>
                <div class="HH_layer con_2" v-if="inviteList">
                    <h3 class="HH_Title HH_Title_Go" @click="$router.push({name:'invitation'})">最新邀请</h3>
                    <expert-invitation-item v-bind:item="item" v-for="(item, index) in inviteList" :key="index"></expert-invitation-item>
                </div>
                <div class="HH_layer con_3" v-if="newsList">
                    <h3 class="HH_Title">发现</h3>
                    <div class="HH_List_img" v-for="(item, index) in newsList" @click="$router.push({name:'newDetails', query:{id: item.id}})" :key="index">
                        <img :src="item.image | imgUrl(' ')" alt="">
                        <div class="HH_List_img_con">
                            <h5>{{item.title}}</h5>
                            <span>{{item.createTime | n2t('{y}.{m}.{d}')}}</span>
                        </div>
                    </div>
                </div>
                <p v-if="allLoaded" class="ywgdnr">已无更多内容</p>
            </mt-loadmore>
        </layout>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import ExpertInvitationItem from '../../components/invitation/ExpertInvitationItem'

    export default {
        name: 'Login',
        components: {"expert-invitation-item" : ExpertInvitationItem},
        data() {
            return {
                bannerList: null,
                newsList: null,
                inviteList: null,
                formInline: null,
                checked: null,
                num: 2,
                allLoaded: true,
                openInvite: false,
                newsData:{
                    pageNum:1,
                    pageSize:3,
                    type:this.$store.state.login.type,
                },
                inviteData:{
                    pageNum:1,
                    pageSize:5,
                    is_read:null,
                    reciver_status:null,
                },
            }
        },
        computed: {
            ...mapGetters([
                'type',
                'user',
            ]),
        },
        watch: {

        },
        created() {
            this.$store.dispatch('commonBanners', this.type).then((data) => {
                this.bannerList = data;
            })
            this.$store.dispatch('getNewsList', this.newsData).then((data) => {
                this.newsList = data.list;
                this.allLoaded = !!!data.hasNextPage;
            })
            this.$store.dispatch('inviteMyReceive', this.inviteData).then((data) => {
                this.inviteList = data.list;
            })
            this.openInvite = !!this.user.expert.openInvite;
        },
        methods: {
            goNext() {
                this.$router.push({name: 'loginIdentity'})
            },
            loadBottom() {
                this.newsData.pageNum++
                this.$store.dispatch('getNewsList', this.newsData).then((data) => {
                    this.allLoaded = !!!data.hasNextPage;
                    for (let item of data.list){
                        this.newsList.push(item)
                    }
                }).finally(()=>{
                    this.$refs.p_main.onBottomLoaded();
                })
            },
            setOpenInvite(val){
                this.$store.dispatch('expertInvite', val ? 'open' : 'close').then(data => {
                    let inDate = this.user;
                    inDate.expert.openInvite = Number(val);
                    this.$store.commit('SET_USER', inDate)
                });
            }

        }
    }
</script>
<style scoped>
    .back {

    }
</style>
