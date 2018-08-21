<template>
    <div class="body enterprise">
        <layout>
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="p_main" :auto-fill="false"
                         v-if="num">
                <yd-slider autoplay="3000" v-if="bannerList">
                    <yd-slider-item v-for="(item, index) in bannerList" :key="index">
                        <img :src="item.image  | imgUrl(' ')">
                    </yd-slider-item>
                </yd-slider>
                <div class="HH_layer HH_flex con_1">
                    <button class="wdbx" @click="$router.push({name:'enterpriseAlternative'})">我的备选</button>
                    <div class="webx_right">
                        <button class="wdsc" @click="$router.push({name:'enterpriseCollection'})">我的收藏</button>
                        <button class="dzfw" @click="$router.push({name:'custom'})">定制服务</button>
                    </div>
                </div>

                <div class="HH_layer con_4 button_tab_round_box">
                    <h3 class="HH_Title HH_Title_Go" @click="goMore">推荐专区</h3>
                    <tab :line-width="1" active-color="#3399ff" class="button_tab_round">
                        <div class="hehe">
                            <tab-item :selected="tabIndex==1" @on-item-click="tabIndex=1">合作机构</tab-item>
                            <tab-item :selected="tabIndex==2" @on-item-click="tabIndex=2">专家</tab-item>
                            <tab-item :selected="tabIndex==3" @on-item-click="tabIndex=3">实习生</tab-item>
                        </div>
                    </tab>
                    
                    <EnterpriseItem v-if="tabIndex==1" :item="item" :showOp="false" :index="index" v-for="(item, index) in enterpriseSearch" :key="'org_list_'+index"></EnterpriseItem>

                    <ExpertItem v-if="tabIndex==2" :item="item" :showOp="false" v-for="(item, index) in expertSearch2"
                                :key="'Search2'+index"></ExpertItem>

                    <ExpertItem v-if="tabIndex==3" :item="item" :showOp="false" v-for="(item, index) in expertSearch1"
                                :key="'Search1'+index"></ExpertItem>

                </div>
                <div class="HH_layer con_2">
                    <h3 class="HH_Title HH_Title_Go" @click="$router.push({name: 'yaoInvitation', query:{send:'TO_Organization'}})">邀请函</h3>
                    <div class="HH_List Invitation new" v-for="(item, index) in ReceiveList" @click="$router.push({name: 'enterpriseInvitationDetail',query:{id:item.id}})" :key="index">
                        <svg-icon class="icon-class-new" v-if="item.isRead == 0" icon-class="new"></svg-icon>
                        <img class="logo" :src="item.sender.logo | imgUrl" alt="">
                        <div class="HH_List_Content">
                            <div class="HH_List_Content_List HH_List_Content_List_1">
                                <h5 class="HH_Grow HH_ellipsis">{{item.title}}</h5>
                            </div>
                            <div class="HH_List_Content_List HH_List_Content_List_2">
                                <div class="icon_box HH_Grow">
                                    <span class="HH_Grow_name coll">{{item.sender.fullname}}</span>
                                    <svg-icon v-if="!!item.sender.isVip" icon-class="vip"
                                              class="svg-icon_vip"></svg-icon>
                                    <span class="vipSvg"></span>
                                    <svg-icon icon-class="adds"></svg-icon>
                                    <span>{{item.sender.city_name}}</span>
                                    <span>{{item.sendTime | n2t('{y}.{m}.{d}')}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="HH_layer con_3" v-if="newsList">
                    <h3 class="HH_Title">发现</h3>
                    <div class="HH_List_img" v-for="(item, index) in newsList"
                         @click="$router.push({name:'newDetails', query:{id: item.id}})" :key="index">
                        <img :src="item.image  | imgUrl(' ')" alt="">
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
    import ExpertItem from '../../../components/expert/ExpertItem'
    import EnterpriseItem from '../../../components/enterprise/EnterpriseItem'

    export default {
        name: 'Login',
        components: {ExpertItem,EnterpriseItem},
        data() {
            return {
                tabIndex: 1,
                ReceiveList: null,
                enterpriseSearch: null,
                expertSearch2: null,
                expertSearch1: null,
                bannerList: null,
                newsList: null,
                inviteList: null,
                formInline: null,
                checked: null,
                num: 2,
                allLoaded: false,
                switch1: false,
                formData: {
                    pageSize: 3,
                    pageNum: 1,
                },
                enterpriseFormData: {
                    pageSize: 3,
                    pageNum: 1,
                    openCooperation: 1,
                    isRecommend: 1,
                },
                expertSearchFormData1: {
                    pageSize: 3,
                    pageNum: 1,
                    isRecommend: 1,
                    type: 1
                },
                expertSearchFormData2: {
                    pageSize: 3,
                    pageNum: 1,
                    isRecommend: 1,
                    type: 2
                },
                newsData: {
                    pageSize: 3,
                    pageNum: 1,
                    type: this.$store.state.login.type,
                },
            }
        },
        computed: {
            ...mapGetters([
                'type',
                'user',
            ]),
        },
        created() {
            this.$store.dispatch('commonBanners', this.type).then((data) => {
                this.bannerList = data;
            })
            this.$store.dispatch('inviteMyReceive', this.formData).then((data) => {
                this.ReceiveList = data.list;
            })
            this.$store.dispatch('enterpriseSearch', this.enterpriseFormData).then((data) => {
                this.enterpriseSearch = data.list;
            })
            this.$store.dispatch('expertSearch', this.expertSearchFormData2).then((data) => {
                this.expertSearch2 = data.list;
            })
            this.$store.dispatch('expertSearch', this.expertSearchFormData1).then((data) => {
                this.expertSearch1 = data.list;
            })
            this.$store.dispatch('getNewsList', this.newsData).then((data) => {
                this.newsList = data.list;
                this.allLoaded = !!!data.hasNextPage;
            })
        },
        methods: {
            goNext() {
                this.$router.push({name: 'loginIdentity'})
            },
            goMore() {
                switch (this.tabIndex) {
                    case 1:
                        this.$router.push({name: 'Organizations'});
                        break;
                    case 2:
                        this.$router.push({name: 'enterpriseExperts', params:{type:2}});
                        break;
                    case 3:
                        this.$router.push({name: 'enterpriseExperts', params:{type:1}});
                        break;
                }
            },
            loadBottom() {
                this.newsData.pageNum++
                this.$store.dispatch('getNewsList', this.newsData).then((data) => {
                    this.allLoaded = !!!data.hasNextPage;
                    for (let item of data.list) {
                        this.newsList.push(item)
                    }

                }).finally(()=>{
                    this.$refs.p_main.onBottomLoaded();
                })
            }

        }
    }
</script>
<style scoped>
    .back {

    }
</style>
