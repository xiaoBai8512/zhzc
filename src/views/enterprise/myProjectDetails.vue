<template>
    <div class="body newProject projectInfo">
        <laypage>
            <div>
                <yd-cell-group title="项目信息">
                    <yd-cell-item class="">
                        <span class="HHCellItem" slot="left">项目名称</span>
                        <input class="HHCellItemInput" slot="right" type="text" v-model="formData.projectName" placeholder="请输入项目名称">
                    </yd-cell-item>
                    <yd-cell-item class="">
                        <span class="HHCellItem" slot="left">工作时间</span>
                        <div slot="right" class="HHItemRight">
                            <span class="button">{{formData.startTime | n2t('{y}.{m}.{d}')}}</span>
                            <span class="zhi">至</span>
                            <span class="button">{{formData.endTime | n2t('{y}.{m}.{d}')}}</span>
                        </div>
                    </yd-cell-item>
                    <yd-cell-item class="justifyContent ">
                        <span class="HHCellItem" slot="left">项目所在地</span>
                        <div slot="right" class="HHItemRight">
                            <span>{{formData.province_name+'-'+formData.city_name+'-'+formData.district_name}}</span>
                        </div>
                    </yd-cell-item>
                    <yd-cell-item class="justifyContent">
                        <span class="HHCellItem" slot="left">项目所属行业</span>
                        <input class="HHCellItemInput" slot="right" type="text" v-model="formData.industry_name" placeholder="请输入项目名称">
                    </yd-cell-item>
                    <yd-cell-item class="">
                        <span class="HHCellItem" slot="left">联系人姓名</span>
                        <input class="HHCellItemInput" slot="right" type="text" placeholder="请输入" v-model="formData.contact">
                    </yd-cell-item>
                    <yd-cell-item class="">
                        <span class="HHCellItem" slot="left">联系人电话</span>
                        <input class="HHCellItemInput" slot="right" type="text" v-model="formData.contactMobile" placeholder="请输入项目名称">
                    </yd-cell-item>
                </yd-cell-group>
                <yd-cell-group title="职位信息">
                    <yd-cell-item v-for="(itemTow, inc) in formData.jobs" :key="inc">
                        <div class="HHCellItemInput " slot="right">
                            <div class="fr">
                                <button type="text" @click="modifyPro(itemTow)"><svg-icon icon-class="modify"></svg-icon></button>
                                <button type="text" @click="deletePro(itemTow)"><svg-icon icon-class="Del"></svg-icon></button>
                            </div>
                            <p><span>职位名称：</span>{{itemTow.jobName}}</p>
                            <p v-if="!!!itemTow.salaryNegotiated"><span>薪资：</span>面议</p>
                            <p v-else><span>薪资：</span>{{itemTow.salary}}元/天</p>
                            <p><span>是否出差：</span>{{!!itemTow.businessTrip ? '是' : '否'}}</p>
                            <p><span>工作内容：</span></p>
                            <p>{{itemTow.content}}</p>
                            <p><span>工作要求：</span></p>
                            <p>{{itemTow.requirement}}</p>
                        </div>
                    </yd-cell-item>
                </yd-cell-group>

            </div>
            <button class="xzw" @click="$router.push({name:'newPosition', query:{id:$route.query.id}})"><i class="el-icon-plus"></i> 新职位</button>
        </laypage>

    </div>
</template>

<script>
    import {dateFtt} from '../../utils/utils'
    import e from "../../utils/localHandler";
    export default {
        name: 'Login',
        data() {
            return {
                formData:{},
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getData(){
                this.$store.dispatch('projectPidDetails', this.$route.query.id).then((data)=>{
                    this.formData=data
                })
            },
            modifyPro(val){
                this.$router.push({name:'newPosition', query:{id:this.$route.query.id,jobid:val.id}})
            },
            deletePro(val){
                this.MessageBox({
                    title: '',
                    message: '确认要删除该职位?',
                    showCancelButton: true,
                }).then((data)=>{
                    if(data=='confirm'){
                        this.$store.dispatch('projectJobDetailsH', val.id).then((data)=>{
                            this.getData()
                        })
                        // this.$router.push({name:'newPosition', query:{userId:this.$route.query.userId, id:id}})
                    }else {
                        // this.$router.push({'name': 'selectProject', query:{userId:this.$route.query.id}})
                    }
                })
            },
            sumber(){
                this.$store.dispatch('projectAdd',this.formData).then((data)=>{
                    let id=data.id;
                    this.MessageBox({
                        title: '',
                        message: '已成功添加项目信息?',
                        showCancelButton: true,
                        cancelButtonText: '返回项目列表',
                        confirmButtonText: '添加项目职位',
                    }).then((data)=>{
                        if(data=='confirm'){
                            this.$router.push({name:'newPosition', query:{userId:this.$route.query.userId, id:id}})
                        }else {
                            this.$router.push({'name': 'selectProject', query:{userId:this.$route.query.id}})
                        }
                    })
                })
            },
        }
    }
</script>
<style scoped>
    .back {

    }
</style>
