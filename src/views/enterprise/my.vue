<template>
    <div class="body my">
        <layout>
            <div class="my_header">
                <img :src="user.enterprise.logo | imgUrl" alt="" @click="updateAvatar">
                <h5>{{user.enterprise.fullname}}</h5>
                <!-- <div class="iconClassBog" v-if="!!user.enterprise.isVip">
                    <svg-icon icon-class="button_Bg1"></svg-icon>
                    <button>VIP</button>
                </div> -->
                <span class="sf">{{user.enterprise.type==3 ? '机构' : '企业'}}</span>
                <div class="iconClassBog">
                    <svg-icon icon-class="button_Bg1"></svg-icon>
                    <button @click="$router.push({'name':'enterprisePerfectInfo'})">{{user.enterprise.isCertification | translation('certification')}}</button>
                </div>
            </div>
            <yd-cell-group v-if="type==3">
                <yd-cell-item>
                    <span class="HHCellItem" slot="left">企业备选<i class="red" v-if="!businessAlternative">关闭后企业信息不在企业备选名单中展示。</i></span>
                    <span slot="right">
                        <el-switch v-model="businessAlternative" @change="setBusinessAlternative">
                        </el-switch>
                    </span>
                </yd-cell-item>
                <yd-cell-item>
                    <span class="HHCellItem" slot="left">合作机构<i class="red" v-if="!openCooperation">关闭后企业信息不在合作机构名单中展示。</i></span>
                    <span slot="right">
                        <el-switch v-model="openCooperation" @change="setCooperation">
                        </el-switch>
                    </span>
                </yd-cell-item>
            </yd-cell-group>
            <yd-cell-group>
                <yd-cell-item class="yd-cell-item_arrow"  @click.native="goNext('enterprisePerfectInfo')">
                    <span class="HHCellItem" slot="left"><svg-icon icon-class="my3"></svg-icon>我的资料</span>
                </yd-cell-item>
                <yd-cell-item class="yd-cell-item_arrow" @click.native="goNext('mySet')">
                    <span class="HHCellItem" slot="left"><svg-icon icon-class="my4"></svg-icon>账号设置</span>
                </yd-cell-item>
                <yd-cell-item class="yd-cell-item_arrow" @click.native="goNext('enterpriseMyProject')">
                    <span class="HHCellItem" slot="left"><svg-icon icon-class="my5"></svg-icon>我的项目</span>
                </yd-cell-item>
                <yd-cell-item class="yd-cell-item_arrow" @click.native="goNext('enterpriseAlternative')">
                    <span class="HHCellItem" slot="left"><svg-icon icon-class="my7"></svg-icon>我的备选</span>
                </yd-cell-item>
                <yd-cell-item class="yd-cell-item_arrow" @click.native="goNext('enterpriseCollection')">
                    <span class="HHCellItem" slot="left"><svg-icon icon-class="my8"></svg-icon>我的收藏</span>
                </yd-cell-item>
                <yd-cell-item class="yd-cell-item_arrow" @click.native="goNext('enterpriseMyInvitation')" v-if="type==3">
                    <span class="HHCellItem" slot="left"><svg-icon icon-class="my9"></svg-icon>我的邀请</span>
                </yd-cell-item>
                <yd-cell-item class="yd-cell-item_arrow" @click.native="goNext('enterpriseMyInvitation')" v-else>
                    <span class="HHCellItem" slot="left"><svg-icon icon-class="my9"></svg-icon>我发出的邀请</span>
                </yd-cell-item>
                <yd-cell-item class="yd-cell-item_arrow" @click.native="goNext('customList')">
                    <span class="HHCellItem" slot="left"><svg-icon icon-class="my10"></svg-icon>我的定制服务</span>
                </yd-cell-item>
                <yd-cell-item class="yd-cell-item_arrow" @click.native="call">
                    <span class="HHCellItem" slot="left"><svg-icon icon-class="my6"></svg-icon>联系客服</span>
                </yd-cell-item>
            </yd-cell-group>
            <div class="tc">
                <button class="HH_Button_Esc" @click="loginOut">安全退出</button>
            </div>
        </layout>
        <mt-popup
                v-if="popupVisible1"
                v-model="popupVisible1">
                <div class="loginInformation isCooperation myCooperation">
                    <div>
                        <p class="mt">我愿意哪些机构看到我的信息（多选）</p>
                        <div class="HH_chechbox—box  clearfix">
                            <HH_chechbox @click="chechboxOpen($event,towItem.id,index)" class="bbb" type="mini"
                                         v-for="(towItem, index) in orgType" :start="cooperationType.indexOf(towItem.id) > -1" :key="towItem.id">{{towItem.name}}
                            </HH_chechbox>
                        </div>
                    </div>
                    <div class="tc">
                        <button size="large" class="HH_Button_Grey" @click="popupVisible1=false;openCooperation=false">
                            取消
                        </button>
                        <button size="large" class="HH_Button_Bull" @click="saveCooperation()">
                            确 定
                        </button>
                    </div>
                </div>
        </mt-popup>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Login',
        data() {
            return {
                orgType: null,
                cooperationType:[],
                popupVisible1: false,
                openCooperation: null,
                businessAlternative: null,
                selected: '1',
                formInline: null,
                checked: null,
                switch1: false,
                getBarWidth: function (index) {
                    if (index == 3) {
                        return (4) * 0.386 + 'rem'
                    } else {
                        return (2) * 0.386 + 'rem'
                    }
                }
            }
        },
        computed: {
            ...mapGetters([
                'user',
                'type',
            ]),
        },
        watch:{
            user: {
                handler(newValue, oldValue) {

                },
                deep: true
            },
        },
        created() {
            console.log(this.user)
            this.openCooperation = !!this.user.enterprise.openCooperation;
            this.businessAlternative = !!this.user.enterprise.businessAlternative;
            this.$store.dispatch('getDicts',{code: ['org_type']}).then((data) => {
                this.orgType = data.org_type;
            });
            this.$store.dispatch('getUserInfo');
            this.$store.dispatch('weiXinFenXiang');

        },
        methods: {
            loginOut(){
                this.MessageBox({
                    title: '',
                    message: '是否退出?',
                    showCancelButton: true,
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                }).then((data)=>{
                    if(data=='confirm'){
                        this.$store.dispatch('userLoginOut').then((data)=>{
                            this.$router.push({name:'login'})
                        })
                    }else {
                        // this.$router.push({'name': 'selectProject', query:{userId:this.$route.query.id}})
                    }
                })

            },
            call(){
                window.location.href = "tel:" + '010-58383614';
            },
            chechboxOpen(type, val, index) {
                if (this.cooperationType.indexOf(val) < 0) {
                    this.cooperationType.push(val)
                } else {
                    this.cooperationType.splice(this.cooperationType.indexOf(val), 1)
                }
            },
            saveCooperation() {
                let cooperationTypeStr = this.cooperationType.join(",");
                this.$store.dispatch('enterpriseSetCooperation',{openCooperation:1,cooperationType:cooperationTypeStr}).then(data => {
                    console.log("set success");
                    this.popupVisible1 = false;
                }).catch(data => {
                    this.popupVisible1 = false;
                    this.openCooperation = false;
                });
            },
            goNext(name){
                this.$router.push({name: name});
            },
            setCooperation(val){
                if(val){
                    this.popupVisible1=true
                }else {
                    if(this.user && this.user.enterprise.openCooperation == 1){
                        this.$store.dispatch('enterpriseSetCooperation',{openCooperation:0,cooperationType:null})
                    }
                }
            },
            setBusinessAlternative(val){
                this.$store.dispatch('enterpriseSetBusinessAlternative',{ businessAlternative: Number(val)});
            },
            updateAvatar(){
                this.$store.dispatch('upImg').then((data)=>{
                    let avatarPath = data.path;
                    this.$store.dispatch('updateAvatar', {"avatarPath":avatarPath}).then(data => {
                        let inDate = this.user;
                        inDate.enterprise.logo = avatarPath;
                        this.$store.commit('SET_USER', inDate)
                    });
                })
            },
            loginOut(){
                this.MessageBox({
                    title: '',
                    message: '确认要退出吗？',
                    showCancelButton: true,
                }).then((data)=>{
                    if(data=='confirm'){
                        this.$store.dispatch('loginOut')
                        this.$router.push({name: 'login'})
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
