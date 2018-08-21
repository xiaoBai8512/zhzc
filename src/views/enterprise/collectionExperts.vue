<template>
    <div class="body enterpriseExperts">
        <laypage :title="titleList[$route.query.type]">
            <div class="enterpriseExperts_con" v-if="$route.query.type!=3">
                <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="p_main" :auto-fill="false"
                             class="conList" v-if="list">
                    
                    <ExpertItem :item="item.userExpert" :showOp="false" :index="index" @Prepare="onPrepare(item.userExpert,index)" v-for="(item, index) in list" :key="'list'+index"></ExpertItem>

                    <p v-if="allLoaded" class="ywgdnr">已无更多内容</p>
                </mt-loadmore>
            </div>
            <div class="enterpriseExperts_con InvitationBox_con" v-else>
                <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="p_main" :auto-fill="false"
                             v-if="list">

                    <EnterpriseItem :item="item.userEnterprise" :showOp="false" :index="index" v-for="(item, index) in list" :key="'fav_ent_list_'+index"></EnterpriseItem>
                    
                    <p v-if="allLoaded" class="ywgdnr">已无更多内容</p>
                </mt-loadmore>
            </div>

        </laypage>
    </div>
</template>

<script>
    import Prepare from '../../components/Prepare'
    import ExpertItem from '../../components/expert/ExpertItem'
    import EnterpriseItem from '../../components/enterprise/EnterpriseItem'

    export default {
        name: 'Login',
        components:{Prepare,ExpertItem,EnterpriseItem},
        data() {
            return {
                titleList:{
                    1:'我收藏的学生',
                    2:'我收藏的专家',
                    3:'我收藏的机构',
                },
                openIndex:null,
                id:null,
                formData:{
                    'favType':this.$route.query.type,
                },
                pageData:{
                    pageNum:1,
                    pageSize: 10,
                },
                list:[],
                type:this.$store.getters.type,
                allLoaded: false,
            }
        },
        created() {
            this.getData(this.formData)
        },
        methods: {
            getData(formData){
                let inData=Object.assign(this.pageData, formData)
                this.$store.dispatch('favoriteMyFavs', inData).then((data)=>{
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
            },
            loadBottom() {
                this.pageData.pageNum++;
                this.getData(this.formData)
            }
        }
    }
</script>
<style scoped>
    .back {

    }
</style>
