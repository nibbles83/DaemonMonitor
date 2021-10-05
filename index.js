var shell = require('shelljs');

processName = 'metrixd';
processPath = '/usr/local/bin'
    
function execAsync(cmd, opts={}) {
    return new Promise(function(resolve, reject) {
        // Execute the command, reject if we exit non-zero (i.e. error)
        shell.exec(cmd, opts, function(code, stdout, stderr) {
            if (code != 0) return reject(stderr);
            return resolve(stdout);
        });
    });
}

function getPID(process) {
    try {
        let pid = Number(shell.exec(`pidof ${process}`, { silent: true }).stdout);
        return pid;
    } catch (ex) {
        return -1;
    }
}

function startDaemon() {
    try {
        execAsync(`${processPath}/${processName}`, {silent:true}).then((res) => {
            console.log(`Startup initiated... ${res}`);
        }).catch((err) => {
            console.log(`Error starting daemon: ${err}`);
        });
    } catch (ex) {
        console.log(ex)
        return -1;
    }
}

function checkRunning() {
    let pid = getPID(processName);
    if(pid === -1 || pid === 0) {
        console.log(`Attempting ${processName} startup`);
        startDaemon();
    }
}

checkRunning();
setInterval(() => {
    checkRunning();
}, 300 * 1000);