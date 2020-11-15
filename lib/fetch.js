const fs = require('fs');
const path = require('path');

var api = require('./api');
var config = require('../config');

// 需要写入数据的文件
var file = path.resolve(__dirname, '../data/list.js')

var projects; // 暂存项目列表信息数据

exports.write = async () => {
    // 通过配置文件中配置的 私有授权 获取项目列表信息
    projects = await api.getProjects({
        page:1,
        per_page: 999999999,
        token: config.private_token,
    })
    if(projects.status == 200){
        // 异步写入数据到文件
        await fs.writeFile(file, 'module.exports = ' + JSON.stringify(projects.data), err => {
            if(!err) {
                console.log("[100%] 数据源获取完成...");
            } else {
                console.log("数据源写入失败...");
            }
        })
    } else { // 如果配置文件中配置的私有权限，无权访问，就通过配置文件中配置的账号密码登录获取私有权限
        let user = await api.login({
            login: config.login,
            password: config.password
        });
        if(user.status == 201) {
            // 通过私有权限获取项目列表信息
            projects = await api.getProjects({
                page:1,
                per_page:user.data.projects_limit,
                token: user.data.private_token,
            })
            if(projects.status == 200){
                // 异步写入项目列表信息数据到文件
                await fs.writeFile(file, 'module.exports = ' + JSON.stringify(projects.data), err => {
                    if(!err) {
                        console.log("[100%] 数据源获取完成...");
                    } else {
                        console.log("数据源写入失败...");
                    }
                })
            }
        }
    }
}