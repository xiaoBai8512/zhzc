<template>
    <div class="body Login">
        <laypage>
            <div class="loginIdentity">
                <h3 class="HH_Title_h3">让我们了解你</h3>
                <p>我们需要了解您的身份和需求，为您提供适合的服务</p>
                <h5>选身份</h5>
                <div class="listIconBox">
                    <ul>
                        <li :class="type==4 && 'open'" @click="clickList(4)">
                            <div class="svg_box">
                                <svg-icon v-if="type==4" icon-class="enterprise_open"/>
                                <svg-icon v-else icon-class="enterprise"/>
                            </div>
                            企业
                        </li>
                        <li :class="type==3 && 'open'" @click="clickList(3)">
                            <div class="svg_box">
                                <svg-icon v-if="type==3" icon-class="mechanism_open"/>
                                <svg-icon v-else icon-class="mechanism"/>
                            </div>
                            机构
                        </li>
                    </ul>
                    <ul>
                        <li :class="type==2 && 'open'" @click="clickList(2)">
                            <div class="svg_box">
                                <svg-icon v-if="type==2" icon-class="expert_open"/>
                                <svg-icon v-else icon-class="expert"/>
                            </div>
                            专家
                        </li>
                        <li :class="type==1 && 'open'" @click="clickList(1)">
                            <div class="svg_box">
                                <svg-icon v-if="type==1" icon-class="student_open"/>
                                <svg-icon v-else icon-class="student"/>
                            </div>
                            学生
                        </li>
                    </ul>
                    <yd-button size="large" bgcolor="#3399ff" color="#FFF" class="HH_submenu" @click.native="goNext">下一步</yd-button>
                </div>
            </div>
        </laypage>
    </div>
</template>

<script>
    export default {
        name: 'LoginIdentity',
        data() {
            return {
                type: null,
                formInline: null,
            }
        },
        methods:{
            clickList(val){
                this.type=val
            },
            goNext(){
                if(this.type == 1 || this.type == 2){
                    this.$store.commit('SET_TYPE', this.type)
                    this.$store.commit('SET_SELECT_USER_TYPE', this.type)
                    this.$router.push({name:'loginInformation'})
                }else if(this.type == 3 || this.type == 4){
                    this.$store.commit('SET_TYPE', this.type)
                    this.$store.commit('SET_SELECT_USER_TYPE', this.type)
                    this.$router.push({name:'loginCompanyInfo'})
                }else{
                    this.$dialog.notify({
                        mes: '请选择身份',
                        timeout: this.$store.state.set.dialogTimeout,
                    });
                }
            }

        }
    }
</script>
