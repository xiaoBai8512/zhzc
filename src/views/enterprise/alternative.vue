<template>
    <div class="body enterpriseExperts">
        <layout>
            <!--<div class="EIheader">-->
            <tab :line-width="1" :custom-bar-width="getBarWidth" active-color="#3399ff">
                <tab-item @on-item-click="onItemClick(3)" :selected="formData.prepareUserType==3">
                    {{type==3?"合作机构":"专业机构"}}
                </tab-item>
                <tab-item @on-item-click="onItemClick(2)" :selected="formData.prepareUserType==2">专家</tab-item>
                <tab-item @on-item-click="onItemClick(1)" :selected="formData.prepareUserType==1" v-if="type == 3">实习生
                </tab-item>
            </tab>
            <!--</div>-->
            <div class="enterpriseExperts_con enterpriseAlternative" style="height: calc(100% - 2.24rem);">
                <div class="tiaojianList tiaojianList2">
                        <button @click="formData.prepareType=null;clickButtonTowCon=null;clickButtonTowIndex=null">全部</button>
                        <template v-if="formData.prepareUserType!=3">
                            <span v-for="item in dictsBusinessArea">
                                 <el-popover
                                         v-if="item.dicts && item.dicts.length > 0"
                                         v-model="clickButtonTowPopover"
                                         class="enterPopover"
                                         placement="bottom"
                                         width="120"
                                         trigger="click">
                                    <!--<button class="enterPopover open" v-for="itemTow in item.dicts">{{itemTow.name}}</button>-->
                                     <span v-for="(itemTow,index) in item.dicts">
                                        <button :class="formData.prepareType == itemTow.id ? 'enterPopover open' : 'enterPopover'"
                                                @click="clickButtonTow(itemTow.id, item.id,itemTow.name)">{{itemTow.name}}</button>
                                        <div class="b_b_1"></div>
                                     </span>
                                     <button :class="clickButtonTowIndex == item.id ? 'xiala open' : 'xiala'"
                                             slot="reference">{{clickButtonTowCon || item.name}} <i
                                             class="el-icon-caret-bottom"></i></button>
                                </el-popover>
                                <button :class="formData.prepareType == item.id && 'open'" v-else @click="clickButton(item.id)">{{item.name}}</button>
                            </span>
                        </template>
                        <template v-else>
                            <span  v-for="(item,index) in dictsOrgtype">
                                <button :class="formData.prepareType == item.id && 'open'" @click="clickButton(item.id)">{{item.name}}</button>
                            </span>
                                <!--<button class="enterPopover open" v-for="itemTow in item.dicts">{{itemTow.name}}</button>-->

                        </template>
                </div>
                <div class="loadmoreBox">
                    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="p_main" :auto-fill="false"
                                 v-if="list" class="conList AlternativeList">
                        <el-checkbox-group v-model="checkList" :max="3">
                            <div class="HH_List men" v-for="(item, index) in list" v-if="list">
                                <template v-if="item.prepareUserType!=3">
                                    <el-checkbox :label="item.userExpert.userId">&nbsp;</el-checkbox>
                                    <div class="AlternativeCon" @click="$router.push({name: 'enterpriseExpertsDetails',query:{userId:item.userExpert.userId}})">
                                        <div class="men_1">
                                            <img class="logo" :src="item.userExpert.avatar | imgUrl" alt="">
                                            <div class="men_1_con">
                                                <div class="men_1_con_top">
                                                    <h5 class="HH_Grow HH_ellipsis">
                                                        {{item.userExpert.isAnonymous == 0 && item.userExpert.realname ? item.userExpert.realname : item.userExpert.nickname}}
                                                        <span class="rz" v-if="item.userExpert.isCertification==1">认证</span>
                                                        <span v-if="item.userExpert.type==2">专家</span>
                                                        <span v-if="item.userExpert.type==1">实习生</span>
                                                    </h5>
                                                </div>
                                                <div class="men_1_con_bottom">
                                                    <svg-icon icon-class="nv" v-if="item.userExpert.gender==1"></svg-icon>
                                                    <svg-icon icon-class="nan" v-else></svg-icon>
                                                    <span>{{item.userExpert.age}}岁</span>
                                                    <svg-icon icon-class="adds"></svg-icon>
                                                    <span>{{item.userExpert.city_name}}</span>
                                                    <svg-icon icon-class="bao"></svg-icon>
                                                    <span>{{!!item.userExpert.businessTrip ? '接受出差' : '不接受出差'}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="men_2">
                                            <p class="coll">{{item.userExpert.type==1?"实习方向":"业务领域"}}：<span
                                                    v-for="itemTree in item.userExpert.businessAreaItems">{{itemTree.name}}&nbsp;</span>
                                            </p>
                                            <svg-icon :icon-class="'q_'+q.qualificationId" v-if="index < 3"
                                                      v-for="(q, index) in item.userExpert.qualificationItems"
                                                      :key="index"></svg-icon>
                                        </div>
                                        <div class="men_2">
                                            <p class="coll">备选方向：<span v-for="itemTree in item.prepareTypeItems">{{itemTree.name}}&nbsp;</span></p>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <!--<el-checkbox :label="item.userEnterprise.userId">&nbsp;</el-checkbox>-->
                                    <div class="AlternativeCon" @click="$router.push({name: 'OrganizationDetails', query:{userId:item.userEnterprise.userId}})">
                                        <div class="men_1">
                                            <img class="logo" :src="item.userEnterprise.logo | imgUrl" alt="">
                                            <div class="men_1_con">
                                                <div class="men_1_con_top">
                                                    <h5 class="HH_Grow HH_ellipsis">
                                                        <i class="coll">{{item.userEnterprise.fullname}}</i>
                                                        <svg-icon icon-class="renzheng" v-if="!!item.isVip"></svg-icon>
                                                    </h5>
                                                </div>
                                                <div class="men_1_con_bottom">
                                                    <svg-icon icon-class="adds"></svg-icon>
                                                    <span>{{item.userEnterprise.city_name}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="men_2">
                                            <p class="coll">机构类别：<span
                                                    v-for="itemTree in item.userEnterprise.organizationTypeItems">{{itemTree.name}}&nbsp;</span>
                                            </p>
                                        </div>
                                        <div class="men_2">
                                            <p class="coll">备选方向：<span v-for="itemTree in item.prepareTypeItems">{{itemTree.name}}&nbsp;</span>
                                            </p>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </el-checkbox-group>
                        <p v-if="allLoaded" class="ywgdnr">已无更多内容</p>
                    </mt-loadmore>
                </div>
            </div>
            <div class="AlternativeFoot" v-if="formData.prepareUserType!=3">
                <el-checkbox class="el-checkbox-round" v-model="prepareType">隐藏关闭邀约用户</el-checkbox>
                <span class="red">最多邀请3人</span>
                <button @click="sumber">发送邀请</button>
            </div>
        </layout>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Prepare from '../../components/Prepare'

    export default {
        name: 'Login',
        components: {Prepare},
        computed: {
            ...mapGetters(['type'])
        },
        data() {
            return {
                checkList: [],
                getBarWidth: function (index) {
                    if (index == 0) {
                        return (4) * 0.386 + 'rem'
                    } else {
                        return (2) * 0.386 + 'rem'
                    }
                },
                id: null,
                prepareType: false,
                formData: {
                    "hiddenCloseInviteUser": 0,
                    "prepareUserType": 3,
                    "prepareType": null
                },
                pageData: {
                    pageNum: 1,
                    pageSize: 10,
                },
                list: [],
                clickButtonTowIndex: null,
                clickButtonTowIn: null,
                clickButtonTowCon: null,
                clickButtonTowPopover: false,
                dictsBusinessArea: null,
                dictsOrgtype: null,
                businessArea: [],
                addressSlots: [{}, {}, {}],
                allLoaded: false,
            }
        },
        created() {
            this.getData(this.formData);
            this.$store.dispatch('getAreas', 0).then((areaData) => {
                // console.log(areaData);
                console.log(areaData)
                this.addressSlots[0].values = areaData;
                this.addressSlots[1].values = areaData[0].areas;
                this.addressSlots[2].values = areaData[0].areas[0].areas;
            })
            this.$store.dispatch('getDicts', {code: ['business_area', 'org_type']}).then((data) => {
                this.dictsBusinessArea = data.business_area;
                this.dictsOrgtype = data.org_type;
            })
        },
        watch: {
            formData: {
                handler(newValue) {
                    this.list = [];
                    this.pageData = {
                        pageNum: 1,
                        pageSize: 10,
                    },
                        this.getData(newValue)
                },
                deep: true
            },
            prepareType(val) {
                this.formData.hiddenCloseInviteUser = Number(val)
            }
        },
        methods: {
            getData(formData) {
                let inData = Object.assign(this.pageData, formData)
                this.$store.dispatch('prepareMyPrepares', inData).then((data) => {
                    this.allLoaded = !!!data.hasNextPage;
                    if(data.pageNum==1){
                        this.list=[]
                    }
                    for (let item of data.list) {
                        this.list.push(item)
                    }
                }).finally(()=>{
                    this.$refs.p_main.onBottomLoaded();
                })
            },
            onItemClick(index) {
                this.formData.prepareUserType = index;
            },
            clickButton(val) {
                this.clickButtonTowIndex = null;
                this.clickButtonTowCon = null;
                if (this.formData.prepareType != val) {
                    this.formData.prepareType = val
                }
            },
            clickButtonTow(val, id, name) {
                this.clickButtonTowIndex = id;
                if (this.formData.prepareType != val) {
                    this.formData.prepareType = val
                }
                this.clickButtonTowPopover = false;
                this.clickButtonTowCon = name;
            },
            sumber() {
                if (this.checkList.length > 0) {
                    this.$router.push({name: 'selectProject', query: {userId: this.checkList.join(',')}})
                } else {
                    this.Toast({
                        message: '请选择您邀请的对象',
                        position: 'bottom',
                        duration: 3000
                    })
                }
            },
            loadBottom() {
                this.pageData.pageNum++;
                this.getData(this.formData)
            },
        }
    }
</script>
