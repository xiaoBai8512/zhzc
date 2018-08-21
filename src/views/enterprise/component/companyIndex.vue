<template>
    <div class="body enterprise">

            <layout>
                <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="p_main" :auto-fill="false" v-if="num">
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
                    <h3 class="HH_Title">推荐专区</h3>
                    <h3 class="HH_Title HH_Title_Zyjg HH_Title_Go" @click="$router.push({name:'Organizations'})"><span>-</span>专业机构<span>-</span></h3>
                    
                    <EnterpriseItem :item="item" :showOp="false" :index="index" v-for="(item, index) in enterpriseSearch" :key="'org_list_'+index"></EnterpriseItem>

                    <h3 class="HH_Title HH_Title_Zyjg HH_Title_Go m_t_2" @click="$router.push({name:'enterpriseExperts'})"><span>-</span>专家<span>-</span></h3>

                    <ExpertItem :item="item" :showOp="false" v-for="(item, index) in expertSearch2" :key="'exp_'+index"></ExpertItem>
                    
                </div>

                <div class="HH_layer con_3" v-if="newsList">
                    <h3 class="HH_Title">发现</h3>
                    <div class="HH_List_img" v-for="item in newsList" @click="$router.push({name:'newDetails', query:{id: item.id}})" :key="item.id">
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
    import ExpertItem from '../../../components/expert/ExpertItem'
    import EnterpriseItem from '../../../components/enterprise/EnterpriseItem'

    export default {
        name: 'Login',
        components:{ExpertItem,EnterpriseItem},
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
                num:2,
                allLoaded:false,
                switch1:false,
                formData:{
                    pageSize:10,
                    pageNum:1,
                },
                enterpriseFormData:{
                    pageSize:3,
                    pageNum:1,
                    businessAlternative:1,
                    isRecommend:1,
                },
                expertSearchFormData1:{
                    pageSize:3,
                    pageNum:1,
                    isRecommend:1,
                    type:1
                },
                expertSearchFormData2:{
                    pageSize:3,
                    pageNum:1,
                    isRecommend:1,
                    type:2
                },
                newsData:{
                    pageSize:3,
                    pageNum:1,
                    type:this.$store.state.login.type,
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
            this.$store.dispatch('enterpriseSearch', this.enterpriseFormData).then((data) => {
                this.enterpriseSearch = data.list;
            })
            this.$store.dispatch('expertSearch', this.expertSearchFormData2).then((data) => {
                this.expertSearch2 = data.list;
            })
            this.$store.dispatch('getNewsList', this.newsData).then((data) => {
                this.newsList = data.list;
                this.allLoaded = !!!data.hasNextPage;
            })
        },
        methods:{
            goNext(){
                this.$router.push({name:'loginIdentity'})
            },
            loadBottom(){
                this.newsData.pageNum++
                this.$store.dispatch('getNewsList', this.newsData).then((data) => {
                    this.allLoaded = !!!data.hasNextPage;
                    for (let item of data.list){
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
