<template>
    <div class="body my">
        <layout>
            <template  v-if="user">
                <div class="my_header">
                    <img :src="user.expert.avatar | imgUrl" alt="" @click="updateAvatar">
                    <h5>{{user.expert.nickname}}<span>{{user.expert.type==2 ? '专家' : '实习生'}}</span></h5>
                    <!--<button>申请认证</button>-->
                    <div class="iconClassBog">
                        <svg-icon icon-class="button_Bg1"></svg-icon>
                        <button @click="$router.push({'name':'certification'})">{{user.expert.isCertification | translation('certification')}}</button>
                    </div>
                </div>
                <yd-cell-group>

                    <yd-cell-item class="yd-cell-item_arrow" v-if="user.expert.type == 1 && false">
                        <span class="HHCellItem" slot="left"><svg-icon icon-class="my1"></svg-icon>申请成为专家</span>
                    </yd-cell-item>

                    <yd-cell-item>
                        <span class="HHCellItem" slot="left"><svg-icon icon-class="my2"></svg-icon>接受邀请</span>
                        <span  slot="right">
                            <el-switch v-model="openInvite" @change="setOpenInvite"></el-switch>
                        </span>
                    </yd-cell-item>
                    <div class="closeInviteWarning" v-if="!openInvite">您已关闭接受邀请功能，打开后可继续接收新的邀请。</div>
                </yd-cell-group>
                <yd-cell-group>
                    <yd-cell-item class="yd-cell-item_arrow" @click.native="goNext('perfectInfo')">
                        <span class="HHCellItem" slot="left"><svg-icon icon-class="my3"></svg-icon>我的资料</span>
                    </yd-cell-item>
                    <yd-cell-item  class="yd-cell-item_arrow" @click.native="goNext('mySet')">
                        <span class="HHCellItem" slot="left"><svg-icon icon-class="my4"></svg-icon>账号设置</span>
                    </yd-cell-item>
                    <yd-cell-item class="yd-cell-item_arrow" @click.native="$router.push({name:'invitation', query:{reciver_status:1}})">
                        <span class="HHCellItem" slot="left"><svg-icon icon-class="my5"></svg-icon>我的承接</span>
                    </yd-cell-item>
                    <yd-cell-item class="yd-cell-item_arrow" @click.native="goNext('customList')" v-if="user.expert.type == 2">
                        <span class="HHCellItem" slot="left"><svg-icon icon-class="my10"></svg-icon>我的定制服务</span>
                    </yd-cell-item>
                    <yd-cell-item  class="yd-cell-item_arrow" @click.native="call">
                        <span class="HHCellItem" slot="left"><svg-icon icon-class="my6"></svg-icon>联系客服</span>
                    </yd-cell-item>
                </yd-cell-group>
                <div class="tc">
                    <button class="HH_Button_Esc" @click="loginOut">安全退出</button>
                </div>
            </template>
        </layout>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: 'my',
        data() {
            return {
                selected: '1',
                formInline: null,
                checked: null,
                openInvite: false,
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
        created(){
            // console.log(this.user)
            this.openInvite = !!this.user.expert.openInvite;
            this.$store.dispatch('getUserInfo');
            this.$store.dispatch('weiXinFenXiang');

        },
        watch:{
            // switch1(val){
            //     this.$store.dispatch('expertInvite', val ? 'open' : 'close')
            //     let inDate = this.user;
            //     inDate.expert.openInvite=Number(val);
            //     this.$store.commit('SET_USER', inDate)
            // }
        },
        methods: {
            call(){
                window.location.href = "tel:" + '010-58383614';
            },
            goNext(name) {
                this.$router.push({name: name})
            },
            setOpenInvite(val){
                this.$store.dispatch('expertInvite', val ? 'open' : 'close').then(data => {
                    let inDate = this.user;
                    inDate.expert.openInvite = Number(val);
                    this.$store.commit('SET_USER', inDate)
                });
            },
            invite(){
                this.$store.dispatch('expertInvite', 'open')
            },
            updateAvatar(){
                this.$store.dispatch('upImg').then((data)=>{
                    let avatarPath = data.path;
                    this.$store.dispatch('updateAvatar', {"avatarPath":avatarPath}).then(data => {
                        let inDate = this.user;
                        inDate.expert.avatar = avatarPath;
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
