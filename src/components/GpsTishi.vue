<template>
    <div>
        <x-dialog v-model="gpsTishi" class="dialog-demo gpsTisi">
            <div class="img-box" v-if="cityAci && gpsCity">
                <p class="gpsTisi_p">当前产品出发地为{{cityAci.name}},</br>定位显示您在{{gpsCity.name}}，您可以</p>
                <button @click="go">切换到{{gpsCity.name}}</button>
                <button class="jixu" @click="back">继续浏览{{cityAci.name}}</button>
            </div>
        </x-dialog>
    </div>
</template>

<script>
    export default {
        name: 'GpsTishi',
        data() {
            return {
                showHideOnBlur: false,
            }
        },
        created(){

        },
        computed: {
            gpsCity(){
                return this.$store.state.shop.gpsCity;
            },
            cityAci(){
                return this.$store.state.shop.cityData.cityAci;
            },
            gpsTishi(){
                return this.$store.state.shop.gpsTishi || null;
            }
        },
        methods:{
            go(){
                this.$store.commit('UP_NLOADER',this.$store.state.shop.gpsCity);
                this.$store.commit('SET_CITYACI',this.$store.state.shop.gpsCity);
                this.$store.commit('SET_PRO_RECOMMEND', {data: null});
                this.$store.commit('SET_GPSTISHI',false);
                var listeners = this.$listeners['reset_data'];
                if(listeners) this.$emit('reset_data');
            },
            back(){
                this.$store.commit('SET_GPSTISHI',false)
            }
        },
    }
</script>
