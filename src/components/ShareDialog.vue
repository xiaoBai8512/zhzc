<template>
    <!--<div class="share_dialog"></div>-->
    <popup v-model="currentValue">
        <div class="share_div" v-show="!showqrcode">
            <div class="share_item_div">
                <div class="item_div" v-for="(item, index) in items" @click="doShare(index)">
                    <img class="share_icon" :src="item.icon"/>
                    <label class="share_label">{{item.label}}</label>
                </div>
            </div>
            <div class="share_cancel label_center_button"  @click="doCancel">
                <span class="share_cancel_text">取消</span>
            </div>
        </div>
    </popup>
</template>

<script>
    import Popup from "vux/src/components/popup/index";
    import {callNative} from '../utils/setBridge'

    export default {
        props: ['value', 'title', 'content', 'thumb_img', 'url', 'hideQRCode'],
        data() {
            return {
                currentValue: this.value,
                items: [
                    {
                        icon: require('../assets/image/share_wechat.png'),
                        label: '微信'
                    },
                    {
                        icon: require('../assets/image/share_friend.png'),
                        label: '朋友圈'
                    },
                    {
                        icon: require('../assets/image/share_qcode.png'),
                        label: '二维码'
                    },
                    {
                        icon: require('../assets/image/share_url.png'),
                        label: '复制商品链接'
                    },
                ],
                qrcodeValue: null,
                showqrcode: false
            }
        },
        created() {
            if (this.hideQRCode) {
                this.items = [
                    {
                        icon: require('../assets/image/share_wechat.png'),
                        label: '微信'
                    },
                    {
                        icon: require('../assets/image/share_friend.png'),
                        label: '朋友圈'
                    },
                    {
                        icon: require('../assets/image/share_url.png'),
                        label: '复制商品链接'
                    },
                ]
            }
        },
        mounted() {

        },
        watch: {
            value: function (val) {
                this.currentValue = val;
            },
            currentValue(val) {
                if (!val) {
                    this.$emit('input', false)
                    this.showqrcode = false
                }
            }
        },
        components: {Popup},
        computed: {},
        methods: {
            doShare: function (index) {
                this.show = false

                let param = {
                    'title': this.title,
                    'text': this.content,
                    'thumb_img': this.thumb_img,
                    'url': this.url
                }
                switch (index) {
                    case 0:
                        param['shareChannel'] = 'wx'
                        break
                    case 1:
                        param['shareChannel'] = 'wxc'
                        break
                    case 2:
                        param['shareChannel'] = 'qrcode'
                        break
                    case 3:
                        param['shareChannel'] = 'url'
                        break
                }
                console.info('requestShare')
                callNative("requestShare", param, data => {
                })
                this.doCancel()

            },
            doCancel: function () {
                console.info('do cancel')
                this.showqrcode = false
                this.currentValue = false
                this.$emit('input', false)
            },
        }
    }
</script>
