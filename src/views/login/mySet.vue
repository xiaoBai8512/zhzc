<template>
    <div class="body myList">
        <laypage title="账号设置">
            <yd-cell-group>
                <yd-cell-item class="yd-cell-item_arrow" @click.native="goNext('modifyMobile')">
                    <span class="HHCellItem" slot="left">修改手机号</span>
                </yd-cell-item>
                <yd-cell-item class="yd-cell-item_arrow" @click.native="goNext('modifyPassword')">
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
            return {
            }
        },
        methods: {
            goNext(name) {
                this.$router.push({name: name})
            },
        }
    }
</script>
<style scoped>
    .back {

    }
</style>
