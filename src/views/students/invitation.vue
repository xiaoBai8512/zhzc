<template>
    <div class="body InvitationBox">
        <layout>
            <tab :line-width="1" :custom-bar-width="getBarWidth" active-color="#3399ff">
                <tab-item :selected="formData.is_read==null && formData.reciver_status ==null"  @on-item-click="tabclick(null)">全部</tab-item>
                <tab-item :selected="formData.is_read==0"  @on-item-click="tabclick('0')">未读</tab-item>
                <tab-item :selected="formData.is_read==1"  @on-item-click="tabclick('1')">已读</tab-item>
                <tab-item :selected="formData.reciver_status==1"  @on-item-click="tabclickRs(1)">我的承接</tab-item>
            </tab>
            <div class="InvitationBox_con">
                <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="p_main" :auto-fill="false"
                             v-if="num">
                    <mt-cell-swipe
                            v-for="(item, index) in list"
                            :key="index"
                            :right="[
                        {
                          content: '删除',
                          style: { background: 'red', color: '#fff' },
                          handler: () => Deleet(item, index)
                        }
                      ]">
                    <expert-invitation-item v-bind:item="item"></expert-invitation-item>
                    </mt-cell-swipe>
                    <p v-if="allLoaded" class="ywgdnr">已无更多内容</p>
                </mt-loadmore>
            </div>
        </layout>
    </div>
</template>

<script>
    import ExpertInvitationItem from '../../components/invitation/ExpertInvitationItem'

    export default {
        name: 'Login',
        components: {"expert-invitation-item" : ExpertInvitationItem},
        data() {
            return {
                pageData:{
                    "pageNum" : 1,
                    "pageSize" : 10,
                },
                list:[],
                selected: '1',
                type: null,
                formInline: null,
                checked: null,
                num: 12,
                allLoaded: false,
                switch1: false,
                getBarWidth: function (index) {
                    if (index == 3) {
                        return (4) * 0.386 + 'rem'
                    } else {
                        return (2) * 0.386 + 'rem'
                    }
                }
            }
        },
        created(){
            this.getData(this.formData)
        },
        computed:{
            formData(){
                console.log(this.$route.query.is_read)
                return {"is_read" : this.$route.query.is_read || null, "reciver_status" : this.$route.query.reciver_status || null,}
            }
        },
        watch:{
            formData: {
                handler(newValue) {
                    this.list=[];
                    this.pageData={
                        pageNum:1,
                        pageSize: 10,
                    },
                    this.getData(newValue)
                },
                deep: true
            },
        },
        methods: {
            getData(formData){
                let inData=Object.assign(this.pageData, formData)
                this.$store.dispatch('inviteMyReceive', inData).then((data)=>{
                    this.allLoaded = !!!data.hasNextPage;
                    if(data.pageNum==1){
                        this.list=[]
                    }
                    for (let item of data.list){
                        this.list.push(item)
                    }
                })
            },
            tabclick(val){
                this.$router.replace({name: 'invitation', query:{"is_read" : val}})
            },
            tabclickRs(val){
                this.$router.replace({name: 'invitation', query:{"reciver_status" : val}})
            },
            Deleet(item, index){

                let self = this;

                this.MessageBox({
                    title: '',
                    message: '确认要删除该邀请?',
                    showCancelButton: true,
                }).then((data)=>{
                    if(data=='confirm'){
                        this.$store.dispatch('delInvitation',{id:item.id}).then((data)=>{
                            self.list.splice(index, 1);
                        });
                    }else {
                        // this.$router.push({'name': 'selectProject', query:{userId:this.$route.query.id}})
                    }
                })
            },
            goNext() {
                this.$router.push({name: 'loginIdentity'})
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
