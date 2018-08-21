<template>
    <div class="fishermanIdentity" :style="{'width':width,'height':height}">
        <div class="imgUp_content" :style="{'width':width,'height':height}">
            <div class="img_box" ref='img_box'>
                <p key="identity-input1"
                   :style="{'background-repeat': 'no-repeat', 'background-position': 'center', 'background-size': 'contain','background-image':'url('+bgu+')'}">
                    <!--:style="{'background-repeat': 'no-repeat', 'background-position': 'center', 'background-size': 'contain','width':width+'px','height':width+'px','background-image':'url('+bgu+')'-->
                    <input type="file" accept="image/*" name="picture1" @change='imgUpdata($event)'>
                </p>
            </div>
            <div class="imgUp_mask" v-if="off">
                <div class="imgUp_mask_box">
                    <div class="indicator-wrapper">
                        <div class="spinner"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import lrz from 'lrz'

    export default {
        name: 'ImgUp',
        data() {
            return {
                bgu: this.value,
                requireData: '',
                qualityData: 0.8,
                off: false,
            }
        },
        props: ['width', 'height', 'value'],
        created() {
            if (typeof FileReader == 'undefined') {
                this.$store.commit('PROMPT', {type: 'prompt', text: '抱歉，你的浏览器不支持FileReader'})
            }
        },
        methods: {
            dataURItoBlob(dataURI) {
                var byteString = atob(dataURI.split(',')[1]);
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                return new Blob([ab], {type: mimeString});
            },
            imgUpdata(event) {
                var self = this;
                if (event.target.files.length == 0) {
                    this.$store.commit('PROMPT', {type: 'prompt', text: '请选择文件'})
                } else if (!/image\/\w+/.test(event.target.files[0].type)) {
                    this.$store.commit('PROMPT', {type: 'prompt', text: '请确保文件类型为图像类型'})
                    return false;
                } else {
                    this.off = true;
                    // if (event.target.files[0].size < 1048576) this.qualityData = 1;
                    // if (event.target.files[0].size > (1048576 * 1.5)) this.qualityData = 0.7;
                    // if (event.target.files[0].size > (1048576 * 3.5)) this.qualityData = 0.6;
                    // var width = event.target.files[0].width;
                    // console.log(event.target.files[0])
                    // width = width > 1024 ? 1024 : width;

                    lrz(event.target.files[0], {width: 1024})
                        .then(function (rst) {
                            // let upTime=setTimeout(function () {
                            //     self.off=false;
                            //     self.$store.commit('PROMPT', {type: 'prompt', text: '抱歉，图片压缩失败,请重试。'})
                            // }.bind(this),30000)
                            self.$store.dispatch('Upload', self.dataURItoBlob(rst.base64))
                                .then(a => {
                                    self.bgu = a;
                                    self.$emit('input', a);
                                    self.$emit('getData', a);
                                    self.off = false;
                                    // clearInterval(upTime);
                                }).catch(err => {

                                self.off = false;
                                // clearInterval(upTime);

                                self.$store.commit('PROMPT', {
                                    type: 'prompt',
                                    text: '上传图片失败'
                                })
                            });
                        })
                        .catch(function (err) {
                            // 处理失败会执行
                            self.off = false;
                            self.$store.commit('PROMPT', {type: 'prompt', text: '抱歉，图片压缩失败'})
                        })
                        .always(function () {
                            // 不管是成功失败，都会执行
                        });
                }
                ;
            },
        },
    }
</script>
