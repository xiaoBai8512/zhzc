<template>
    <div class="body bodyMin expertsDetails invitationDetails">
        <laypage class="expertsDetails_laypage">
            <div class="expertsDetails_con">
                <div class="expertsDetails_con_box" v-if="details">
                    <svg-icon class="svg-icon_a" icon-class="a"/>
                    <svg-icon class="svg-icon-status" v-if="details.reciverStatus==1" icon-class="ycj"/>
                    <img class="logo" :src="details.sender.logo | imgUrl" alt="">
                    <h5 class="title">
                        {{details.sender.fullname}}
                        <svg-icon class="svg-icon_vip" icon-class="vip" v-if="details.sender.isVip"></svg-icon>
                    </h5>
                    <tab class="tab_class" :custom-bar-width="'1.486rem'" :line-width="4" active-color="#3399ff">
                        <tab-item :selected="index==1" @on-item-click="index=1">项目信息</tab-item>
                        <tab-item :selected="index==2" @on-item-click="index=2">职位信息</tab-item>
                    </tab>
                    <template v-if="index==1">
                        <div class="tab_con">
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
                                <button v-if="!!!item.status" @click="undertake(item.id)">
                                    <svg-icon icon-class="yhz_icon_open"></svg-icon>
                                    承接
                                </button>
                                <button v-else style="color:#3399ff;">
                                    <svg-icon icon-class="yhz_icon"></svg-icon>
                                    已承接
                                </button>

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

                </div>

            </div>
            <div class="expertsDetails_foot">
                <button class="HH_Button_Grey" @click="del">删除</button>
                <button class="HH_Button_Bull" @click="call">立即联系</button>
            </div>

            <!-- <mt-popup v-model="popupVisible2" class="popupYaoqing" popup-transition="popup-fade" position="bottom">
                <ul>
                    <li @click="$router.push({name:'newProject', query:{userId:details.userId}})">
                        <i class="el-icon-plus"></i> 新建项目
                    </li>
                    <li @click="$router.push({name:'selectProject',query:{userId:details.userId}})">
                        选择已有项目
                    </li>
                    <li @click="popupVisible2=false">
                        取消
                    </li>
                </ul>
            </mt-popup>
            <Prepare v-if="popupVisible2" v-model="popupVisible2" :id="id" @callBack="callBack()"></Prepare> -->
        </laypage>
    </div>
</template>

<script>
    export default {
        name: 'invitationDetails',
        data() {
            return {
                index:1,
                details:null,
                show1:true,
            }
        },
        created() {
            this.$store.dispatch('inviteGetInvitation',{id:this.$route.query.id}).then((data)=>{
                this.details = data;
            })
        },
        methods: {
            undertake(val){
                this.$store.dispatch('inviteExpertUndertake',{invitation_id:this.$route.query.id,invitation_job_id:val}).then((data)=>{
                    this.$store.dispatch('inviteGetInvitation',{id:this.$route.query.id}).then((data)=>{
                        this.details=data;
                    })
                })
            },
            call(){
                window.location.href = "tel:" + this.details.contactMobile;
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
            }
        }
    }
</script>
<style scoped>
    .back {

    }
</style>
