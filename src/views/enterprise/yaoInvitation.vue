<template>
    <div class="body enterpriseExperts">
        <template v-if="$route.query.send=='TO_EXPERT'">
            <menYaoQing></menYaoQing>
        </template>
        <template v-else>
            <xinYaoQing></xinYaoQing>
        </template>
    </div>
</template>

<script>
    import Prepare from '../../components/Prepare'
    import menYaoQing from './component/menYaoQing'
    import xinYaoQing from './component/xinYaoQing'
    import {mapGetters} from 'vuex'

    export default {
        name: 'my',
        components: {Prepare, menYaoQing, xinYaoQing},
        computed: {
            ...mapGetters(['type'])
        },
        data() {
            return {
            }
        },
        created() {
        },
    }
</script>
