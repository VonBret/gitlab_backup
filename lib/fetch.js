/**
 * Created by keenfir on 2020/11/15.
 */
var { httpRequest } = require('./httpRequest');
var download = require('download-git-repo');
var config = require('../config');
var current_date = new Date().toLocaleDateString('chinese', { hour12: false }); // 获取当前日期
var projects; // 暂存项目列表信息数据

/**
 * 下载文件的方法
 */
function go(data) {
    var count = 0, ratio = 0;
    return new Promise((resolve, reject) => {
        Array.isArray(data) && data.forEach(item => {
            // 将账号密码添加到下载连接中
            item.http_url_to_repo = insertStr(item.http_url_to_repo,7,`${config.login}:${config.password}@`);
            // 开始下载文件，并保存到配置文件中指定的本地目录
            download(`direct:${item.http_url_to_repo}`, `${config.path_name}/${current_date}/${item.name}`, {clone: true}, err => {
                ratio = Math.round((count)/data.length*100);
                count++;
                console.log(`[${ratio}%] 数据下载中,请稍后...`);
                if(count == data.length) {
                    ratio = 100;
                    setTimeout(() => console.log(`[${ratio}%] 数据下载完成...`) ,3000)
                }
                if (!err) {
                    resolve(null)
                } else {
                    reject(err)
                }
            })
        })
    })
}

/**
 * 为字符串插入字符
 * @param {String} soure 原字符串
 * @param {Number} start 将要插入字符的位置
 * @param {String} newStr 要插入的字符
 * @returns String
 */
function insertStr(soure, start, newStr){   
    return soure.slice(0, start) + newStr + soure.slice(start);
}

exports.write = async () => {
    console.log("即将开始下载数据，请稍后...");
    // 通过配置文件中配置的 私有授权 获取项目列表信息
    var params = {};
    params.page = 1;
    params.per_page = 999999999;
    params.token = config.private_token;
    let url = `/api/v3/projects?pages=${params.page}&per_page=${params.per_page}`;
    projects = await httpRequest(url, 'GET', { private_token: params.token }).then(res => res).catch(err => err);
    if(projects.status == 200){
        return await go(projects.data).then(res => res).catch(err => err)
    } else { // 如果配置文件中配置的私有权限，无权访问，就通过配置文件中配置的账号密码登录获取私有权限
        params = {};
        params.login = config.login;
        params.password = config.password;
        let url = '/api/v3/session';
        let user = await httpRequest(url, 'POST', params).then(res => res).catch(err => err);
        if(user.status == 201) {
            // 通过私有权限获取项目列表信息
            params = {};
            params.page = 1;
            params.per_page = user.data.projects_limit;
            params.token = user.data.private_token;
            let url = `/api/v3/projects?pages=${params.page}&per_page=${params.per_page}`;
            projects = await httpRequest(url, 'GET', { private_token: params.token }).then(res => res).catch(err => err);
            if(projects.status == 200){
                return await go(projects.data).then(res => res).catch(err => err)
            }
        }
    }
}