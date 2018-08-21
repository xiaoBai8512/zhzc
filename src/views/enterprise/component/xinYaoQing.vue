<template>
    <div class="body enterpriseExperts enterprise_xin">
        <laypage :title="type==3 ? '我收到的邀请' : '发给专业机构的邀请'">
            <div class="enterpriseExperts_con InvitationBox_con">
                <div class="loadmoreBox">
                    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="p_main"
                                 :auto-fill="false"
                                 v-if="list">
                        <div class="enterprise" style="width: 100%;" v-if="type==4">
                            <div class="HH_List Invitation new" v-for="(item, index) in list" @click="$router.push({name: 'enterpriseInvitationDetail',query:{id:item.id}})">
                                <!--<svg-icon class="icon-class-new" icon-class="new"></svg-icon>-->
                                <img class="logo" :src="item.receiver.logo | imgUrl" alt="">
                                <div class="HH_List_Content">
                                    <div class="HH_List_Content_List HH_List_Content_List_1">
                                        <h5 class="HH_Grow HH_ellipsis">{{item.title}}</h5>
                                    </div>
                                    <div class="HH_List_Content_List HH_List_Content_List_2">
                                        <div class="icon_box HH_Grow">
                                            <span class="HH_Grow_name coll">{{item.receiver.fullname}}</span>
                                            <svg-icon v-if="!!item.receiver.isVip" icon-class="vip" class="svg-icon_vip"></svg-icon>
                                            <span class="vipSvg" ></span>
                                            <svg-icon icon-class="adds"></svg-icon>
                                            <span>{{item.receiver.city_name}}</span>
                                            <span>{{item.sendTime | n2t('{y}.{m}.{d}')}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="enterprise" style="width: 100%;" v-if="type==3">
                            <div class="HH_List Invitation new" v-for="(item, index) in list" @click="$router.push({name: 'enterpriseInvitationDetail',query:{id:item.id}})">
                                <!--<svg-icon class="icon-class-new" icon-class="new"></svg-icon>-->
                                <img class="logo" :src="item.sender.logo | imgUrl" alt="">
                                <div class="HH_List_Content">
                                    <div class="HH_List_Content_List HH_List_Content_List_1">
                                        <h5 class="HH_Grow HH_ellipsis">{{item.title}}</h5>
                                    </div>
                                    <div class="HH_List_Content_List HH_List_Content_List_2">
                                        <div class="icon_box HH_Grow">
                                            <span class="HH_Grow_name coll">{{item.sender.fullname}}</span>
                                            <svg-icon v-if="!!item.sender.isVip" icon-class="vip" class="svg-icon_vip"></svg-icon>
                                            <span class="vipSvg" ></span>
                                            <svg-icon icon-class="adds"></svg-icon>
                                            <span>{{item.sender.city_name}}</span>
                                            <span>{{item.sendTime | n2t('{y}.{m}.{d}')}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p v-if="allLoaded" class="ywgdnr">已无更多内容</p>
                    </mt-loadmore>
                </div>
            </div>
        </laypage>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import e from "../../../utils/localHandler";

    export default {
        name: 'Login',
        computed: {
            ...mapGetters(['type'])
        },
        data() {
            return {
                formData: {
                    "send_type": null,
                },
                pageData:{
                    "pageNum": 1,
                    "pageSize": 10,
                },
                allLoaded: false,
                list: [],
            }
        },
        created() {
            this.formData.send_type = this.type==4 ? this.$route.query.send : null;
            this.getData(this.formData)
        },
        watch: {
            // formData: {
            //     handler(newValue) {
            //         this.list=[];
            //         this.pageData={
            //             pageNum:1,
            //             pageSize: 10,
            //         },
            //         this.getData(newValue)
            //     },
            //     deep: true
            // },
        },
        methods: {
            getData(formData){
                let inData=Object.assign(this.pageData, formData)
                if(this.type==4){
                    this.$store.dispatch('inviteMySend', inData).then((data) => {
                        this.allLoaded = !!!data.hasNextPage;
                        if(data.pageNum==1){
                            this.list=[]
                        }
                        for (let item of data.list){
                            this.list.push(item)
                        }
                    }).finally(()=>{
                        this.$refs.p_main.onBottomLoaded();
                    })
                }else{
                    this.$store.dispatch('inviteMyReceive', inData).then(data=>{
                        this.allLoaded = !!!data.hasNextPage;
                        if(data.pageNum==1){
                            this.list=[]
                        }
                        for (let item of data.list){
                            this.list.push(item)
                        }
                    }).finally(()=>{
                        this.$refs.p_main.onBottomLoaded();
                    })
                }
            },
            loadBottom() {
                this.pageData.pageNum++;
                this.getData(this.formData)
            },
        }
    }
</script>
