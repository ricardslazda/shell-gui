export function onExecuteShellScript(callback) {
    window.ipc.on('EXECUTE_SHELL_SCRIPT', callback);
}

export function sendExecuteShellScript(payload) {
    window.ipc.send('EXECUTE_SHELL_SCRIPT', payload);
}

export function onKillShellScript(callback) {
    window.ipc.on('STOP_SHELL_SCRIPT', callback);
}

export function sendKillShellScript(payload) {
    window.ipc.send('STOP_SHELL_SCRIPT', payload);
}