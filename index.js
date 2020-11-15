var dotenv = require("dotenv");
dotenv.config();

var directory = require('./lib/directory');
var fetch = require('./lib/fetch');
var worker = require('./lib/worker');

async function main () {
    await directory.delFilesFolders();
    await fetch.write();
    await worker.downloadFile();
}
  
main();