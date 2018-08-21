<template>
    <div class="body bodyMin expertsDetails invitationDetails">
        <laypage class="expertsDetails_laypage" v-if="details">
            <div class="expertsDetails_con">
                <div class="expertsDetails_con_box">
                    <svg-icon class="svg-icon_a" icon-class="a"/>
                    <svg-icon class="svg-icon-status" icon-class="ycj"
                              v-if="details.receiver.userId == user.id && details.reciverStatus==1"/>
                    <svg-icon class="svg-icon-status" icon-class="yhz"
                              v-if="details.sender.userId == user.id && details.senderStatus == 1"/>
                    <img class="logo" :src="details.sender.logo | imgUrl" alt="">
                    <h5 class="title">
                        {{details.sender.fullname}}
                        <svg-icon class="svg-icon_vip" icon-class="vip" v-if="details.sender.isVip"></svg-icon>
                    </h5>
                    <tab class="tab_class" :custom-bar-width="'1.486rem'" :line-width="4" active-color="#3399ff">
                        <tab-item :selected="index==1" @on-item-click="index=1">项目信息</tab-item>
                        <tab-item :selected="index==2" @on-item-click="index=2">职位信息</tab-item>
                        <tab-item :selected="index==3" @on-item-click="index=3"
                                  v-if="details.receiver.userId == user.id">企业信息
                        </tab-item>
                        <tab-item :selected="index==4" @on-item-click="index=4" v-if="details.sender.userId == user.id">
                            专家信息
                        </tab-item>
                    </tab>
                    <template v-if="index==1">
                        <div class="tab_con">
                            <p>项目时间： <span>{{details.startTime | n2t('{y}.{m}.{d}')}} - {{details.endTime | n2t('{y}.{m}.{d}')}}</span>
                            </p>
                            <p>项目所在地：
                                <span>{{details.province_name+'-'+details.city_name+'-'+details.district_name}}</span>
                            </p>
                            <p>项目所属行业： <span>{{details.industry_name}}</span></p>
                            <p>联系人： <span>{{details.contact}}</span></p>
                            <p>联系电话： <span class="colorBluer">{{details.contactMobile}}</span></p>
                        </div>
                        <div class="tab_footer">
                            声明：本邀请内容为发送邀请的用户自行撰写发出，不代
                            表本平台的意愿，请您自行斟酌联系，确定合作关系，本平台
                            建议合作需要签订正式的合作协议。如产生一切后果与相关
                            法律责任，均由发送邀请用户承担，与本平台无关，特此声明。
                        </div>
                    </template>
                    <template v-if="index==2">
                        <div class="tab_con_box">
                            <div class="tab_con" v-for="(item, index) in details.jobs">
                                <button v-if="!!!item.status" @click="undertake(item.id)">
                                    <svg-icon icon-class="yhz_icon_open"></svg-icon>
                                    承接
                                </button>
                                <button v-else style="color:#3399ff;" @click="undertake(item.id)">
                                    <svg-icon icon-class="yhz_icon"></svg-icon>
                                    已承接
                                </button>
                                <p>职位名称： <span>{{item.jobName}}</span></p>
                                <p>薪资： <span class="money"
                                             v-if="item.salaryNegotiated==0">{{item.salary}} 元/天</span><span
                                    class="money" v-else>面议</span></p>
                                <p>是否需要出差： <span>{{item.businessTrip == 0 ? '否' : '是'}}</span></p>
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
                    <template v-if="index==3">
                        <div class="tab_con"  v-if="details && details.sender">
                            <p>所在地： <span>{{details.sender.province_name+'-'+details.sender.city_name+'-'+details.sender.district_name}}</span>
                            </p>
                            <p>简介：
                                <span>{{details.sender.introduction}}</span>
                            </p>
                        </div>
                    </template>
                    <template v-if="index==4">
                        <div class="tab_con_box">
                            <div class=" men" v-if="details && details.receiver">
                                <div class="men_1">
                                    <img class="logo1" :src="details.receiver.avatar | imgUrl" alt="">
                                    <div class="men_1_con">
                                        <h5 class="HH_Grow HH_ellipsis">
                                            {{details.isAnonymous ==0 ? details.receiver.realname : details.receiver.nickname}}
                                            <span class="rz" v-if="details.receiver.isCertification==1">认证</span>
                                            <span v-if="details.type==2">专家</span>
                                            <span v-if="details.type==1">实习生</span>
                                        </h5>
                                        <div class="men_1_con_bottom">
                                            <svg-icon icon-class="nv" v-if="details.receiver.gender==2"></svg-icon>
                                            <svg-icon icon-class="nan" v-if="details.receiver.gender==1"></svg-icon>
                                            <span>{{details.receiver.age}}岁</span>
                                            <svg-icon icon-class="adds"></svg-icon>
                                            <span v-if="details.receiver.type==2">{{details.receiver.city_name}}</span>
                                            <span v-else>学校所在地：{{details.receiver.city_name}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="men_2">
                                    <template v-if="details.receiver.type==2">
                                        <p>
                                            最高学历：<span>{{details.receiver.highestEducation}}</span>
                                        </p>
                                        <p>
                                            所学专业：<span>{{details.receiver.specialty}}</span>
                                        </p>
                                    </template>
                                    <template v-else>
                                        <p>
                                            在读学历：<span>{{details.receiver.highestEducation}}</span>
                                        </p>
                                        <p>
                                            学习经历：
                                        </p>
                                        <p v-for="item in details.receiver.education">
                                            <span>
                                                {{item.entranceTime | n2t('{y}')}} - {{item.entranceTime | n2t('{y}')}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.school}} - {{item.speciality}}{{!!item.isCurrent ? '&nbsp;&nbsp;&nbsp;&nbsp;现就读' : '&nbsp;&nbsp;&nbsp;&nbsp;曾就读'}}
                                            </span>
                                        </p>
                                    </template>
                                </div>
                                <div class="con_2">
                                    <template v-if="details.receiver.type==2">
                                        <p>
                                            <span>从业时间：</span>{{details.receiver.workTime}}
                                        </p>
                                        <p>
                                            <span>业务领域：</span>
                                            <template v-for="item in  details.receiver.businessAreaItems">{{item.name}}、</template>
                                        </p>
                                    </template>
                                    <p v-else>
                                        <span>实习方向：</span>
                                        <template v-for="item in  details.receiver.businessAreaItems">{{item.name}}、</template>
                                    </p>
                                    <p>
                                        <span>执业资格：</span>
                                        <template v-for="item in  details.receiver.qualificationItems">{{item.qualificationName}}、</template>
                                    </p>
                                    <p v-if="details.receiver.type==2">
                                        <span>职称：</span>{{details.receiver.titleFirst+'-'+details.receiver.titleLast}}
                                    </p>
                                    <p>
                                        <span>是否接受出差：</span>{{!!details.receiver.businessTrip ? '是' : '否'}}
                                    </p>
                                    <p>
                                        <span>熟悉行业：</span>
                                        <template v-for="item in  details.receiver.industryItems">{{item.name}}、</template>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </template>
                </div>

            </div>
            <div class="expertsDetails_foot" v-if="details.receiver.userId == user.id">
                <button class="HH_Button_Grey" @click="del">删除</button>
                <button class="HH_Button_Bull" @click="call">立即联系</button>
            </div>

            <div class="expertsDetails_foot" v-if="details.sender.userId == user.id">
                <button class="HH_Button_Grey" @click="del">删除</button>
                <button class="HH_Button_Bull" @click="confirmCooperation">{{details.senderStatus == 0? "合作" :
                    "取消合作"}}
                </button>
            </div>
        </laypage>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'invitationDetails',
        computed: {
            ...mapGetters(['type', 'user'])
        },
        data() {
            return {
                index: 1,
                details: null,
                show1: true,
            }
        },
        created() {
            this.$store.dispatch('inviteGetInvitation', {id: this.$route.query.id}).then((data) => {
                this.details = data;
                // console.log(data);
            })
        },
        methods: {
            undertake(val) {
                if (this.details.receiver.userId != this.user.id) {
                    return;
                }
                this.$store.dispatch('inviteExpertUndertake', {
                    invitation_id: this.$route.query.id,
                    invitation_job_id: val
                }).then((data) => {
                    this.$store.dispatch('inviteGetInvitation', {id: this.$route.query.id}).then((data) => {
                        this.details = data;
                    })
                })
            },
            confirmCooperation() {
                if (this.details.sender.userId != this.user.id) {
                    return;
                }
                this.$store.dispatch('confirmCooperationToExpert', {invitation_id: this.details.id}).then((data) => {
                    this.details.senderStatus = this.details.senderStatus == 1 ? 0 : 1;
                });
            },
            call() {
                window.location.href = "tel:" + this.details.contactMobile;
            },
            del() {
                this.MessageBox({
                    title: '',
                    message: '确认要删除该邀请?',
                    showCancelButton: true,
                }).then((data) => {
                    if (data == 'confirm') {
                        this.$store.dispatch('delInvitation', {id: this.details.id}).then((data) => {
                            this.$router.back();
                        });
                    } else {

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
