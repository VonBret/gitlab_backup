const fs = require('fs');
const path = require('path');

var api = require('./api');
var config = require('../config');

var file = path.resolve(__dirname, '../data/list.js')

var projects;

exports.write = async () => {
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
    } else {
        let user = await api.login({
            login: config.login,
            password: config.password
        });
        if(user.status == 201) {
            projects = await api.getProjects({
                page:1,
                per_page:user.data.projects_limit,
                token: user.data.private_token,
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
            }
        }
    }
}