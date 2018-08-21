import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// import module_normal from './module/module_normal'
import module_login from './module/module_login'
import module_set from './module/module_set'
import module_project from './module/module_project'
import module_expert from './module/module_expert'
import module_invitation from './module/module_invitation'
import module_user from './module/module_user'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
    modules: {
        login: module_login,
        set: module_set,
        project: module_project,
        expert: module_expert,
        invitation: module_invitation,
        user: module_user,
    },
    // plugins: plugins,
    strict: false
})

export default store
