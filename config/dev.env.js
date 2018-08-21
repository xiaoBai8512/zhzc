'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
// const base_url = 'http://ff-test.66580.cn/'
// const base_url = 'http://192.168.199.187:3000/'
const base_url = ''

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_URL: JSON.stringify(base_url),
    VERSION: '"1.1.0"'
})
