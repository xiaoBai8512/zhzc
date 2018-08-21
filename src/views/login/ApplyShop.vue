<template>
    <laypage title="注册">
        <div class="body">
            <div></div>
            <x-input class="login_phone_input" v-model="phoneNumber" :required="true" type="number"
                     is-type="china-mobile" ref="mobile" placeholder="输入手机号" :show-clear="false" @on-change="checkEnableNext">
                <span slot="label" class="input-label login_area_code">中国+86</span>
            </x-input>
            <div class="auth_code">
                <x-input class="auth_code_input" v-model="auth_code" type="number" :required="true" :show-clear="false"
                         ref="auth" :is-type="checkCode" placeholder="请输入验证码" @on-change="checkEnableNext">
                    <span slot="label" class="input-label">短信验证码</span>
                </x-input>
                <div class="get_auth_code label_center_button" :class="{enable: getAuthBtnEnable}" @click="getAuthCode">
                    <span class="get_auth_code_text">{{getAuthBtnText}}</span>
                </div>
            </div>
            <x-input class="password_input" v-model="password" type="password" :required="true" :min="6"
                     :show-clear="false" ref="pass" @on-change="checkEnableNext">
                <span slot="label" class="input-label">输入密码</span>
            </x-input>
            <x-input class="password_input" v-model="password_confirm" type="password" :required="true"
                     :equal-with="password" :show-clear="false" ref="pass_con" @on-change="checkEnableNext">
                <span slot="label" class="input-label">确认密码</span>
            </x-input>

            <div class="next_btn_div">
                <div class="next_btn label_center_button" :class="{enable_next: nextEnable}" @click="doApplyShop">
                    <span class="next_btn_text">下一步</span>
                </div>
            </div>
            <div class="login_direct_div label_center_button" v-if="showLoginLink">
                <label class="login_direct" @click="loginDirect">手机号已经注册，直接登录</label>
            </div>
            <div>
                <x-dialog v-model="showToast" class="dialog-demo">
                    <div class="toast_div">
                        <label class="toast_label">{{dialogText}}</label>
                        <div class="login_immediately label_center_button" v-show="logShow" @click="doShowLogin">
                            <span class="login_immediately_text">立即登录</span>
                        </div>
                        <div class="toast_cancel label_center_button" @click="toastCancel">
                            <span class="toast_cancel_text">取消</span>
                        </div>
                    </div>
                </x-dialog>
            </div>
        </div>
    </laypage>
</template>

<script>
    import {ajaxError} from "../../utils/api";
    import md5 from 'js-md5'
    import store from '../../store'

    export default {
        name: 'Forget',
        data() {
            return {
                phoneNumber: '',
                auth_code: "",
                password: "",
                password_confirm: "",
                getAuthBtnText: "获取验证码",
                getAuthBtnEnable: true,
                nextEnable: false,
                showToast: false,
                countDown: 0,
                countDownId: -1,
                dialogText: "该手机号已经注册飞鱼账号",
                logShow: true,
                code: null,
                showLoginLink: true
            }
        },
        mounted() {
            this.showLoginLink = (store.state.orgType == 'seller')
            this.$refs.mobile.focus()
        },
        methods: {
            checkEnableNext: function(val){
                this.nextEnable = (this.$refs.mobile.valid && this.phoneNumber !=='') &&
                    (this.$refs.auth.valid && this.auth_code !=='') &&
                    (this.$refs.pass.valid && this.password !== '') &&
                    (this.$refs.pass_con.valid && this.password_confirm !== '')
            },
            getAuthCode: function () {
                if (!this.$refs.mobile.valid || this.countDown != 0) return
                this.getAuthBtnEnable = false;
                this.countDown = 58;
                this.getAuthBtnText = "59秒后重新发送"
                this.countDownId = setInterval(this.updateLabel, 1000)
                let inData = {
                    'phone': this.phoneNumber,
                    'type': 'register'
                };
                this.$store.dispatch('sendCheckCode', inData).then(
                    data => {
                        this.code = data + "";
                    }).catch(error => {
                    ajaxError(error, this)
                })
            },
            updateLabel: function () {
                if (0 === this.countDown) {
                    this.getAuthBtnText = "获取验证码"
                    this.getAuthBtnEnable = true;
                    window.clearInterval(this.countDownId)
                    this.countDownId = -1
                } else {
                    this.getAuthBtnText = this.countDown + "秒后重新发送"
                    this.countDown--
                }
            },
            doApplyShop: function () {
                if (!this.nextEnable) return

                if (this.$refs.mobile.valid &&
                    this.$refs.auth.valid &&
                    this.$refs.pass.valid &&
                    this.$refs.pass_con.valid &&
                    this.phoneNumber != null) {
                    this.$router.push({
                        name: 'setUpShopInfo',
                        query: {'mob': this.phoneNumber, 'pass': this.password, 'code': this.auth_code}
                    })
                }
            },

            loginDirect: function () {
                this.getAuthBtnEnable = false;
                this.$router.replace({name: 'login'})
            },
            doShowLogin: function () {

            },
            toastCancel: function () {
                this.showToast = false
            },
            checkCode: function (val) {
                if (val == null) {
                    return {valid: false, msg: '未获取验证码'}
                } else if ((val == null || val.length < 2)) {
                    return {valid: false, msg: '验证码不正确'}
                }
                let codeMd5 = md5(val)
                if (this.code != codeMd5) {
                    return {valid: false, msg: '验证码错误'}
                } else {
                    return {valid: true}
                }
            }
        }
    }
</script>
