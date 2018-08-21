<template>
    <div class="body bodyMin Login">
        <laypage style="height: 500px;">
            <el-form :model="formInline" class="FormLogin" :rules="rules" ref="ruleForm">
                <el-form-item prop="mobile">
                    <el-input
                            placeholder="手机号码"
                            class="inputBG borLeftNome"
                            v-model="formInline.mobile">
                        <svg-icon icon-class="phone" slot="prepend"></svg-icon>
                    </el-input>
                </el-form-item>
                <el-form-item class="form-item_Veri" prop="mobileCode">
                    <el-input
                            placeholder="手机验证码"
                            class="inputBG borLeftNome"
                            v-model="formInline.mobileCode">
                        <svg-icon icon-class="via" slot="prepend"></svg-icon>
                    </el-input>
                    <button class="HH_button" type="button"  @click="getVeri" :disabled="disabled">{{disabled ? `${time}s`  :'获取验证码'}}</button>
                </el-form-item>
                <el-form-item prop="newPassword">
                    <el-input
                            type="password"
                            placeholder="新密码"
                            class="inputBG borLeftNome"
                            v-model="formInline.newPassword">
                        <svg-icon icon-class="password_1" slot="prepend"></svg-icon>
                    </el-input>
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
                time:60,
                timeCon:null,
                formInline: {
                    mobile: '',
                    mobileCode: '',
                    newPassword: '',
                },
                rules: {
                    mobile: [
                        {required: true, message: '请输入手机号码', trigger: 'change'},
                        {min: 11, max: 11, message: '长度为11字符', trigger: 'change'}
                    ],
                    mobileCode: [
                        {required: true, message: '请输入手机验证码', trigger: 'change'}
                    ],
                    newPassword: [
                        {required: true, message: '请输入新密码', trigger: 'change'}
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
                if(this.formInline.mobile.length == 11){
                    let self = this;
                    this.disabled = true;
                    
                    this.$store.dispatch('userVerificode',{type:'chg_password',mobile:this.formInline.mobile}).then((data)=>{
                        this.Toast({
                            message: '验证码发送成功',
                            position: 'bottom',
                            duration: 3000
                        });
                        this.timeCon = setInterval(()=>{
                            this.time--;
                            if(this.time == 0){
                                clearInterval(this.timeCon)
                                self.disabled=false;
                            }
                        },1000);
                    }).catch(err => {
                        this.disabled = false;
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
            submitForm(formName) {
                let self = this;

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('resetPassword', this.formInline).then((data) => {
                            this.$refs.ruleForm.resetFields();
                            this.$dialog.notify({
                                mes: '密码修改成功',
                                timeout: 3000,
                                callback: () => {
                                    self.$router.replace({name: 'login'});
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
