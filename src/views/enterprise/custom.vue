<template>
    <div class="body myList">
        <laypage title="我的邀请">
            <yd-cell-group>
                <yd-cell-item class="yd-cell-item_arrow">
                    <span class="HHCellItem" slot="left">修改手机号</span>
                </yd-cell-item>
                <yd-cell-item class="yd-cell-item_arrow">
                    <span class="HHCellItem" slot="left">修改密码</span>
                </yd-cell-item>
            </yd-cell-group>
        </laypage>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {}
        },
        methods: {
            goNext() {
                this.$router.push({name: 'loginIdentity'})
            },

        }
    }
</script>
<style scoped>
    .back {

    }
</style>
