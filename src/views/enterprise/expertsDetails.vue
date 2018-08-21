<template>
    <div class="body bodyMin expertsDetails">
        <laypage class="expertsDetails_laypage">
            <div class="expertsDetails_con" v-if="details">
                <div class="expertsDetails_con_tit">
                    <h3 class="HH_Title">
                        个人信息
                    </h3>
                    <button type="text" v-if="!!details.isFav" @click="favorite">
                        <svg-icon icon-class="yishoucang"></svg-icon>
                        已收藏
                    </button>
                    <button type="text" v-else @click="favorite">
                        <svg-icon icon-class="shoucang"></svg-icon>
                        收藏
                    </button>
                    <button type="text" v-if="!!details.isPrepare" @click="onPrepare">
                        <svg-icon icon-class="xuanzhong"></svg-icon>已备选
                    </button>
                    <button type="text" v-else @click="onPrepare">
                        <svg-icon icon-class="weixuan"></svg-icon>备选
                    </button>
                </div>

                <div class=" men">
                    <div class="men_1">
                        <img class="logo" :src="details.avatar | imgUrl" alt="">
                        <div class="men_1_con">
                            <h5 class="HH_Grow HH_ellipsis">
                                {{details.isAnonymous ==0 ? details.realname : details.nickname}}
                                <span class="rz" v-if="details.isCertification==1">认证</span>
                                <span v-if="details.type==2">专家</span>
                                <span v-if="details.type==1">实习生</span>
                            </h5>
                            <div  class="men_1_con_bottom">
                                <svg-icon icon-class="nv" v-if="details.gender==2"></svg-icon>
                                <svg-icon icon-class="nan" v-if="details.gender==1"></svg-icon>
                                <span>{{details.age}}岁</span>
                                <svg-icon icon-class="adds"></svg-icon>
                                <span v-if="details.type==2">{{details.city_name}}</span>
                                <span v-else>学校所在地：{{details.city_name}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="men_2">
                        <template v-if="details.type==2">
                            <p>
                                最高学历：<span>{{details.highestEducation}}</span>
                            </p>
                            <p>
                                所学专业：<span>{{details.specialty}}</span>
                            </p>
                        </template>
                        <template v-else>
                            <p>
                                在读学历：<span>{{details.highestEducation}}</span>
                            </p>
                            <p>
                                学习经历：
                            </p>
                            <p v-for="item in details.education">
                            <span>
                                {{item.entranceTime | n2t('{y}')}} - {{item.entranceTime | n2t('{y}')}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.school}} - {{item.speciality}}{{!!item.isCurrent ? '&nbsp;&nbsp;&nbsp;&nbsp;现就读' : '&nbsp;&nbsp;&nbsp;&nbsp;曾就读'}}
                            </span>
                            </p>
                        </template>
                    </div>
                </div>
                <h3 class="HH_Title">职业相关</h3>
                <div class="con_2">
                    <template v-if="details.type==2">
                        <p>
                            <span>从业时间：</span>{{details.workTime}}
                        </p>
                        <p>
                            <span>业务领域：</span>
                            <template v-for="item in  details.businessAreaItems">{{item.name}}、</template>
                        </p>
                    </template>
                    <p v-else>
                        <span>实习方向：</span>
                        <template v-for="item in  details.businessAreaItems">{{item.name}}、</template>
                    </p>
                    <p>
                        <span>执业资格：</span>
                        <template v-for="item in  details.qualificationItems">{{item.qualificationName}}、</template>
                    </p>
                    <p v-if="details.type==2">
                        <span>职称：</span>{{details.titleFirst+'-'+details.titleLast}}
                    </p>
                    <p>
                        <span>是否接受出差：</span>{{!!details.businessTrip ? '是' : '否'}}
                    </p>
                    <p>
                        <span>熟悉行业：</span>
                        <template v-for="item in  details.industryItems">{{item.name}}、</template>
                    </p>

                </div>
            </div>
            <div class="expertsDetails_foot" v-if="showSendBtn">
                <button class="HH_Button_Bull" @click="$router.replace({name:'selectProject',query:{userId:details.userId}})">发送邀请</button>
            </div>
            <Prepare v-if="popupVisible2" v-model="popupVisible2" :id="details.userId" @callBack="callBack()" :disabled="details.businessAreaItems"></Prepare>
        </laypage>
    </div>
</template>

<script>
    import Prepare from '../../components/Prepare'

    export default {
        name: 'Login',
        components:{Prepare},
        data() {
            return {
                details:null,
                formData:{
                    "favType": 1,
                    "favUserId": this.$route.query.userId
                },
                id:null,
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
                switch1: false,
                id: 0,
                showSendBtn: true,
                getBarWidth: function (index) {
                    if (index == 3) {
                        return (4) * 0.386 + 'rem'
                    } else {
                        return (2) * 0.386 + 'rem'
                    }


                }
            }
        },
        created() {
            this.$store.dispatch('getDicts',{code: ['business_area','qualification','industries']}).then((data) => {
                this.dictsBusinessArea = data.business_area;
                this.disctQualification = data.qualification;
                this.disctIndustries = data.industries;
            })
            this.showSendBtn = this.$route.query.inInvite == 1 ? false : true;
            this.$store.dispatch('expertInfo',this.$route.query.userId).then((data)=>{
                this.details = data;
                this.formData.favType=data.type;
            })
        },
        methods: {
            favorite(){
                let self = this;
                this.$store.dispatch('favoritefFavUser',this.formData).then((data)=>{
                    self.details.isFav = self.details.isFav == 1 ? 0 : 1;
                })
            },
            onPrepare(){
                if(this.details.isPrepare == 0){
                    this.popupVisible2 = true;
                }else{
                    this.$store.dispatch('preparePrepareUser',{prepareUserId: this.details.userId}).then((data)=>{
                        this.details.isPrepare = 0;
                    });
                }
            },
            callBack(){
                this.details.isPrepare=1;
            },
            goNext() {
                this.$router.push({name: 'loginIdentity'})
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

        }
    }
</script>
<style scoped>
    .back {

    }
</style>
