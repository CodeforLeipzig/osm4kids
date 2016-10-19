// source: http://shapeshed.com/writing-cross-platform-node/

var os = require('os');
var exec = require('child_process').exec;
var exec_this = "";

if (os.platform() == ('win32' || 'win64')) {
    exec_this = "node_modules\\.bin\\tsc.cmd";
} else {
    exec_this = "./node_modules/.bin/tsc";
}

exec(exec_this, (error, stdout, stderr) => {
    if (error) {
        console.error(`[err] error: ${error}`);
        console.log(`[err] stdout: ${stdout}`);
        console.log(`[err] stderr: ${stderr}`);
        return;
    }
    console.log(`[ok] stdout: ${stdout}`);
    console.log(`[ok] sstderr: ${stderr}`);
});
