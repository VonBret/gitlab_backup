var download = require('download-git-repo');
var data = require('../data/list');
var config = require('../config');

var current_date = new Date().toLocaleDateString('chinese', { hour12: false }); // 获取日期

exports.downloadFile = () => {
    return go().then(res => res).catch(err => err)
}

/**
 * 下载
 */
function go() {
    var count = 0, ratio = 0;
    return new Promise((resolve, reject) => {
        Array.isArray(data) && data.forEach(item => {
            item.http_url_to_repo = insertStr(item.http_url_to_repo,7,`${config.login}:${config.password}@`);
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
