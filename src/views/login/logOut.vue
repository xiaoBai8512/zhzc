<template>
    <div class="body loginUserInfo">
        <laypage class="headShadow">
            <div>
                呵呵 你退出了哟
            </div>
        </laypage>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {

            }
        },
        created() {
            this.$nextTick(()=>{
                this.$store.dispatch('userLoginOut')
            })
        },

    }
</script>

