<template>
    <div>
        <companyIndex v-if="type==4"></companyIndex>
        <expertsIndex v-else></expertsIndex>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import companyIndex from './component/companyIndex'
    import expertsIndex from './component/expertsIndex'
    export default {
        components: {companyIndex, expertsIndex},
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters([
                'type',
            ]),
        },
    }
</script>
