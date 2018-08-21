<template>
    <div class="body bodyMin Login">
        <laypage style="height: 500px;">
            <div class="HH_tabber">
                <button :class="index==1 && 'open'" @click="tebClick(1)">账号密码登录</button>
                <span>|</span>
                <button :class="index==2 && 'open'" @click="tebClick(2)">快捷免密登录</button>
            </div>
            <el-form :model="formInline" class="FormLogin" :rules="rules" ref="ruleForm">
                <el-form-item prop="mobile">
                    <el-input
                            placeholder="请输入手机号码"
                            class="inputBG borLeftNome"
                            v-model="formInline.mobile">
                        <svg-icon icon-class="phone" slot="prepend"></svg-icon>
                    </el-input>
                </el-form-item>
                <el-form-item class="form-item_Veri" prop="code" v-if="index==2">
                    <el-input
                            placeholder="验证码"
                            class="inputBG borLeftNome"
                            v-model="formInline.code">
                        <svg-icon icon-class="via" slot="prepend"></svg-icon>
                    </el-input>
                    <button class="HH_button" type="button"  @click="getVeri" :disabled="disabled">{{disabled ? `${time}s`  :'获取验证码'}}</button>
                </el-form-item>
                <el-form-item prop="password" v-if="index==1">
                    <el-input
                            type="password"
                            placeholder="请输入密码"
                            class="inputBG borLeftNome"
                            v-model="formInline.password">
                        <svg-icon icon-class="password_1" slot="prepend"></svg-icon>
                    </el-input>
                    <button class="wjmm fr" @click="$router.push({name:'resetPassword'})">忘记密码？</button>
                </el-form-item>
                <el-form-item>
                    <yd-button size="large" bgcolor="#3399ff" color="#FFF" class="HH_submenu"
                               @click.native="submitForm('ruleForm')">登录
                    </yd-button>
                    <yd-button size="large" bgcolor="#fff" color="#3399ff" class="HH_submenu_bgW"
                               @click.native="goNext">注册
                    </yd-button>
                </el-form-item>
            </el-form>
        </laypage>

    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                index: 1,
                disabled: false,
                type: null,
                time:60,
                timeCon:null,
                formInline: {
                    mobile: '',
                    code: '',
                    password: '',
                },
                rules: {
                    mobile: [
                        {required: true, message: '请输入手机号码', trigger: 'change'},
                        {min: 11, max: 11, message: '长度为11字符', trigger: 'change'}
                    ],
                    code: [
                        {required: true, message: '请输入手机验证码', trigger: 'change'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'change'}
                    ]
                },
                checked: null,
            }
        },
        methods: {
            getVeri(){
                if(this.formInline.mobile.length == 11){
                    this.$refs.ruleForm.validateField('mobile', (valid)=>{
                        let self = this;
                        this.disabled=true;
                        this.timeCon=setInterval(()=>{
                            this.time--;
                            if(this.time==0){
                                clearInterval(this.timeCon)
                                self.disabled=false;
                            }
                        }, 1000)
                        this.$store.dispatch('userVerificode',{type:'login',mobile:this.formInline.mobile}).then((data)=>{
                            this.Toast({
                                message: '验证码发送成功',
                                position: 'bottom',
                                duration: 3000
                            })
                        })
                    });
                }else {
                    this.$refs.ruleForm.validateField('mobile', (valid)=>{
                        this.Toast({
                            message: '手机号码格式错误',
                            position: 'bottom',
                            duration: 2000
                        })
                    });
                }
            },
            tebClick(val) {
                this.index = val
                this.$refs.ruleForm.resetFields()
            },
            wXimg() {
                this.$store.dispatch('upImg').then((data) => {
                    this.$Message({
                        message: data,
                        type: 'warning',
                        duration: 0
                    });
                }).catch((err) => {
                    this.$Message({
                        message: err,
                        type: 'warning',
                        duration: 0
                    });
                })
            },
            goNext() {
                this.$router.push({name: 'registered'})
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('userLogin', this.formInline).then((data) => {
                            this.$dialog.notify({
                                mes: '登陆成功',
                                timeout: this.$store.state.set.dialogTimeout,
                                callback: () => {
                                    if(data.user.infoStatus==1){
                                        if(data.user.subUserType == 1 || data.user.subUserType == 2){
                                            this.$router.push({name: 'students'})
                                        }else {
                                            this.$router.push({name: 'enterprise'})
                                        }

                                    }else {
                                        this.$router.push({name: 'loginIdentity'})
                                    }

                                }
                            });
                        })
                    } else {
                        return false;
                    }
                });
            }
        },

    }
</script>
<style scoped>
    .back {

    }
</style>
