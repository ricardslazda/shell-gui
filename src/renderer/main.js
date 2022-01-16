import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";
import 'bootstrap';
import './../scss/main.scss'
import {Dao} from "./dao";
window.dao = new Dao();

import * as shellScriptRepository from "./repositories/repository.shell-scripts";
import * as shellScriptArgumentRepository from "./repositories/repository.script-arguments";
import * as shellScriptOutputRepository from "./repositories/repository.script-output";

setupDatabase(() => {
    createApp(App).use(router).mount('#app')
}).then();

async function setupDatabase(initVue) {
    await shellScriptRepository.createTable()
        .then(() => shellScriptArgumentRepository.createTable())
        .then(() => shellScriptOutputRepository.createTable())
        .catch((err) => console.log(err));

    initVue();
}