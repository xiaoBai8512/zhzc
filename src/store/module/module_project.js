import { apiRequest, apiRequestNormal, requestMethod, ajaxError } from '@/utils/api'

const project  = {
    state:{
    },
    mutations:{

    },
    actions: {
        //新增项目
        projectAdd :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/project/add', 'POST', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //项目列表
        projectMyProjects :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/project/my_projects', 'POST', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //新建职位
        projectAddJob :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/project/add_job', 'POST', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //我的项目&职位清单
        projectAll :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/project/all', 'GET', obj)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //获取职位详情
        projectJobDetails :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/project/job/'+obj, 'GET')
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    });
            })
        },
        //项目详情
        projectPidDetails :function ({commit, state}, obj) {
            return new Promise((resolve, reject) => {
                apiRequest('/api/project/'+obj+'/detail', 'GET')
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

export default project
