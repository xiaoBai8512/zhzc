<template>
    <div class="body">
        <laypage class="myProject">
            <button slot="right"  @click="$router.push({name:'newProject',query:{userId:$route.query.userId}})" class="xjxm"><i class="el-icon-plus"></i> 添加</button>
            <div class="myProjectCon">
                <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="p_main" :auto-fill="false"
                             v-if="list">
                    <el-card class="box-card" v-for="(item, index) in list" :key="index"  @click.native="details(item.id)">
                        <div slot="header" class="clearfix">
                            <span>{{item.projectName}}</span>
                            <el-button style="float: right; padding: 3px 0" type="text" @click.stop="delProjects(item.id)"><svg-icon icon-class="Del"></svg-icon></el-button>
                        </div>
                        <div class="text item">
                            项目所在地：{{item.province_name+'-'+item.city_name+'-'+item.district_name}}
                        </div>
                        <div class="text item">
                            项目所属行业：{{item.industry_name}}
                        </div>
                        <div class="text item">
                            工作时间：{{item.startTime | n2t('{y}.{m}.{d}')}} - {{item.endTime | n2t('{y}.{m}.{d}')}}
                        </div>
                    </el-card>
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
                list: [],
                allLoaded: false,
                pageData:{
                    pageNum:1,
                    pageSize: 10,
                },
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData(){
                this.$store.dispatch('projectMyProjects', this.pageData).then((data)=>{
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
            pageDataRest(){
                this.pageData={
                    pageNum:1,
                    pageSize: 10,
                }
            },
            delProjects(id){
                this.MessageBox({
                    title: '',
                    message: '确认要删除该项目?',
                    showCancelButton: true,
                }).then((data)=>{
                    if(data=='confirm'){
                        this.Toast({
                            message: '删除成功',
                            position: 'bottom',
                            duration: 2000
                        })
                        this.$store.dispatch('projectProjectsDel',id).then((data)=>{
                            this.pageDataRest();
                            this.getData();
                        })
                    }else {

                    }
                })

            },
            details(id){
                this.$router.push({name:'enterpriseMyProjectDetails',query:{id:id}})
            },
            expert(){
                console.log(this.$route.query.userId)
                this.$store.dispatch('inviteExpert', {receiverUserIds:String(this.$route.query.userId).split(','), projectId:this.projectId, jobIds:this.checkList}).then((data)=>{
                    this.Toast({
                        message: '邀请发送成功',
                        position: 'bottom',
                        duration: 3000
                    })
                })
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
