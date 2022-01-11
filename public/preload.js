const {contextBridge, ipcRenderer} = require('electron');
const validChannels = ['READ_FILE', 'WRITE_FILE', "EXECUTE_SHELL_SCRIPT", "STOP_SHELL_SCRIPT"];
const sqlite3 = require('sqlite3');

const database = new sqlite3.Database(window.process.argv.slice(-1).pop(), (err) => {
    if (err) {
        console.log('Could not connect to database', err)
    } else {
        console.log('Connected to database!')
    }
})

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
        run: (sql, params, callback = null) => {
            database.run(sql, params, callback);
        },
        get: (sql, params = [], callback = null) => {
            database.get(sql, params, callback);
        },
        all: (sql, params = [], callback = null) => {
            database.all(sql, params, callback);
        }
    },
);