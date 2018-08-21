<template>
    <div class="body bodyMin expertsDetails">
        <laypage class="expertsDetails_laypage">
            <div class="expertsDetails_con" v-if="detail">
                <div class="expertsDetails_con_tit">
                    <h3 class="HH_Title">
                        机构信息
                    </h3>
                    <button type="text" v-if="!!detail.isFav" @click="favorite(false)">
                        <svg-icon icon-class="yishoucang"></svg-icon>
                        已收藏
                    </button>
                    <button type="text" v-else @click="favorite(true)">
                        <svg-icon icon-class="shoucang"></svg-icon>
                        收藏
                    </button>
                    <button type="text" v-if="!!detail.isPrepare" @click.stop="onPrepare">
                        <svg-icon icon-class="xuanzhong"></svg-icon>已备选
                    </button>
                    <button type="text" v-else @click.stop="onPrepare">
                        <svg-icon icon-class="weixuan"></svg-icon>备选
                    </button>
                </div>

                <div class="men">
                    <div class="men_1">
                        <img class="logo" :src="detail.logo | imgUrl" alt="">
                        <div class="men_1_con f-j-c">
                            <h5 class="HH_Grow">
                                {{detail.fullname}}
                                <svg-icon icon-class="vip" v-if="detail.isVip"></svg-icon>
                            </h5>
                        </div>
                    </div>
                    <div class="men_2">
                        <p>
                            所在地：<span>{{detail.city_name}}</span>
                        </p>
                        <p>
                            机构类别：<span v-for="item in detail.organizationTypeItems">{{item.name}}&nbsp;</span>
                            <!--<template >{{item.name}}、</template>-->
                        </p>
                        <p v-if="type == 3">
                            联系人：<span>{{detail.contact}}</span>
                        </p>
                        <p v-if="type == 3">
                            联系电话：<span>{{detail.contactMobile}}</span>
                        </p>
                    </div>
                </div>
                <h3 class="HH_Title">企业简介</h3>
                <div class="con_2">
                    <p class="qyjj">
                        {{detail.introduction}}
                    </p>
                </div>
            </div>
            <div class="expertsDetails_foot">
                <button class="HH_Button_Bull" @click="call" v-if="type==3">立即联系</button>
                <button class="HH_Button_Bull"  @click="popupVisible1=true" v-else>发送邀请</button>
            </div>
            <mt-popup
                    v-model="popupVisible1">
                <div class="invitationDetailsMack">
                    <div>
                        <div class="title_input_box">
                            <input v-model="formData.title"  type="text" class="title_input" placeholder="编辑合作邀请函标题"></input>
                        </div>
                        <el-input v-model="formData.content"  type="textarea" class="textareaClass"></el-input>
                        <span class="miaoshu">不超过500个中文字符</span>
                        <el-input v-model="formData.contact"  type="text" class="inputClass" placeholder="联系人姓名"></el-input>
                        <el-input v-model="formData.contactMobile" type="text" class="inputClass" placeholder="联系人电话"></el-input>
                        <span class="miaoshu">请输入连续数字号码（例：18819087098 或 0108668566）</span>
                        <b>附件</b>
                        <button class="imgButton" @click="upImg">
                            <img :src="formData.attachment | imgUrl" alt="" v-if="formData.attachment">
                            <svg-icon icon-class="add" v-else></svg-icon>
                        </button>
                    </div>
                    <div class="tc">
                        <button size="large" class="HH_Button_Grey" @click="popupVisible1=false;">
                            取消
                        </button>
                        <button size="large" class="HH_Button_Bull" @click="SendInvitation">
                            确 定
                        </button>
                    </div>
                </div>
            </mt-popup>

            <Prepare v-if="popupVisible2" v-model="popupVisible2" :id="id" @callBack="PrepareCallBack()" type="3" :disabled="detail.organizationTypeItems"></Prepare>

        </laypage>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Prepare from '../../components/Prepare'

    export default {
        name: 'Login',
        components:{Prepare},
        computed:{
            ...mapGetters(['type'])
        },
        data() {
            let textContent = "尊敬的（机构公司名称），您好！\n\t我公司因（项目名称）需要，邀请贵公司为我们提供（类型）服务，服务期限为（项目时间）。\n\t如贵公司有此意向请与我们联系，进一步商议合作事宜，如贵公司无此意向，请忽略本邀请。"
            return {
                detail:null,
                popupVisible1:false,
                popupVisible2: false,
                id:null,
                formData:{
                    "receiverUserId": this.$route.query.userId,
                    "title": null,
                    "content": textContent,
                    "contact": null,
                    "contactMobile": null,
                    "attachment": null
                },
            }
        },
        created() {
            document.title = this.$store.state.login.type == 3 ? "合作机构详情" : "专业机构详情";
            this.$store.dispatch('weiXinFenXiang')
            this.$store.dispatch('enterpriseDetail',this.$route.query.userId).then((data)=>{
                this.detail=data;
                this.id = this.detail.userId;
            })
        },
        methods: {
            upImg(){
                this.$store.dispatch('upImg').then((data)=>{
                    // this.formInline.attachment=data.path;
                    // this.attachment=data.url;
                    this.formData.attachment=data.path;
                    this.attachment=data.url;
                })
            },
            SendInvitation(type){
                this.$store.dispatch('inviteEnterprise',this.formData).then(data=>{
                    this.popupVisible1=false;
                    this.Toast({
                        message: '邀请成功',
                        position: 'bottom',
                        duration: 2000
                    })
                })
            },
            onPrepare(){
                if(this.detail.isPrepare == 0){
                    this.popupVisible2 = true;
                }else{
                    this.$store.dispatch('preparePrepareUser',{prepareUserId: this.detail.userId}).then((data)=>{
                        this.detail.isPrepare = 0;
                    });
                }
            },
            PrepareCallBack(){
                this.detail.isPrepare = 1;
            },
            favorite(type){
                this.$store.dispatch('favoriteFavUser',{
                    "favUserId" : this.detail.userId
                }).then((data)=>{
                    if(type){
                        this.detail.isFav=1
                    }else {
                        this.detail.isFav=0
                    }

                })
            },
            call(){
                window.location.href = "tel:" + this.detail.contactMobile;
            },
        }
    }
</script>
<style scoped>
    .back {

    }
</style>
