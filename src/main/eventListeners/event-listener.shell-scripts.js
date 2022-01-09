import {ipcMain} from "electron";
import fs from "fs";
import cp from "child_process";

export function setExecuteShellScriptListener(runningScripts) {
    ipcMain.on('EXECUTE_SHELL_SCRIPT', (event, payload) => {
        if (!fs.existsSync(payload.path)) {
            event.reply('EXECUTE_SHELL_SCRIPT', {error: "File not found!"});
            return;
        }

        if (runningScripts.filter(script => script.scriptId === payload.scriptId).length !== 0) {
            event.reply('EXECUTE_SHELL_SCRIPT', {error: "Script already running!"});
            return;
        }

        let scriptProcess = cp.spawn(payload.path);
        runningScripts.push({
            scriptId: payload.scriptId,
            path: payload.path,
            process: scriptProcess,
        });

        scriptProcess.stdout.on('data', function (output) {
            if (output) {
                event.reply('EXECUTE_SHELL_SCRIPT', {
                    output: output.toString(),
                    scriptId: payload.scriptId,
                });
            }
        });

        scriptProcess.on('close', function (exitCode, signal) {
            const index = runningScripts.findIndex(script => script.scriptId === payload.scriptId);
            if (index !== -1) {
                runningScripts.splice(index, 1);
            }

            if (signal === "SIGTERM") {
                event.reply('EXECUTE_SHELL_SCRIPT', {
                    scriptId: payload.scriptId,
                    isKilled: true,
                });
            } else {
                event.reply('EXECUTE_SHELL_SCRIPT', {
                    scriptId: payload.scriptId,
                    hasExecuted: true,
                });
            }
        });
    });
}

export function setStopShellScriptListener(runningScripts) {
    ipcMain.on('STOP_SHELL_SCRIPT', (event, payload) => {
        const scriptProcess = runningScripts.find(script => {
            return script.scriptId === payload.scriptId
        });

        if (!scriptProcess) {
            event.reply('STOP_SHELL_SCRIPT', {
                scriptId: payload.scriptId,
                error: "Could not kill process. Script is not running!"
            });
            return;
        }

        const isRunning = checkRunning(scriptProcess.process.pid);

        if (!isRunning) {
            event.reply('STOP_SHELL_SCRIPT', {
                scriptId: payload.scriptId,
                error: "Could not kill process. Script is not running!"
            });
            return;
        }

        event.reply('STOP_SHELL_SCRIPT', {
            scriptId: payload.scriptId,
        });

        scriptProcess.process.kill();
    });
}

function checkRunning(pid) {
    try {
        return process.kill(pid, 0);
    } catch (error) {
        console.error(error);
        return error.code === 'EPERM';
    }
}