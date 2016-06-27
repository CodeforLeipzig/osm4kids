// source: http://shapeshed.com/writing-cross-platform-node/

var os = require('os');
var exec = require('child_process').exec;
var exec_this = "";

if (os.platform() == ('win32' || 'win64')) {
    exec_this = "node_modules\\.bin\\typings install && node_modules\\.bin\\tsc";
}
else {
    exec_this = "./node_modules/.bin/typings install && ./node_modules/.bin/tsc";
}

exec(exec_this, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});