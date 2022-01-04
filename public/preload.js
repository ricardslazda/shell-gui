const {contextBridge, ipcRenderer} = require('electron');
const validChannels = ['READ_FILE', 'WRITE_FILE', "EXECUTE_SHELL_SCRIPT", "KILL_SHELL_SCRIPT"];
const sqlite3 = require('sqlite3');

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

contextBridge.exposeInMainWorld(
    'sqlite3', {
        run: (command) => {
            sqlite3.run(command);
        },
        database: (databaseFilePath) => {
            new sqlite3.Database(databaseFilePath, (err) => {
                if (err) {
                    console.log('Could not connect to database', err)
                } else {
                    console.log('Connected to database')
                }
            })
        }
    },
);