const path = require('path');
const fs = require('fs');
import {app, protocol, BrowserWindow} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS3_DEVTOOLS} from 'electron-devtools-installer'
import {setExecuteShellScriptListener, setStopShellScriptListener} from "./eventListeners/event-listener.shell-scripts";
import {setReadFileListener} from "./eventListeners/event-listener.files";

const isDevelopment = process.env.NODE_ENV !== 'production'

const userDataPath = app.getPath('userData');
const databaseFileName = "database.sqlite";
const databasePath = path.join(userDataPath, databaseFileName)

protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
])

async function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 2000,
        webPreferences: {
            preload: path.resolve(__static, 'preload.js'),
            additionalArguments: [databasePath]
        },
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        win.loadURL('app://./index.html')
    }
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        try {
            await installExtension(VUEJS3_DEVTOOLS)
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
    await createWindow()
    await loadDatabaseFile();
})

if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}

let runningScripts = [];
setStopShellScriptListener(runningScripts);
setExecuteShellScriptListener(runningScripts);
setReadFileListener();

function loadDatabaseFile() {
    fs.exists(databasePath, function (exists) {
        if (exists) {
            console.log("Database file found!")
        } else {
            fs.writeFile(databasePath, '', function (err) {
                if (err) throw err;
                console.log('Database file is created successfully.');
            });
        }
    });
}