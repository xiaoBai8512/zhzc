<template>
    <div class="body bodyMin expertsDetails invitationDetails">
        <laypage class="expertsDetails_laypage">
            <div class="expertsDetails_con">
                <div class="expertsDetails_con_box" v-if="details">
                    <svg-icon class="svg-icon_a" icon-class="a"/>
                    <!-- <svg-icon class="svg-icon_yhz" icon-class="ycj" v-if="details.reciverStatus==1 && type==1 || type==2"/> -->
                    <svg-icon class="svg-icon-status" icon-class="yhz" v-if="details.sender.senderStatus && details.sender.senderStatus==1"/>
                    <img class="logo" :src="details.sender.logo | imgUrl" alt="">
                    <h5 class="title">
                        {{details.sender.fullname}}
                        <svg-icon class="svg-icon_vip" icon-class="vip" v-if="details.sender.isVip"></svg-icon>
                    </h5>
                    <template v-if="$route.query.type!='Inv'">
                        <tab class="tab_class" :custom-bar-width="'1.486rem'" :line-width="4" active-color="#3399ff">
                            <tab-item :selected="index==1" @on-item-click="index=1">项目信息</tab-item>
                            <tab-item :selected="index==2" @on-item-click="index=2">职位信息</tab-item>
                        </tab>
                        <template v-if="index==1">
                            <div class="tab_con">
                                <p>项目名称：  <span>{{details.projectName}}</span></p>
                                <p>项目时间：  <span>{{details.startTime | n2t('{y}.{m}.{d}')}} - {{details.endTime | n2t('{y}.{m}.{d}')}}</span></p>
                                <p>项目所在地：  <span>{{details.province_name+'-'+details.city_name+'-'+details.district_name}}</span></p>
                                <p>项目所属行业：  <span>{{details.industry_name}}</span></p>
                                <p>联系人：  <span>{{details.contact}}</span></p>
                                <p>联系电话：  <span class="colorBluer">{{details.contactMobile}}</span></p>
                            </div>
                            <div class="tab_footer">
                                声明：本邀请内容为发送邀请的用户自行撰写发出，不代
                                表本平台的意愿，请您自行斟酌联系，确定合作关系，本平台
                                建议合作需要签订正式的合作协议。如产生一切后果与相关
                                法律责任，均由发送邀请用户承担，与本平台无关，特此声明。
                            </div>
                        </template>
                        <template v-else>
                            <div class="tab_con_box">
                                <div class="tab_con" v-for="(item, index) in details.jobs">
                                    <!-- <button v-if="!!!item.status" @click="undertake(item.id)">
                                        <svg-icon icon-class="yhz_icon_open"></svg-icon>
                                        承接
                                    </button>
                                    <button v-else style="color:#3399ff;">
                                        <svg-icon icon-class="yhz_icon"></svg-icon>
                                        已承接
                                    </button> -->

                                    <p>职位名称：  <span>{{item.jobName}}</span></p>
                                    <p>薪资：  <span class="money" v-if="item.salaryNegotiated==0">{{item.salary}} 元/天</span><span class="money" v-else>面议</span></p>
                                    <p>是否需要出差：  <span>{{item.businessTrip == 0 ? '否' : '是'}}</span></p>
                                    <p>工作内容：</p>
                                    <p><span>{{item.content}}</span></p>
                                    <p>工作要求：</p>
                                    <p><span>{{item.requirement}}</span></p>
                                    <hr v-if="index!=details.jobs.length-1">
                                </div>
                                <div class="tab_foot">
                                    声明：本邀请内容为发送邀请的用户自行撰写发出，不代
                                    表本平台的意愿，请您自行斟酌联系，确定合作关系，本平台
                                    建议合作需要签订正式的合作协议。如产生一切后果与相关
                                    法律责任，均由发送邀请用户承担，与本平台无关，特此声明。
                                </div>
                            </div>
                        </template>
                    </template>
                    <template v-else>
                        <tab class="tab_class" :custom-bar-width="'1.486rem'" :line-width="4" active-color="#3399ff">
                            <tab-item :selected="index==1" @on-item-click="index=1">邀请函</tab-item>
                            <tab-item :selected="index==2" @on-item-click="index=2">公司信息</tab-item>
                        </tab>
                        <template v-if="index==1">
                            <div class="tab_con">
                                <h5 class="tc yqhTit">{{details.title}}</h5>
                                <p>{{details.content}}</p>
                                <p><span class="fr yqhTime">{{details.sendTime | n2t('{y}.{m}.{d}')}}</span></p>

                            </div>
                            <div class="tab_footer">
                                声明：本邀请内容为发送邀请的用户自行撰写发出，不代
                                表本平台的意愿，请您自行斟酌联系，确定合作关系，本平台
                                建议合作需要签订正式的合作协议。如产生一切后果与相关
                                法律责任，均由发送邀请用户承担，与本平台无关，特此声明。
                            </div>
                        </template>
                        <template v-else>
                            <div class="tab_con_box">
                                <div class="tab_con">
                                    <p>公司所在地：  <span>{{details.receiver.province_name+'-'+details.receiver.city_name+'-'+details.receiver.district_name}}</span></p>
                                    <p>联系人：  <span>{{details.contact}}</span></p>
                                    <p>联系电话：  <span class="colorBluer">{{details.contactMobile}}</span></p>
                                </div>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
            <div class="expertsDetails_foot" v-if="$route.query.type!='Inv'">
                <button class="HH_Button_Grey" @click="del">删除</button>
                <button class="HH_Button_Bull" @click="confirmCooperation">{{details.sender && details.sender.senderStatus == 0?"合作":"取消合作"}}</button>
            </div>
            <div class="expertsDetails_foot" v-else>
                <button class="HH_Button_Grey" @click="delEntInvitation">删除</button>
                <button class="HH_Button_Bull" @click="confirmEnterpriseCooperation">{{details.sender && details.sender.senderStatus == 0?"合作":"取消合作"}}</button>
            </div>
        </laypage>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        computed: {
            ...mapGetters(['type'])
        },
        name: 'invitationDetails',
        data() {
            return {
                index:1,
                details:null,
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getData(formData){
                if(this.$route.query.type=='Inv'){
                    console.log(this.$route.query.id)
                    this.$store.dispatch('getEnterpriseInvitation',{id:this.$route.query.id}).then((data)=>{
                        this.details=data;
                    })
                }else {
                    this.$store.dispatch('inviteGetInvitation',{id:this.$route.query.id}).then((data)=>{
                        this.details=data;
                    })
                }
            },
            confirmCooperation(){
                let self = this;
                this.$store.dispatch('confirmCooperationToExpert',{invitation_id:this.details.id}).then((data)=>{
                    self.details.senderStatus = self.details.senderStatus == 1 ? 0 :1;
                });
            },
            del(){
                this.MessageBox({
                    title: '',
                    message: '确认要删除该邀请?',
                    showCancelButton: true,
                }).then((data)=>{
                    if(data == 'confirm'){
                        this.$store.dispatch('delInvitation',{id:this.details.id}).then((data)=>{
                            this.$router.back();
                        });
                    }else {

                    }
                })
            },
            confirmEnterpriseCooperation(){
                let self = this;
                this.$store.dispatch('confirmCooperationToEnterprise',{invitation_id:this.details.id}).then((data)=>{
                    self.details.senderStatus = self.details.senderStatus == 1 ? 0 :1;
                });
            },
            delEntInvitation(){
                this.MessageBox({
                    title: '',
                    message: '确认要删除该邀请?',
                    showCancelButton: true,
                }).then((data)=>{
                    if(data == 'confirm'){
                        this.$store.dispatch('delEntInvitation',{id:this.details.id}).then((data)=>{
                            this.$router.back();
                        });
                    }else {

                    }
                })
            },
        }
    }
</script>
<style scoped>
    .back {

    }
</style>
