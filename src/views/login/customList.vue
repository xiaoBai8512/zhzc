<template>
    <div class="body InvitationBox">
        <laypage>
            <div class="InvitationBox_con">
                <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="p_main" :auto-fill="false"
                             v-if="list">
                    <div class="services_con">
                        <el-collapse class="services_con_box" v-model="activeNames" v-for="(item, index) in list" :key="index">
                            <el-collapse-item title="定制服务需求内容定制服务需求。" :name="index">
                                <template slot="title">
                                    定制服务需求
                                    <span>{{item.createTime | n2t('{y}.{m}.{d}')}}</span>
                                </template>
                                <div class="content">
                                    {{item.content}}
                                </div>
                                <p>
                                    联系人：<span>{{item.name}}</span>
                                </p>
                                <p>
                                    联系电话：<span>{{item.phone}}</span>
                                </p>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
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
                activeNames:null,
                formData:{
                    "pageNum" : 1,
                    "pageSize" : 10,
                    "is_read" : null,
                    "reciver_status" : 1
                },
                list:null,
                selected: '1',
                type: null,
                formInline: null,
                checked: null,
                num: 12,
                allLoaded: false,
                switch1: false,
            }
        },
        created(){
            this.$store.dispatch('serviceMyServices', this.formData).then((data)=>{
                this.list=data;
                this.allLoaded=true;
            })

        },
        methods: {
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
                this.num = this.num + 2;
            }

        }
    }
</script>
<style scoped>
    .box-card {
    }
</style>
