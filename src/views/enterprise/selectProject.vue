<template>
    <div class="body selectProject">
        <laypage class="selectProject_laypage">
            <button slot="right"  @click="$router.push({name:'newProject',query:{userId:$route.query.userId}})" class="xjxm"><i class="el-icon-plus"></i> 新建项目</button>
            <div class="selectProject_con">
                <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="p_main" :auto-fill="false"
                             v-if="list">
                    <el-collapse v-model="activeNames" @change="handleChange" accordion>
                        <el-collapse-item :name="item.id" v-for="(item, index) in list" :key="index">
                            <h3 class="HH_Title" slot="title">
                                {{item.projectName}}
                            </h3>
                            <template v-if="jobs && jobs.length > 0">
                                <h5>现有职位</h5>
                                <div class="collapse_con">
                                    <el-collapse v-model="activeName1s" @change="handleChange1" accordion>
                                        <el-checkbox-group v-model="checkList">
                                            <el-collapse-item class="clearfix" :name="itemTow.id" v-for="(itemTow, inx) in jobs" :key="inx">
                                    <span class="titleCheckbox" slot="title">
                                        <el-checkbox :label="itemTow.id">{{itemTow.jobName}}</el-checkbox>
                                    </span>
                                                <div class="collapse_con_con">
                                                    <p><span>职位名称：</span>{{itemTow.jobName}}</p>
                                                    <p v-if="!!itemTow.salaryNegotiated"><span>薪资：</span>面议</p>
                                                    <p v-else><span>薪资：</span>{{itemTow.salary}}元/天</p>
                                                    <p><span>是否出差：</span>{{!!itemTow.businessTrip ? '是' : '否'}}</p>
                                                    <p><span>工作内容：</span></p>
                                                    <p>{{itemTow.content}}</p>
                                                    <p><span>工作要求：</span></p>
                                                    <p>{{itemTow.requirement}}</p>
                                                </div>
                                            </el-collapse-item>
                                        </el-checkbox-group>
                                    </el-collapse>
                                </div>
                            </template>
                            <p v-else class="tc">暂无职位</p>
                            <button class="xzw" @click="$router.push({name:'newPosition', query:{id:item.id,userId:$route.query.userId}})"><i class="el-icon-plus"></i> 新职位</button>
                        </el-collapse-item>
                    </el-collapse>
                    <p v-if="allLoaded" class="ywgdnr">已无更多内容</p>
                </mt-loadmore>

            </div>

            <div class="selectProject_foot">
                <button class="HH_Button_Bull" @click="send">发送邀请</button>
                <!--<button class="HH_Button_Bull" @click="$router.push({name:'confirmInvitation'})">发送邀请</button>-->
            </div>
        </laypage>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                list:null,
                jobs:null,
                projectId:null,
                checkList:[],


                activeNames: '1',
                activeName1s: null,
                popupVisible: false,
                popupVisible2: false,
                dictsBusinessArea:null,
                disctQualification:null,
                disctIndustries:null,
                businessArea:[],
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
                },
                pageData: {
                    pageNum: 1,
                    pageSize: 10,
                },
            }
        },
        created() {
            this.$store.dispatch('projectMyProjects').then((data) => {
                this.list=data.list
            })
        },
        methods: {
            getData(){
                this.$store.dispatch('projectMyProjects', this.pageData).then((data) => {
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
            send(){
                if(this.checkList.length == 0){
                    this.Toast({
                        message: '请选择要发送的项目和职位',
                        position: 'bottom',
                        duration: 3000
                    });
                    return;
                }
                let params = {};
                params.receiverUserIds = this.$route.query.userId;
                params.projectId = this.projectId;
                params.jobIds = this.checkList.join(',');
                this.$router.push({name: 'confirmInvitation', query:params});
            },
            goNext() {
                this.$router.push({name: 'loginIdentity'})
            },
            loadBottom() {
                this.pageData.pageNum++;
                this.getData()
            },
            chechboxOpenAll(type, val, id) {
                console.log(type)
                this.dataOperation(id);
                if (!type) {
                    for (var item of this.dictsBusinessArea[val].dicts) {
                        if (this.businessArea.indexOf(item.id) < 0) {
                            this.businessArea.push(item.id)
                        }
                    }
                } else {
                    for (var item of this.dictsBusinessArea[val].dicts) {
                        if (!(this.businessArea.indexOf(item.id) < 0)){
                            this.businessArea.splice(this.businessArea.indexOf(item.id), 1)
                        }
                    }
                }
                this.$set(this.businessIndex,val,!type)
            },
            dataOperation(id){
                if (!(this.businessArea.indexOf(id) < 0)){
                    this.businessArea.splice(this.businessArea.indexOf(id), 1)
                }else {
                    this.businessArea.push(id)
                }
            },
            handleChange(id){
                if(id){
                    this.checkList=[];
                    this.projectId=id;
                    this.$store.dispatch('projectPidDetails',id).then((data)=>{
                        this.jobs=data.jobs
                    })
                }else {
                    this.projectId=null;
                }
            },
            handleChange1(id){

            },

        }
    }
</script>
<style scoped>
    .back {

    }
</style>
