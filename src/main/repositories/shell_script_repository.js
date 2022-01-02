export class ShellScriptRepository {
    constructor(dao) {
        this.db = dao;
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

        return this.db.run(sql)
    }

    createRecord(path) {
        return this.db.run(
            'INSERT INTO shell_scripts (path) VALUES (?)',
            [path])
    }
}