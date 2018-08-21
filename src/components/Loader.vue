<template>
    <div v-show="showLoad" class="loading-full">
        <div class="indicator-wrapper">
            <div class="spinner"></div>
        </div>
        <div class="mask-wrapper"></div>
    </div>
    <!--<div v-else class="loading" :style="{height: height}"><div></div></div>-->
</template>

<script>
    export default {
        name: 'Loader',
        computed: {
            showLoad(){
                return this.$store.state.load
            }
        }
    }
</script>
