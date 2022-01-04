import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import 'bootstrap';
import './../scss/main.scss'
window.sqlite3.database("./database.sqlite3");

createApp(App).use(router).mount('#app')