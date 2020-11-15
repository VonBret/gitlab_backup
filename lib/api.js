var { httpRequest } = require('./httpRequest')

module.exports = {

    // 登录
    login: (params) => {
        let url = '/api/v3/session';
        return httpRequest(url, 'POST', params).then(res => res).catch(err => err)
    },

    // 获取项目列表
    getProjects: (params) => {
        let url = `/api/v3/projects?pages=${params.page}&per_page=${params.per_page}`;
        return httpRequest(url, 'GET', { private_token: params.token }).then(res => res).catch(err => err)
    },

}
