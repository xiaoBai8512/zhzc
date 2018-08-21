<style>
    .Headup_body {
        /*margin: 0;*/
        /*text-align: center;*/
        /*width: 100%;*/
        /*height: 100vh;*/
        /*min-height: 100%;*/
        /*overflow: hidden;*/
        /*position: absolute;*/
        /*z-index: 9999;*/
    }
    .clipArea_box{
        width: 100%;
        height: 100%;
        position: fixed;
        top:0;
        left: 0;
        z-index:9999;
        /*visibility: hidden;*/
    }
    #clipArea {
        height:100%;
    }
    #close,
    #file,
    #clipBtn {
        /*margin: 20px;*/
        position: absolute;
        z-index:9999;
    }
    #clipBtn{
        width: 50%;
        height: 50px;
        position: absolute;
        bottom:0%;
        right:0;
        border-radius: 0;
        font-size: .4rem;
        border-radius: 0;
        background-color: #ffa800;
        color: #fff;
    }
    #view {
        margin: 0 auto;
        width: 200px;
        height: 200px;
        background-color: #666;

    }
    #close{
        width: 50%;
        height: 50px;
        position: absolute;
        bottom:0%;
        left:0;
        background-color: #fff;
        border-radius: 0;
        font-size: .4rem;
    }
    #inputBox{

    }
    #file{
        width: 100%;
        height:1.387rem;
        opacity: 0;
    }
    #view{
        width: 100px;
        height:100px;
    }
</style>
<template>
    <div class="Headup_body" ontouchstart="" >
        <div class="clipArea_box" :style="{visibility:visibility}">
            <button  id="clipBtn" @click="ok">截取</button>
            <button id="close" @click="close">返回</button>
            <div ref="clipArea" id="clipArea" style="user-select: none; overflow: hidden; position: relative;"><div class="photo-clip-layer" style="position: absolute; left: 50%; top: 50%; width: 460px; height: 460px; margin-left: -230px; margin-top: -230px;"><div class="photo-clip-move-layer" style="transform-origin: 0px 0px 0px; transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(230px, 230px) scale(1) translateZ(0px); width: 0px; height: 0px;"><div class="photo-clip-rotation-layer"></div></div></div><div class="photo-clip-mask" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; pointer-events: none;"><div class="photo-clip-mask-left" style="position: absolute; left: 0px; right: 50%; top: 50%; bottom: 50%; width: auto; background-color: rgba(0, 0, 0, 0.5); margin-right: 230px; margin-top: -230px; margin-bottom: -230px;"></div><div class="photo-clip-mask-right" style="position: absolute; left: 50%; right: 0px; top: 50%; bottom: 50%; background-color: rgba(0, 0, 0, 0.5); margin-left: 230px; margin-top: -230px; margin-bottom: -230px;"></div><div class="photo-clip-mask-top" style="position: absolute; left: 0px; right: 0px; top: 0px; bottom: 50%; background-color: rgba(0, 0, 0, 0.5); margin-bottom: 230px;"></div><div class="photo-clip-mask-bottom" style="position: absolute; left: 0px; right: 0px; top: 50%; bottom: 0px; background-color: rgba(0, 0, 0, 0.5); margin-top: 230px;"></div><div class="photo-clip-area" style="border: 2px dashed rgb(221, 221, 221); position: absolute; left: 50%; top: 50%; width: 260px; height: 260px; transform: translate(-50%, -50%);"></div></div></div>
        </div>
        <div id="inputBox" :style="{'width':width, 'height': width}">

                <input ref="file" accept="image/*"  type="file" id="file" @change="change">

            <input ref="file" accept="image/*"  type="file" id="file" @change="change">
            <!--<input ref="file" accept="image/*"  type="file" id="file" @change="change" :style="{'width':width+'px','height':width+'px','margin-left':-width/2+'px'}">-->
            <!--<div ref="view"  id="view" :style="{'background-repeat': 'no-repeat', 'background-position': 'center', 'background-size': 'contain','width':width+'px','height':width+'px','background-image':'url('+bgu+')'} "></div>-->
        </div>
    </div>
</template>
<script>
    import PhotoClip from 'photoclip'
    export default {
        name: 'Headup',
        data(){
            return{
                bgu:this.value,
                visibility:'hidden',
            }
        },
        props:['width','value'],
        created(){
//            this.bgu=this.v-model;
        },
        methods:{
            change(){
                this.visibility='visible';
            },
            ok(){
                this.visibility='hidden';
            },
            close(){
                this.visibility='hidden';
            },
            dataURItoBlob(dataURI) {
                var byteString = atob(dataURI.split(',')[1]);
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                return new Blob([ab], {type: mimeString});
            }
        },
        mounted(){
            var self=this;
            var pc = new PhotoClip('#clipArea', {
                adaptive: ['60%'],
                file: '#file',
                view: '#view',
                ok: '#clipBtn',
                loadStart: function() {
//                    console.log('开始读取照片');
                },
                loadComplete: function() {
//                    console.log('照片读取完成');
                },
                done: function(dataURL) {
                    self.$store.dispatch('Upload',self.dataURItoBlob(dataURL)).then(a=>{
                        self.$store.dispatch('PostStoreUpdate',{org_logo:a}).then(()=>{
                            self.$store.dispatch('GetStoreInfo');
                            self.$store.commit('PROMPT', {type: 'prompt', text: '修改成功'});
                        }).catch(a=>{
                            self.$store.commit('PROMPT', {type: 'prompt', text: 'a'});
                        });
                    });
//                    var sss = self.dataURItoBlob(dataURL);
//                    self.$emit('input', dataURL);
//                    self.$emit('getData', dataURL);
                },
                fail: function(msg) {
                    alert(msg);
                }
            });
        }
    }
</script>
