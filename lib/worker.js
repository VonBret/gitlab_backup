/**
 * Created by keenfir on 2020/11/15.
 */
var download = require('download-git-repo');
var data = require('../data/list'); // 引入项目列表信息文件
var config = require('../config'); // 配置文件

var current_date = new Date().toLocaleDateString('chinese', { hour12: false }); // 获取当前日期

/**
 * 对外暴露的下载文件方法
 * @returns 
 */
exports.downloadFile = () => {
    return go().then(res => res).catch(err => err)
}

/**
 * 下载文件的方法
 */
function go() {
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
