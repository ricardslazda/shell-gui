import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

// const { ipcMain } = require('electron');
// const fs = require('fs');
//
// ipcMain.on('READ_FILE', (event, payload) => {
//     const content = fs.readFileSync(payload.path);
//     event.reply('READ_FILE', { content });
// });

const fs = require('fs')
console.log(fs)