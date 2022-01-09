export function handleExecuteShellScriptResponse(callback) {
    window.ipc.on('EXECUTE_SHELL_SCRIPT', callback);
}

export function sendExecuteShellScriptEvent(payload) {
    window.ipc.send('EXECUTE_SHELL_SCRIPT', payload);
}

export function handleKillShellScriptResponse(callback) {
    window.ipc.on('STOP_SHELL_SCRIPT', callback);
}

export function sendKillShellScriptEvent(payload) {
    window.ipc.send('STOP_SHELL_SCRIPT', payload);
}