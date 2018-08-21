import { apiRequest, apiRequestNormal, requestMethod, ajaxError } from '@/utils/api'

const user  = {
    state:{
    },
    mutations:{

    },
    actions: {
        //修改手机号
        chgMobile :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/u/update_mobile', 'POST', obj)
                    .then(data => {
                        let inDate = this.user;
                        inDate.mobile = obj.mobile;
                        this.$store.commit('SET_USER', inDate);
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },

        //修改密码
        chgPassword :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/u/update_password', 'POST', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },

        //重置密码
        resetPassword :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/user/reset_password', 'POST', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },

        //修改头像
        updateAvatar :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/u/update_avatar', 'GET', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },

        //获取专家认证信息
        getExpertCertInfo :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/expert/my_cert_info', 'GET', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },

        //专家提交认证信息
        submitExpertCertInfo :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/expert/certification', 'POST', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },

        //获取多个专家信息
        getExpertList :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/expert/get_expert_list', 'POST', obj)
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

export default user
