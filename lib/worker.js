var download = require('download-git-repo');
var data = require('../data/list');

var current_date = new Date().toLocaleDateString('chinese', { hour12: false }); // 获取日期

exports.downloadFile = () => {
    return go().then(res => res).catch(err => err)
}

/**
 * 下载
 */
function go() {
    var count = 0, ratio;
    return new Promise((resolve, reject) => {
        Array.isArray(data) && data.forEach(item => {
            download(`direct:${item.http_url_to_repo}`, `E:/1_Project/Project_Backup/${current_date}/${item.name}`, {clone: true}, err => {
                ratio = parseInt((count)/data.length*100);
                count++;
                if(count < data.length) {
                    console.log(`数据下载中,请稍后... [${ratio}%] \n`);
                }
                if(count == data.length) {
                    ratio = 100;
                    console.log(`数据下载完成！[${ratio}%] \n`);
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
