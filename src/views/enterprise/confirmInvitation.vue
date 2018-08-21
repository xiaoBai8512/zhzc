<template>
    <div class="body enterprise">
        <laypage class="flexLaypage">
            <div class="flexCon">
                <div class="HH_layer con_4" v-if="users">
                    <h3 class="HH_Title">被邀请人</h3>
                    <ExpertItem :item="item" :showOp="false" :inInvite="1" :index="index" v-for="(item, index) in users" :key="index"></ExpertItem>
                    <!-- <div class="HH_List men">
                        <div class="men_1">
                            <img class="logo" src="../../assets/image/business_license.png" alt="">
                            <div class="men_1_con">
                                <h5 class="HH_Grow HH_ellipsis">刘教授
                                    <svg-icon icon-class="renzheng"></svg-icon>
                                </h5>
                                <div class="men_1_con_bottom">
                                    <svg-icon icon-class="nv"></svg-icon>
                                    <span>38岁</span>
                                    <svg-icon icon-class="adds"></svg-icon>
                                    <span>北京</span>
                                    <svg-icon icon-class="bao"></svg-icon>
                                    <span>接受出差</span>
                                </div>
                            </div>
                        </div>
                        <div class="men_2">
                            <p class="coll">业务领域：资产评估 税务咨询</p>
                            <svg-icon icon-class="bao"></svg-icon>
                            <svg-icon icon-class="bao"></svg-icon>
                            <svg-icon icon-class="bao"></svg-icon>
                        </div>
                    </div> -->
                </div>
                <div class="HH_layer con_2" v-if="project">
                    <h3 class="HH_Title">项目信息</h3>
                    <div class="pSpanList b_bottom_1">
                        <p><span>项目名称：</span>{{project.projectName}}</p>
                        <p><span>项目时间：</span>{{project.startTime | n2t('{y}.{m}.{d}')}} - {{project.endTime | n2t('{y}.{m}.{d}')}}</p>
                        <p><span>项目所在地：</span>{{project.province_name+'-'+project.city_name+'-'+project.district_name}}</p>
                        <p><span>项目所属行业：</span>{{project.industry_name}}</p>
                        <p><span>联系人：</span>{{project.contact}}</p>
                        <p><span>联系电话：</span>{{project.contactMobile}}</p>
                    </div>
                    <h3 class="HH_Title">职位信息</h3>
                    <div class="pSpanList" v-if="params.jobIds.indexOf(job.id) >= 0" v-for="(job, index) in project.jobs" :key="index">
                        <p><span>职位名称： </span>{{job.jobName}}</p>
                        <p v-if="!!job.salaryNegotiated"><span>薪资：</span>面议</p>
                        <p v-else  class="money"><span>薪资：</span>{{job.salary}}元/天</p>
                        <p><span>是否需要出差： </span>{{!!job.businessTrip ? '是' : '否'}}</p>
                        <p><span>工作内容：</span></p>
                        <p>{{job.content}}</p>
                        <p><span>工作要求：</span></p>
                        <p>{{job.requirement}}</p>
                    </div>
                </div>
            </div>
            <div class="flexFooter tc">
                <button class="HH_Button_Bull" @click="submit">确认发送</button>
            </div>
        </laypage>
    </div>
</template>

<script>
    import {MessageBox} from 'mint-ui'
    import ExpertItem from '../../components/expert/ExpertItem'

    export default {
        name: 'ConfirmInvitation',
        components:{ExpertItem},
        data() {
            return {
                params: {},
                project: null,
                users: null,
            }
        },
        created() {
            this.params = this.$route.query;
            this.$store.dispatch('projectPidDetails', this.params.projectId).then((data) => {
                // console.log(data);
                this.project = data;
            });
            this.$store.dispatch('getExpertList', {"uids":this.params.receiverUserIds}).then((data) => {
                this.users = data;
            });
            
        },
        methods: {
            submit(){
                var reqdata = {};
                reqdata['receiverUserIds'] = String(this.params.receiverUserIds).split(',');
                reqdata['projectId'] = this.params.projectId;
                reqdata['jobIds'] = String(this.params.jobIds).split(',');
                this.$store.dispatch('inviteExpert', reqdata).then((data)=>{
                    MessageBox({
                        title: '',
                        message: '邀请发送成功，请耐心等待对方与您电话联系。',
                        confirmButtonText: '知道了',
                    }).then(action => {
                        this.$router.replace({name:"yaoInvitation",query:{"send":"TO_EXPERT"}});
                    });
                });
            },
        }
    }
</script>
<style scoped>
    .back {

    }
</style>
