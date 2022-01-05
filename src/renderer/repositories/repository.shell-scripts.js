import {Dao} from "../dao";

export class ShellScriptRepository {
    constructor() {
        this.dao = new Dao;
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS shell_scripts
            (
                id
                INTEGER
                PRIMARY
                KEY
                AUTOINCREMENT,
                path
                TEXT
            )`

        return this.dao.run(sql)
    }

    createRecord(path) {
        return this.dao.run(
            'INSERT INTO shell_scripts (path) VALUES (?)',
            [path])
    }

    getScripts() {
        return this.dao.all('SELECT * FROM shell_scripts');
    }
}