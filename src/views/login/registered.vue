<template>
    <div class="body bodyMin">
        <laypage>
            <el-form :model="formInline" class="FormLogin" :rules="rules" ref="ruleForm">
                <el-form-item prop="mobile">
                    <el-input
                            placeholder="手机号码"
                            class="inputBG borLeftNome"
                            v-model="formInline.mobile">
                        <svg-icon icon-class="phone" slot="prepend"></svg-icon>
                    </el-input>
                </el-form-item>
                <el-form-item class="form-item_Veri" prop="code">
                    <el-input
                            type="text"
                            placeholder="验证码"
                            class="inputBG borLeftNome"
                            v-model="formInline.code">
                        <svg-icon icon-class="via" slot="prepend"></svg-icon>
                    </el-input>
                    <button class="HH_button" type="button"  @click="getVeri" :disabled="disabled">{{disabled ? `${time}s`  :'获取验证码'}}</button>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                            type="password"
                            placeholder="请输入密码"
                            class="inputBG borLeftNome"
                            v-model="formInline.password">
                        <svg-icon icon-class="password_1" slot="prepend"></svg-icon>
                    </el-input>
                </el-form-item>
                <el-form-item prop="passwordVri">
                    <el-input
                            type="password"
                            placeholder="请再次输入密码"
                            class="inputBG borLeftNome"
                            v-model="formInline.passwordVri">
                        <svg-icon icon-class="password_1" slot="prepend"></svg-icon>
                        <!--<i-->
                                <!--class="HH_icon_Password"-->
                                <!--slot="prepend">-->
                        <!--</i>-->
                    </el-input>
                </el-form-item>
                <el-checkbox v-model="checked"><span class="bluer" @click="$router.push({name: 'agreement'})">用户协议</span></el-checkbox>
                <el-form-item>
                    <yd-button size="large" bgcolor="#3399ff" color="#FFF" class="HH_submenu" @click.native="submitForm('ruleForm')">注册</yd-button>
                </el-form-item>
            </el-form>
        </laypage>

    </div>
</template>

<script>
    export default {
        name: 'registered',
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formInline.passwordVri !== '') {
                        this.$refs.ruleForm.validateField('passwordVri');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formInline.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                disabled: false,
                time: 60,
                timeCon: null,
                formInline: {
                    mobile:'',
                    code:null,
                    password:null,
                    passwordVri:null,
                    openid:this.$store.state.login.openid,
                },
                rules: {
                    mobile: [
                        { required: true, message: '请输入手机号码', trigger: 'change' },
                        { min: 11, max: 11, message: '长度为11个字符', trigger: 'change' }
                    ],
                    code: [
                        { required: true, message: '请输入手机验证码', trigger: 'change' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwordVri: [
                        { validator: validatePass2, trigger: 'change' }
                    ],
                },
                checked: null,
            }
        },
        methods:{
            wXimg(){
                this.$store.dispatch('upImg')
            },
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
                                this.time=60;
                            }
                        },1000)
                        this.$store.dispatch('userVerificode',{type:'reg',mobile:this.formInline.mobile}).then((data)=>{
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
            submitForm(formName) {
                if(this.checked){
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.$store.dispatch('userReg', this.formInline).then((data)=>{
                                this.$dialog.notify({
                                    mes: '注册成功',
                                    timeout: 3000,
                                    callback:()=>{
                                        this.$router.push({name:'loginIdentity'})
                                    }
                                });
                            })
                        } else {
                            return false;
                        }
                    });
                }else {
                    this.$dialog.notify({
                        mes: '请同意用户协议',
                        timeout: this.$store.state.set.dialogTimeout,
                    });
                }

            },
        },
        beforeRouteEnter (to, from, next) {
            let whiteList = ['agreement'];
            next(vm=>{
                if(whiteList.indexOf(from.name) < 0){
                    vm.formInline={
                        mobile:'',
                        code:null,
                        password:null,
                        passwordVri:null,
                        openid:vm.$store.state.login.openid,
                    }
                }
            })
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建
        }
    }
</script>
<style scoped>
    .back {

    }
</style>
