<template>
    <div>
        <goods-item v-for="(pro, ind) of list" :pro="pro" :key="pro.p_id" :type="type" :class="{'item-last': ind==list.length-1}"
                    @showPopup="toShare"></goods-item>

        <up-popup :popup_edit1.sync="popup_edit1" :popup_edit2.sync="popup_edit2" :sharePro="sharePro"></up-popup>
    </div>
</template>

<script>
    import UpPopup from './components/home/UpPopup.vue'
    export default{
        name: 'goods-list',
        components: {[UpPopup.name]: UpPopup},
        props: ['list', 'type', 'popup_edit1', 'popup_edit2'],
        data(){
            return {
                sharePro: null
            }
        },
        methods: {
            toShare(pro, isUp){
                this.sharePro = pro;
                this.$store.commit('SetCacheUpPro', pro);
                if(isUp) this.popup_edit1 = true;
            }
        }
    }
</script>
