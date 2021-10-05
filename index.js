var shell = require('shelljs');

processName = 'metrixd';
processPath = '/usl/local/bin'
    
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
        let start = shell.exec(`${processPath}/${processName}`, {silent: true}).stdout;
        if (start === 'Metrix Core starting') {
            return 0;
        } else {
            console.log(`Error starting daemon: ${start}`);
            return -1;
        }
    } catch (ex) {
        console.log(ex)
        return -1;
    }
}

function checkRunning() {
    let pid = getPID(processName);
    if(pid === -1) {
        startDaemon();
    }
}

setInterval(() => {
    checkRunning();
}, 300 * 1000);