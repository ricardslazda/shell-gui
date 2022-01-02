const path = require('path');
const fs = require('fs');
const cp = require('child_process');
import {app, protocol, BrowserWindow, ipcMain} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS3_DEVTOOLS} from 'electron-devtools-installer'
import {AppDAO} from "./dao";

const dao = new AppDAO("./database.sqlite3")
const isDevelopment = process.env.NODE_ENV !== 'production'

protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
])

async function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 2000,
        webPreferences: {
            preload: path.resolve(__static, 'preload.js')
        },
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        // database.close();
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

ipcMain.on('READ_FILE', (event, payload) => {
    if (!fs.existsSync(payload.path)) {
        event.reply('READ_FILE', {error: "File not found!"});
        return
    }
    const content = fs.readFileSync(payload.path, {encoding: 'utf8', flag: 'r'});
    event.reply('READ_FILE', {content});
});

let cmd;
ipcMain.on('EXECUTE_SHELL_SCRIPT', (event, payload) => {
    if (!fs.existsSync(payload.path)) {
        event.reply('READ_FILE', {error: "File not found!"});
        return
    }

    cmd = cp.spawn(payload.path);
    cmd.stdout.on('data', function (output) {
        event.reply('EXECUTE_SHELL_SCRIPT', {output: output.toString()});
    });

    cmd.on('close', function () {
        console.log('Finished');
    });

    cmd.stderr.on('data', function (err) {
        console.log(err);
    });
});

ipcMain.on('KILL_SHELL_SCRIPT', () => {
    cmd.kill();
    console.log("Killed")
});