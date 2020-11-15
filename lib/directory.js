const fs = require('fs');
var path_name = require('../config').path_name;
var current_date = new Date().toLocaleDateString('chinese', { hour12: false }); // 获取日期

/**
 * 递归删除所有的文件(将所有文件夹置空)
 * @param {String} fileUrl 
 */
function emptyDir(fileUrl) {
    var files = fs.readdirSync(fileUrl); // 读取该文件夹目录
    Array.isArray(files) && files.forEach(file => {
        var current_fileUrl = fileUrl + "/" + file;
        var stats = fs.statSync(current_fileUrl);
        if(stats.isDirectory()){
            emptyDir(current_fileUrl);
        }else{
            fs.unlinkSync(current_fileUrl); 
            console.log("删除旧文件：" + fileUrl + '/' + file + " 成功")
        }
    })
}

/**
 * 递归删除所有的空文件夹
 * @param {String} fileUrl 
 */
function rmEmptyDir(fileUrl){
    var files = fs.readdirSync(fileUrl);
    if(files.length > 0){
        var tempFile = 0;
        files.forEach(fileName => {
            tempFile++;
            rmEmptyDir(fileUrl+'/'+fileName);
        });
        // 删除母文件夹下的所有字空文件夹后，将母文件夹也删除
        if(tempFile == files.length){
            fs.rmdirSync(fileUrl);
            console.log('删除空文件夹：' + fileUrl + ' 成功');
        }
    }else{
        fs.rmdirSync(fileUrl);
        console.log('删除空文件夹：' + fileUrl + ' 成功');
    }
}

/**
 * 删除文件和空文件夹
 */
exports.delFilesFolders = async () => {
    var files = fs.readdirSync(path_name); // 读取该文件夹目录
    if(files.includes(current_date)) {
        await emptyDir(path_name + '/' + current_date);
        await rmEmptyDir(path_name + '/' + current_date)
    }
}