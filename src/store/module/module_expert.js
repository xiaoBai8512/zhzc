import { apiRequest, apiRequestNormal, requestMethod, ajaxError } from '@/utils/api'

const expert  = {
    state:{
    },
    mutations:{

    },
    actions: {
        //搜索专家
        expertSearch :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/expert/search', 'POST', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //添加/删除备选
        preparePrepareUser :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/prepare/prepare_user', 'POST', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //我的备选
        prepareMyPrepares :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/prepare/my_prepares', 'POST', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //添加/删除收藏
        enterpriseFavorite :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/enterprise/favorite', 'POST', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //添加/删除收藏
        favoriteFavUser :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/favorite/fav_user', 'POST', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //添加/
        expertInfo :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/expert/info/'+obj, 'GET')
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //我的邀请
        inviteMyReceive :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/invite/my_receive', 'POST', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //我的邀请详情
        inviteGetInvitation :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/invite/get_invitation', 'GET', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //发送邀请（机构或企业 To 专家/实习生）
        inviteExpert :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/invite/expert', 'POST', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //搜索机构
        enterpriseSearch :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/enterprise/search', 'POST', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //机构详情
        enterpriseDetail :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/enterprise/detail/'+obj, 'GET')
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //打开/关闭接受邀请
        expertInvite :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/expert/invite/'+obj, 'GET')
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //机构详情
        inviteGetInvitation :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/invite/get_invitation', 'GET', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //承接
        inviteExpertUndertake :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/invite/expert/undertake', 'POST', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //定制
        serviceAdd :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/service/add', 'POST', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //定制列表
        serviceMyServices:function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/service/my_services', 'GET')
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //发送邀请（To:机构）
        inviteEnterprise:function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/invite/enterprise', 'POST', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //我的收藏
        favoriteMyFavs:function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/favorite/my_favs', 'POST', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //添加收藏
        favoritefFavUser:function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/favorite/fav_user', 'POST', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //我发出的邀请-机构To专家&实习生
        inviteMySend:function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/invite/my_send', 'POST', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //邀请函详情
        getEnterpriseInvitation:function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/invite/get_enterprise_invitation', 'GET', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //删除项目
        projectProjectsDel :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/project/'+obj+'/del', 'get', )
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //修改职位项目
        projectUpdateJob :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/project/update_job', 'post', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        // //新建职位
        // projectAddJob :function ({commit, state}, obj) {
        //     // return apiRequest('H5/User/login', 'post', obj)
        //     return new Promise((resolve, reject) => {
        //         apiRequest('/api/project/add_job', 'POST', obj)
        //             .then(data => {
        //                 resolve(data)
        //             })
        //             .catch(err => {
        //                 reject(err)
        //             });
        //     })
        // },
        // //我的项目&职位清单
        // projectAll :function ({commit, state}, obj) {
        //     // return apiRequest('H5/User/login', 'post', obj)
        //     return new Promise((resolve, reject) => {
        //         apiRequest('/api/project/all', 'GET', obj)
        //             .then(data => {
        //                 resolve(data)
        //             })
        //             .catch(err => {
        //                 reject(err)
        //             });
        //     })
        // },
        // 删除职位

        projectJobDetailsH :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/project/job/'+obj+'/del', 'GET')
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        // //项目详情
        // projectPidDetails :function ({commit, state}, obj) {
        //     // return apiRequest('H5/User/login', 'post', obj)
        //     return new Promise((resolve, reject) => {
        //         apiRequest('/api/project/'+obj+'/detail', 'GET')
        //             .then(data => {
        //                 resolve(data)
        //             })
        //             .catch(err => {
        //                 reject(err)
        //             });
        //     })
        // },
    }
}

export default expert
