import {ShellScript} from "@/models/models.shell-script";

export function createTable()
{
    const sql = `
        CREATE TABLE IF NOT EXISTS shell_scripts
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            file_path TEXT NOT NULL,
            script_name TEXT NOT NULL,
            status INTEGER DEFAULT 0,
            added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
            last_executed_at TIMESTAMP
        )`

    return window.dao.run(sql)
}

export function createRecord(filePath, scriptName)
{
    let shellScript = new ShellScript({
        filePath: filePath,
        scriptName: scriptName,
    });

    return window.dao.run(
        'INSERT INTO shell_scripts (file_path, script_name) VALUES (?,?)',
        [shellScript.filePath, shellScript.scriptName])
}

export async function getScripts()
{
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