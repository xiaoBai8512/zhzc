<template>
    <div class="body bodyMin expertsDetails invitationDetails">
        <laypage class="expertsDetails_laypage" v-if="details">
            <div class="expertsDetails_con">
                <div class="expertsDetails_con_box">
                    <svg-icon class="svg-icon_a" icon-class="a"/>
                    <svg-icon class="svg-icon-status" icon-class="yhz" v-if="details.receiver.userId == user.id && details.reciverStatus==1"/>
                    <svg-icon class="svg-icon-status" icon-class="yhz" v-if="details.sender.userId == user.id && details.senderStatus == 1"/>
                    <img class="logo" :src="details.sender.logo | imgUrl" alt="">
                    <h5 class="title">
                        {{details.sender.fullname}}
                        <svg-icon class="svg-icon_vip" icon-class="vip" v-if="details.sender.isVip"></svg-icon>
                    </h5>
                    <tab class="tab_class" :custom-bar-width="'1.486rem'" :line-width="4" active-color="#3399ff">
                        <tab-item :selected="index==1" @on-item-click="index=1">邀请函</tab-item>
                        <tab-item :selected="index==2" @on-item-click="index=2" v-if="details.receiver.userId == user.id">公司信息</tab-item>
                        <tab-item :selected="index==3" @on-item-click="index=3" v-if="details.sender.userId == user.id">机构信息</tab-item>
                    </tab>
                    <template v-if="index==1">
                        <div class="tab_con_box">
                            <div class="tab_con">
                                <h5 class="tc yqhTit">{{details.title}}</h5>
                                <p>{{details.content}}</p>
                                <p class="clearfix"><span class="fr">{{details.sendTime | n2t('{y}.{m}.{d}')}}</span></p>
                            </div>
                            <div class="tab_foot">
                                声明：本邀请内容为发送邀请的用户自行撰写发出，不代
                                表本平台的意愿，请您自行斟酌联系，确定合作关系，本平台
                                建议合作需要签订正式的合作协议。如产生一切后果与相关
                                法律责任，均由发送邀请用户承担，与本平台无关，特此声明。
                            </div>
                        </div>
                    </template>
                    <template v-if="index==2">
                        <div class="tab_con_box">
                            <div class="tab_con">
                                <p>所在地：  <span>{{details.sender.province_name+'-'+details.sender.city_name}}</span></p>
                                <p>联系人：  <span>{{details.contact}}</span></p>
                                <p>联系电话：  <span class="colorBluer">{{details.contactMobile}}</span></p>
                                <p>企业简介：</p>
                                <p>
                                    <span>{{details.sender.introduction}}</span>
                                </p>
                            </div>
                        </div>
                    </template>
                    <template v-if="index==3">
                        <div class="tab_con_box">
                            <div class="men">
                                <div class="men_1">
                                    <img class="logo1" :src="details.receiver.logo | imgUrl" alt="">
                                    <div class="men_1_con f-j-c">
                                        <h5 class="HH_Grow HH_ellipsis">
                                            {{details.receiver.fullname}}
                                            <!-- <span class="rz" v-if="details.receiver.isCertification==1">认证</span> -->
                                            <!-- <svg-icon icon-class="vip" v-if="details.receiver.isVip"></svg-icon> -->
                                        </h5>
                                    </div>
                                </div>
                                <div class="men_2">
                                    <p>
                                        所在地：<span>{{details.receiver.province_name}} - {{details.receiver.city_name}}</span>
                                    </p>
                                    <p>
                                        机构类别：<span v-for="item in details.receiver.organizationTypeItems">{{item.name}}&nbsp;</span>
                                    </p>
                                    <p>机构简介：</p>
                                    <p><span>{{details.receiver.introduction}}</span></p>
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
                <button class="HH_Button_Bull" @click="confirmCooperation">{{details.senderStatus == 0? "合作" : "取消合作"}}</button>
            </div>
        </laypage>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: 'invitationDetails',
        computed: {
            ...mapGetters(['type','user'])
        },
        data() {
            return {
                index:1,
                details:null,
                show1:true,
                formData:{
                    "receiverUserId": this.$route.query.userId,
                    "title": null,
                    "content": null,
                    "contact": null,
                    "contactMobile": null,
                    "attachment": null
                },
            }
        },
        created() {
            this.$store.dispatch('getEnterpriseInvitation',{id:this.$route.query.id}).then((data)=>{
                this.details = data;
                // console.log(data);
            })
        },
        methods: {
            confirmCooperation(){
                if(this.details.sender.userId != this.user.id){
                    return;
                }
                this.$store.dispatch('confirmCooperationToEnterprise',{invitation_id:this.details.id}).then((data)=>{
                    this.details.senderStatus = this.details.senderStatus == 1 ? 0 :1;
                });
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
                        this.$store.dispatch('delEntInvitation',{id:this.details.id}).then((data)=>{
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
