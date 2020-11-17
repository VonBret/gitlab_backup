/**
 * Created by keenfir on 2020/11/15.
 */
var dotenv = require("dotenv"); // .env 文件支撑
dotenv.config();

var directory = require('./lib/directory');
var fetch = require('./lib/fetch');

// 入口函数
async function main () {
    await directory.delFilesFolders();
    await fetch.write();
}
  
main();