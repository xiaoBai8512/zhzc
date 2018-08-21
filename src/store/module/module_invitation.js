import { apiRequest, apiRequestNormal, requestMethod, ajaxError } from '@/utils/api'

const invitation  = {
    state:{
    },
    mutations:{

    },
    actions: {
        //删除专家邀请
        delInvitation :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/invite/del_invitation', 'GET', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },

        //删除机构邀请
        delEntInvitation :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/invite/del_ent_invitation', 'GET', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },

        //确认与专家的合作
        confirmCooperationToExpert :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/invite/expert/confirm_cooperation', 'POST', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },

        //确认与机构的合作
        confirmCooperationToEnterprise :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/invite/enterprise/confirm_cooperation', 'POST', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },

    }
}

export default invitation
