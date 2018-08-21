<template>
    <div>
        <popup v-model="popup_edit1" height="100%" is-transparent>
            <div class="box-popup-edit1">
                <div>
                    <div class="title tc font30 bd">商品已在你的店铺中</div>
                    <div class="bd sec2">
                        <div class="sec2-title">立即推广该商品</div>
                        <div class="to">
                            <div @click="doShare('wx')"><img src="../../assets/image/share_wechat.png" alt=""><p>微信</p></div>
                            <div @click="doShare('wxc')"><img src="../../assets/image/share_friend.png" alt=""><p>朋友圈</p></div>
                            <div @click="doShare('qrcode')"><img src="../../assets/image/share_qcode.png" alt=""><p>二维码</p></div>
                            <div @click="doShare('url')"><img src="../../assets/image/share_url.png" alt=""><p>复制商品链接</p></div>
                        </div>
                    </div>
                    <div class="ovh sec3 bd">
                        <img :src=shopInfoOfCurrentPro.org_logo alt="" class="fl">
                        <div class="ovh">
                            <div>{{shopInfoOfCurrentPro.org_name}}</div>
                            <div class="font22" style="margin-top: .1rem;">{{shopInfoOfCurrentPro.org_intro}}</div>
                            <div class="font-gray font22">关注该企业，方便找到他</div>
                        </div>
                        <button class="abs font22" :class="{changeBGColor: !isAttention}" @click="setAttention">{{isAttention?'已关注':'+关注'}}</button>
                    </div>
                    <div class="font30 sec4 tc font-theme" @click="popup_edit1_sure">确定</div>
                </div>
            </div>
        </popup>

        <popup v-model="popup_edit2" height="100%" is-transparent>
            <div class="box-popup-edit1">
                <div>
                    <div class="title tc font30 bd">商品上架成功</div>
                    <div class="bd sec2">
                        <div class="sec2-title">立即推广该商品</div>
                        <div class="to">
                            <div @click="doShare('wx')"><img src="../../assets/image/share_wechat.png" alt=""><p>微信</p></div>
                            <div @click="doShare('wxc')"><img src="../../assets/image/share_friend.png" alt=""><p>朋友圈</p></div>
                            <div @click="doShare('qrcode')"><img src="../../assets/image/share_qcode.png" alt=""><p>二维码</p></div>
                            <div @click="doShare('url')"><img src="../../assets/image/share_url.png" alt=""><p>复制商品链接</p></div>
                        </div>
                    </div>
                    <div class="ovh sec3 bd">
                        <img :src=shopInfoOfCurrentPro.org_logo alt="" class="fl">
                        <div class="ovh">
                            <div>{{shopInfoOfCurrentPro.org_name}}</div>
                            <div class="font22" style="margin-top: .1rem;">{{shopInfoOfCurrentPro.org_intro}}</div>
                            <div class="font-gray font22">关注该企业，方便找到他</div>
                        </div>
                        <button class="abs font22" :class="{changeBGColor: !isAttention}" @click="setAttention">{{isAttention?'已关注':'+关注'}}</button>
                    </div>
                    <div class="font30 sec4 tc font-theme" @click="popup_edit2_sure">确定</div>
                </div>
            </div>
        </popup>
    </div>
</template>

<script type="text/ecmascript-6">
    import {doShare} from '../../utils/utils.js';
    export default{
        name: 'up-popup',
        props: ['popup_edit1', 'popup_edit2', 'sharePro'],
        computed: {
            shopInfoOfCurrentPro(){
                return this.$store.getters.ShopInfoOfCurrnetPro;
            },
            isAttention(){
                var lists = this.$store.getters.attentionShopList;
                for(let i= 0; i <lists.length; i++){
                    if(this.shopInfoOfCurrentPro.org_id == lists[i].org_id){
                        return true;
                    }
                }
                return false;
            }
        },
        methods: {
            popup_edit1_sure(){
                this.$emit('update:popup_edit1', false)
            },
            popup_edit2_sure(){
                this.$emit('update:popup_edit2', false)
            },
            setAttention(){
                this.$store.dispatch('setAttentionShop', {set_type:this.isAttention==true?1:0, org_id: this.shopInfoOfCurrentPro.org_id}).then((data)=>{
                    this.$store.dispatch('getAttentionShopList');
                })
            },
            doShare(type){
                this.$emit('update:popup_edit1', false);
                this.$emit('update:popup_edit2', false);
                let param = {
                    title: this.sharePro.p_name,
                    text: this.sharePro.p_name,
                    thumb_img: this.sharePro.p_cover,
                    url: location.host + '/?#/productDetails?p_id=' + this.sharePro.p_id
                    + '&city_code=' + this.$store.state.shop.cityData.cityAci.code
                    + '&shopID=' + this.$store.state.shop.shopOrgInfo.u_id,
                    shareChannel: type
                };
                console.log(param);
                doShare(param)
            }
        }
    }
</script>
