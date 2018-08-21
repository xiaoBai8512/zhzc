<template>
    <div class="body bodyMin Login">
        <laypage style="height: 500px;">
            <el-form :model="formInline" class="FormLogin" :rules="rules" ref="ruleForm">
                <el-form-item class="form-item_Veri" label="当前登录手机号:">
                    <el-input :value="user.mobile | mobileMask" readonly="true"></el-input>
                </el-form-item>
                <el-form-item class="form-item_Veri" prop="currMobileCode">
                    <el-input
                            placeholder="当前手机验证码"
                            class="inputBG borLeftNome"
                            v-model="formInline.currMobileCode">
                        <svg-icon icon-class="via" slot="prepend"></svg-icon>
                    </el-input>
                    <button class="HH_button" type="button"  @click="getVeri" :disabled="disabled">{{disabled ? `${time}s`  :'获取验证码'}}</button>
                </el-form-item>
                <el-form-item prop="newMobile">
                    <el-input
                            placeholder="请输入新手机号码"
                            class="inputBG borLeftNome"
                            v-model="formInline.newMobile">
                        <svg-icon icon-class="phone" slot="prepend"></svg-icon>
                    </el-input>
                </el-form-item>
                <el-form-item class="form-item_Veri" prop="newMobileCode">
                    <el-input
                            placeholder="新手机号验证码"
                            class="inputBG borLeftNome"
                            v-model="formInline.newMobileCode">
                        <svg-icon icon-class="via" slot="prepend"></svg-icon>
                    </el-input>
                    <button class="HH_button" type="button"  @click="getVeri1" :disabled="disabled1">{{disabled1 ? `${time1}s`  :'获取验证码'}}</button>
                </el-form-item>
                <el-form-item>
                    <yd-button size="large" bgcolor="#3399ff" color="#FFF" class="HH_submenu"
                               @click.native="submitForm('ruleForm')">完成
                    </yd-button>
                </el-form-item>
            </el-form>
        </laypage>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Login',
        data() {
            return {
                index: 1,
                disabled: false,
                disabled1: false,
                time:60,
                time1:60,
                timeCon:null,
                timeCon1:null,
                formInline: {
                    newMobile: '',
                    newMobileCode: '',
                    currMobileCode: '',
                },
                rules: {
                    newMobile: [
                        {required: true, message: '请输入手机号码', trigger: 'change'},
                        {min: 11, max: 11, message: '长度为11字符', trigger: 'change'}
                    ],
                    newMobileCode: [
                        {required: true, message: '请输入新手机验证码', trigger: 'change'}
                    ],
                    currMobileCode: [
                        {required: true, message: '请输入当前手机验证码', trigger: 'change'}
                    ]
                },
                checked: null,
            }
        },
        computed: {
            ...mapGetters([
                'user',
                'type',
            ]),
        },
        methods: {
            getVeri(){
                let self = this;
                this.disabled=true;
                this.timeCon=setInterval(()=>{
                    this.time--;
                    if(this.time==0){
                        clearInterval(this.timeCon)
                        self.disabled=false;
                    }
                },1000)

                this.$store.dispatch('userVerificode',{type:'chg_mobile',mobile:this.user.mobile}).then((data)=>{
                    this.Toast({
                        message: '验证码发送成功',
                        position: 'bottom',
                        duration: 3000
                    })
                });

            },
            getVeri1(){
                let self = this;
                this.disabled1 = true;
                this.timeCon1=setInterval(()=>{
                    this.time1--;
                    if(this.time1 == 0){
                        clearInterval(this.timeCon1)
                        self.disabled1 = false;
                    }
                },1000)
                this.$refs.ruleForm.validateField('newMobile', ()=>{
                    this.$store.dispatch('userVerificode',{type:'reg',mobile:this.formInline.newMobile}).then((data)=>{
                        this.Toast({
                            message: '验证码发送成功',
                            position: 'bottom',
                            duration: 3000
                        })
                    })
                });

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
                        this.$store.dispatch('chgMobile', this.formInline).then((data) => {
                            this.$refs['ruleForm'].resetFields();
                            this.$dialog.notify({
                                mes: '修改成功',
                                timeout: this.$store.state.set.dialogTimeout,
                                callback: () => {
                                    
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
