<template>
    <div class="layout">
        <slot name="header"></slot>
        <div class="layout_content">
            <slot>
            </slot>
        </div>
        <slot name="footer">
            <navigator></navigator>
        </slot>
    </div>
</template>

<script>
    import navigator from './Navigator.vue'
    import foot from './Foot.vue'
    export default{
        name: 'Layout',
        components: {navigator, foot},
        computed: {
            isB(){
                return this.$store.state.orgType=='seller'
            }
        }
    }
</script>
<style scoped>
    .layout{
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .layout_content{
        overflow: auto;
        flex-grow: 2;
    }
</style>
