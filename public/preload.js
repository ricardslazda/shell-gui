const {contextBridge, ipcRenderer} = require('electron');
const validChannels = ['READ_FILE', 'WRITE_FILE', "EXECUTE_SHELL_SCRIPT", "KILL_SHELL_SCRIPT"];

contextBridge.exposeInMainWorld(
    'ipc', {
        send: (channel, data) => {
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        on: (channel, func) => {
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
    },
);