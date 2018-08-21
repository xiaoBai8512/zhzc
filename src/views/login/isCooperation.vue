<template>
    <div class="body Login">
        <laypage class="headShadow">
            <div class="loginInformation isCooperation">

                <div v-if="index==0">
                    <h5 class="tc">申请成为合作机构?</h5>
                    <p>以公司名义成为其他机构的合作机构，共同完成项目任务、提供专业服务。，为企业提供专业服务。</p>
                    <HH_chechbox class="aaa"  @click="openCoopClick(1)" :start="!!openCooperation">是</HH_chechbox>
                    <div v-if="!!openCooperation">
                        <p class="mt">我愿意哪些机构看到我的信息（多选）</p>
                        <div class="HH_chechbox—box clearfix">
                            <HH_chechbox @click="chechboxOpen($event,towItem.id,index)" class="bbb" type="mini"
                                         v-for="(towItem, ind) in orgType" :start="cooperationType.indexOf(towItem.id) > -1" :key="towItem.id">{{towItem.name}}
                            </HH_chechbox>
                        </div>
                    </div>
                    <HH_chechbox class="aaa" @click="openCoopClick(0)" :start="!!!openCooperation">否</HH_chechbox>
                    <yd-button size="large" bgcolor="#3399ff" color="#FFF" class="HH_submenu" @click.native="goNext(1)">
                        下一步
                    </yd-button>
                </div>
                <div v-else>
                    <h5 class="tc">申请加入企业备选库?</h5>
                    <p>以公司名义加入企业的备选机构库，为企业提供专业服务。</p>
                    <HH_chechbox class="aaa" @click="goRouter">是</HH_chechbox>
                    <HH_chechbox class="aaa" @click="$router.push({name:'enterprise'})">否</HH_chechbox>
                </div>

            </div>
        </laypage>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                openCooperation: 1,
                cooperationType: [],
                businessAlternative: 1,
                orgType: null,
                index: 0,
            }
        },
        created() {
            this.$store.dispatch('getDicts',{code: ['org_type']}).then((data) => {
                this.orgType = data.org_type;
            })
        },
        methods: {
            openCoopClick(val){
                this.openCooperation=val;
            },
            goNext(nav,type) {
                if(this.openCooperation==1){
                    if(this.cooperationType.length > 0){
                        this.$store.dispatch('enterpriseSetCooperation',{
                            "openCooperation" : 1,
                            "cooperationType" : this.cooperationType.join(',')
                        }).then(()=>{
                            this.index=1
                        })
                    }else {
                        this.Toast({
                            message: '请选择原意合作的机构类型',
                            position: 'bottom',
                            duration: 3000
                        });
                    }

                }else {
                    this.index=1
                }
            },
            goRouter(type) {
                this.$store.dispatch('enterpriseSetBusinessAlternative',{
                    "businessAlternative" : 1,
                }).then(()=>{
                    this.$router.push({name:'enterprise'})
                })
            },
            chechboxOpen(type, val, index) {
                if (this.cooperationType.indexOf(val) < 0) {
                    this.cooperationType.push(val)
                } else {
                    this.cooperationType.splice(this.cooperationType.indexOf(val), 1)
                }
                let i = 0;
                for (var item of this.dictsBusinessArea[index].dicts) {
                    if (this.cooperationType.indexOf(item.id) < 0) {
                        i++
                    }
                }
                if(i == this.dictsBusinessArea[index].dicts.length){
                    if (!(this.cooperationType.indexOf(this.dictsBusinessArea[index].id) < 0)){
                        this.cooperationType.splice(this.cooperationType.indexOf(this.dicts[index].id), 1)
                    }
                }else {
                    if (this.cooperationType.indexOf(this.dictsBusinessArea[index].id) < 0) {
                        this.cooperationType.push(this.dictsBusinessArea[index].id)
                    }
                }
            },

        }
    }
</script>
