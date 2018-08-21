<template>
    <div class="body InvitationBox">
        <laypage>
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
                          handler: () => Deleet()
                        }
                      ]">
                        <div class="HH_List Invitation new"  @click="$router.push({name:'invitationDetails',query:{id:item.id}})">
                            <svg-icon class="icon-class-new" icon-class="new"></svg-icon>
                            <img class="logo" :src="item.sender.logo" alt="">
                            <div class="HH_List_Content">
                                <div class="HH_List_Content_List HH_List_Content_List_1">
                                    <h5 class="HH_Grow HH_ellipsis">{{item.projectName}}
                                        <!--<svg-icon icon-class="vip"></svg-icon>-->
                                    </h5>
                                    <span>{{item.sendTime | n2t('{m}.{d}')}}</span>
                                </div>
                                <div class="HH_List_Content_List HH_List_Content_List_2">
                                    <div class="icon_box HH_Grow">
                                        <svg-icon icon-class="adds"></svg-icon>
                                        <span>{{item.city_name}}</span>
                                        <svg-icon icon-class="time"></svg-icon>
                                        <span>{{item.startTime | n2t('{m}.{d}')}} - {{item.endTime | n2t('{m}.{d}')}}</span>
                                        <!--<svg-icon icon-class="bao"></svg-icon>-->
                                        <!--<span>需出差</span>-->
                                    </div>
                                    <span class="money"></span>
                                    <!--<span class="money">2000元/天</span>-->
                                </div>
                            </div>
                        </div>
                    </mt-cell-swipe>
                    <p v-if="allLoaded" class="ywgdnr">已无更多内容</p>
                </mt-loadmore>
            </div>

        </laypage>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                formData:{
                    "is_read" : null,
                    "reciver_status" : 1
                },
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
                }).finally(()=>{
                    this.$refs.p_main.onBottomLoaded();
                })
            },
            Deleet(){
                this.MessageBox({
                    title: '',
                    message: '确认要删除该邀请?',
                    showCancelButton: true,
                }).then((data)=>{
                    if(data=='confirm'){
                        // this.$router.push({name:'newPosition', query:{userId:this.$route.query.userId, id:id}})
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
