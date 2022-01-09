import {ipcMain} from "electron";
import fs from "fs";

export function setReadFileListener() {
    ipcMain.on('READ_FILE', (event, payload) => {
        if (!fs.existsSync(payload.path)) {
            event.reply('READ_FILE', {error: "File not found!"});
            return
        }
        const content = fs.readFileSync(payload.path, {encoding: 'utf8', flag: 'r'});
        event.reply('READ_FILE', {content});
    });
}