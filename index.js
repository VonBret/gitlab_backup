var fetch = require('./lib/fetch');
var worker = require('./lib/worker');

async function main () {
    await fetch.write();
    await worker.downloadFile();
}
  
main();