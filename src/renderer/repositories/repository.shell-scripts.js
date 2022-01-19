import {ShellScript} from "@/models/models.shell-script";

export function createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS shell_scripts
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            file_path TEXT NOT NULL,
            script_name TEXT NOT NULL,
            status INTEGER DEFAULT 0,
            added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updated_at TIMESTAMP,
            last_executed_at TIMESTAMP
        )`

    return window.dao.run(sql)
}

export async function createRecord(script) {
    console.log(script);
    return await window.dao.run(
        'INSERT INTO shell_scripts (file_path, script_name) VALUES (?,?)',
        [script.filePath, script.scriptName])
}

export async function getLastRowId() {
    return await window.dao.all('SELECT last_insert_rowid();');
}

export async function getById(id) {
    return await window.dao.get('SELECT * FROM shell_scripts WHERE id = ?', [id]);
}

export async function getScripts() {
    let scriptsArray = [];
    return await window.dao.all('SELECT * FROM shell_scripts').then((scripts) => {
        scripts.forEach(script => {
            scriptsArray.push(new ShellScript({
                id: script.id,
                scriptName: script.scriptName,
                filePath: script.filePath,
                createdAt: script.createdAt
            }))
        })

        return scriptsArray;
    });
}

export async function editScript(script) {
    return window.dao.run(
        `UPDATE shell_scripts
      SET script_name = ?
      WHERE id = ?`,
        [script.scriptName, script.id]
    );
}