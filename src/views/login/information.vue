<template>
    <div class="body Login">
        <laypage class="headShadow">
            <div class="loginInformation" v-show="index==0 && dictsBusinessArea">
                <p>为了更准确的向您推荐职位信息，需要您配合完善以下信息</p>
                <h5 v-if="type==2">您擅长的业务领域是？（多选）</h5>
                <h5 v-else>请选择申请实习方向（多选）：</h5>
                <div v-for="(item, index) in dictsBusinessArea">
                    <HH_chechbox class="aaa" @click="chechboxOpenAll($event,index, item.id)" :start="businessArea.indexOf(item.id) > -1" :key="item.id">{{item.name}}</HH_chechbox>
                    <div class="HH_chechbox—box clearfix" v-if="item.dicts.length > 0">
                        <HH_chechbox @click="chechboxOpen($event,towItem.id,index)" class="bbb" type="mini"
                                     v-for="towItem in item.dicts" :start="businessArea.indexOf(towItem.id) > -1" :key="towItem.id">{{towItem.name}}
                        </HH_chechbox>
                    </div>
                </div>
                <yd-button size="large" bgcolor="#3399ff" color="#FFF" class="HH_submenu" @click.native="goNext(1)">
                    下一步
                </yd-button>
            </div>
            <div class="loginInformation" v-show="index==1 && disctQualification">
                <h5 style="margin: 0">您已取得的执业资格有哪些？（多选）</h5>
                <HH_chechbox class="aaa"  @click="qualificationChecn($event,index, item.id)"  v-for="(item, index) in disctQualification"  :start="qualification.indexOf(item.id) > -1"  :key="item.id">{{item.name}}</HH_chechbox>
                <yd-button size="large" bgcolor="#3399ff" color="#FFF" class="HH_submenu" @click.native="goNext(2)">
                    下一步
                </yd-button>
                <div class="tc">
                    <button @click="jump(2)">跳过 >></button>
                </div>
            </div>
            <div class="loginInformation" v-show="index==2 && disctIndustries">
                <h5 style="margin: 0">您所熟悉的行业有哪些？（多选）</h5>
                <div class="HH_chechbox—box clearfix marTop">
                    <HH_chechbox type="middle" class="ccc"   @click="industriesChecn($event,index, item.id)"  v-for="(item, index) in disctIndustries"  :start="industries.indexOf(item.id) > -1"  :key="item.id">{{item.name}}</HH_chechbox>
                </div>
                <yd-button size="large" bgcolor="#3399ff" color="#FFF" class="HH_submenu" @click.native="goRouter()">
                    下一步
                </yd-button>
                <div class="tc">
                    <button @click="goRouter(true)">跳过 >></button>
                </div>

            </div>
        </laypage>
    </div>
</template>

<script>
    // import {mapGetters} from 'vuex'
    export default {
        name: 'Login',
        data() {
            return {
                dictsBusinessArea: null,
                disctQualification: null,
                disctIndustries: null,
                businessArea: [],
                qualification: [],
                industries: [],
                businessIndex: {},
                input21: null,
                formInline: null,
                type: null,
            }
        },
        created() {
            this.$store.dispatch('getDicts',{code: ['business_area','qualification','industries']}).then((data) => {
                this.dictsBusinessArea = data.business_area;
                this.disctQualification = data.qualification;
                this.disctIndustries = data.industries;
            })
            if(!this.$store.state.login.wxUser){
                // console.log(location.href);
                if(location.href.indexOf('code=') > -1){
                    this.$store.dispatch('getOpenId',location.href.split('code=')[1].split('&')[0])
                }else {
                    window.location.href = 'http://api.zhzc.bjhqzl.com/api/wechat/oauth?scope=snsapi_userinfo&redirect_uri=' + encodeURIComponent(location.href);
                }
            }
            this.$store.commit('SET_TYPE', this.$store.state.login.selectUserType)
            this.type = this.$store.state.login.selectUserType;
            this.businessArea = this.$store.state.login.businessArea;
            this.qualification = this.$store.state.login.qualification;
            this.industries = this.$store.state.login.industries;
        },
        computed: {
            index() {
                return this.$route.query.index || 0;
            },
        },
        methods: {
            jump(val){
                this.$router.push({name: 'loginInformation', query: {index: val}})
                this.qualification=[]
                this.$store.commit('SET_QUALIFICATION',null)
            },
            goNext(nav,type) {
                if(!type){
                    if(nav==1){
                        if(this.businessArea.length > 0){
                            this.$store.commit('SET_BUSINESSAREA',this.businessArea)
                            this.$router.push({name: 'loginInformation', query: {index: nav}})
                        }else {
                            this.Toast({
                                message: '请选择业务领域',
                                position: 'bottom',
                                duration: 2000
                            })
                        }
                    }else {
                        this.$store.commit('SET_QUALIFICATION',this.qualification)
                        this.$router.push({name: 'loginInformation', query: {index: nav}})
                    }
                }


            },
            goRouter(type) {
                if(!type){
                    this.$store.commit('SET_INDUSTRIES',this.industries)
                }else {
                    this.$store.commit('SET_INDUSTRIES',null)
                    this.industries=[]
                }
                setTimeout(()=>{
                    this.$router.push({name: 'loginUserInfo'})
                },100)
                // this.$router.push({name: 'loginUserInfo'})

            },
            dataOperation(id){
                if (!(this.businessArea.indexOf(id) < 0)){
                    this.businessArea.splice(this.businessArea.indexOf(id), 1)
                }else {
                    this.businessArea.push(id)
                }
            },
            chechboxOpen(type, val, index) {
                if (this.businessArea.indexOf(val) < 0) {
                    this.businessArea.push(val)
                } else {
                    this.businessArea.splice(this.businessArea.indexOf(val), 1)
                }
                let i = 0;
                for (var item of this.dictsBusinessArea[index].dicts) {
                    if (this.businessArea.indexOf(item.id) < 0) {
                        i++
                    }
                }
                if(i == this.dictsBusinessArea[index].dicts.length){
                    if (!(this.businessArea.indexOf(this.dictsBusinessArea[index].id) < 0)){
                        this.businessArea.splice(this.businessArea.indexOf(this.dictsBusinessArea[index].id), 1)
                    }
                }else {
                    if (this.businessArea.indexOf(this.dictsBusinessArea[index].id) < 0) {
                        this.businessArea.push(this.dictsBusinessArea[index].id)
                    }
                }
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
            qualificationChecn(type, val, id) {
                if (this.qualification.indexOf(id) < 0) {
                    this.qualification.push(id)
                } else {
                    this.qualification.splice(this.qualification.indexOf(id), 1)
                }
            },
            industriesChecn(type, val, id) {
                if (this.industries.indexOf(id) < 0) {
                    this.industries.push(id)
                } else {
                    this.industries.splice(this.industries.indexOf(id), 1)
                }
            },

        }
    }
</script>
