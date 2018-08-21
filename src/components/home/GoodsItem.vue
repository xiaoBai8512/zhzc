<template>
    <div class="item-pro" @click.stop="toProDetail(pro, $event)">
        <div class="box-img-pro img-center-cover" :style="{backgroundImage: 'url('+pro.p_cover+')'}">
            <span class="type">{{pro.p_type_name}}</span>
            <span class="sp tc">{{pro.start_place_detail && pro.start_place_detail[0] && pro.start_place_detail[0].name}}</span>
        </div>
        <div class="product-info">
            <p class="product-info-name coll2">{{pro.p_name}}</p>
            <div class="product-info-item item1 font22">
                <span class="normal-mr inline-flex"><img src="../../assets/icons/shelves/home-6@3x.png" alt=""><span>{{pro.shop_name}}</span></span>
                <span class="inline-flex"><img src="../../assets/icons/shelves/time-6@3x.png" alt=""><span style="width: 3rem;" class="coll">团期: {{pro.bus_lists || pro.buslist.min}}</span></span>
            </div>
            <div class="product-info-item font20">
                <span class="normal-mr"><span class="font24 font-theme bold">{{pro.ticket_min | n2m({prefix: '¥', suffix: 0})}}</span><span class="font-label">起</span></span>
                <span><span class="bold">门市价: {{pro.t_trade_price | n2m({prefix: '¥', suffix: 0})}}</span></span>
                <span><span class="font-gray">利: {{pro.t_profit | n2m({prefix: '¥', suffix: 0})}}</span></span>
            </div>
        </div>
        <div class="oper" v-if="type=='home'">
            <!--<x-icon type="ios-checkmark-outline" size="20" class="icon-theme"></x-icon>-->
            <!--<x-icon type="ios-plus-outline" size="20"></x-icon>-->
            <img class="oper4" src="../../assets/icons/shelves/gg@2x.png" alt="" v-show="pro.added==1">
            <img class="oper4" src="../../assets/icons/shelves/tj@2x.png" alt="" v-show="pro.added==2">
        </div>
        <div class="oper" v-else-if="type=='add' || type=='c'"></div>
        <div class="oper" v-else>
            <div class="cir">...</div>
            <div v-show="showOper" class="oper1">
                <ul class="oper2">
                    <li class="oper3" v-if="pro.p_prefer_status=='上架'" @click.stop="share(pro)"><img class="oper4" src="../../assets/icons/shelves/tg@2x.png" alt="">推广</li>
                    <li class="oper3" @click.stop="toEdit(pro)"><img class="oper4" src="../../assets/icons/shelves/bj@2x.png" alt="">编辑</li>
                    <li class="oper3" @click.stop="toCate(pro)"><img class="oper4" src="../../assets/icons/shelves/sl@2x.png" alt="">分类</li>
                    <li class="oper3" v-show="pro.p_prefer_status=='上架'" @click.stop="proUpDown('down', pro.p_id)"><img class="oper4" src="../../assets/icons/shelves/xj@2x.png" alt="">下架</li>
                    <li class="oper3" v-show="pro.p_prefer_status=='下架'" @click.stop="proUpDown('up', pro.p_id)"><img class="oper4" src="../../assets/icons/shelves/sj@2x.png" alt="">上架</li>
                    <li class="oper3" v-show="pro.p_prefer_status=='下架' || pro.p_prefer_status=='售罄'" @click.stop="delPro(pro)"><img class="oper4" src="../../assets/icons/shelves/sc@2x.png" alt="">删除</li>
                    <li class="oper3" v-show="pro.p_prefer_status=='上架'" @click.stop="toTop(pro)"><img class="oper4 toup" src="../../assets/icons/shelves/yz@2x.png" alt="">移至顶部</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        name: 'goods-item',
        props: {
            pro: [Object],
            type: {} // ['home', 'pro_manage', 'add', 'cate_list'] //首页商品，小b店铺商品，选择分类商品, 分类列表
        },
        data(){
            return{
                showOper: false,
                cns: ['oper', 'cir', 'oper1', 'oper2', 'oper3', 'oper4'],
                tns: ['svg', 'path']
            }
        },
        methods: {
            toTop(pro){
                this.$store.commit('PROMPT', {text: '确定将该商品移到顶部?', eventRight: () => {
                    this.showOper = false;
                    this.$store.dispatch('topRecommend', {p_id: pro.p_id}).then(() => {
                        this.$emit('notify_top')
                    })
                }});
            },
            delPro(pro){
                this.$store.commit('PROMPT', {text: '确定将该商品删除?', eventRight: () => {
                    this.showOper = false;
                    this.$store.dispatch('referProductDel', {p_rid: pro.p_rid}).then(() => {
                        if(this.type=='cate_list') this.$store.commit('ResetCacheAll');
                        this.$store.commit('ResetQyProList');
                        this.$emit('notify_del')
                    })
                }});
            },
            toEdit(pro){
                this.$router.push({name: 'productShelve', query: {p_id: pro.p_id}})
            },
            //设置分类
            toCate(pro){
                this.$router.push({name: 'categoryChoose', query: {p_id: pro.p_id, p_rid: pro.p_rid, p_cate_id: pro.p_cate_id}})
            },
            share(pro){
                this.showOper = false;
                this.$emit('share', pro)
            },
            //上架／下架
            proUpDown(type, p_id){
                var typeDesc = type=='up'?'上架':'下架';
                this.$store.commit('PROMPT', {text: `确定将该商品${typeDesc}?`, eventRight: () => {
                    this.showOper = false;
                    this.$store.dispatch('referUpDown', {type, p_id}).then(() => {
                        this.$store.commit('PROMPT', {text: `商品${typeDesc}成功`, type: 'prompt'});
                        this.$emit('notify_ud')
                    })
                }});
            },
            toProDetail(pro, $event){
                var id = pro.p_id;
                if(this.type == 'add'){
                    this.$emit('add')
                }else{
                    console.log($event.target.className, $event.target.tagName)
                    var cn = $event.target.className;
                    var tn = $event.target.tagName;
                    if(this.cns.indexOf(cn) == -1 && this.tns.indexOf(tn) == -1){
                        this.$router.push({name: 'productDetails', query: {p_id: id}})
                    }
                    else{
                        if(this.type=='home'){
                            if(pro.added==1){
                                //弹出框，提示商品已在你的店铺中
                                this.$emit('showPopup', pro, true);
//                            this.$emit('showPopup', pro, false);
//                            this.$router.push({name: 'productShelve', query: {p_id: id}})
                            }else{
                                this.$emit('showPopup', pro, false);
                                this.$router.push({name: 'productShelve', query: {p_id: id}})
                            }
                        }else{
                            this.showOper = !this.showOper;
                            if(this.showOper){
                                this.$store.commit('SetOperId', this.pro.p_id)
                            }
                        }
                    }
                }

            }
        },
        computed: {
            orgType(){
                return this.$store.state.orgType
            },
            operActiveId(){
                return this.$store.state.shelves.operActiveId
            }
        },
        watch: {
            operActiveId(id){
                if(id != this.pro.p_id){
                    this.showOper = false
                }
            }
        }
    }
</script>
