export function createTable()
{
    const sql = `
        CREATE TABLE IF NOT EXISTS shell_scripts
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            file_path TEXT NOT NULL,
            script_name TEXT NOT NULL,
            added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
            last_executed_at TIMESTAMP
        )`

    return window.dao.run(sql)
}

export function createRecord(filePath, scriptName)
{
    return window.dao.run(
        'INSERT INTO shell_scripts (file_path, script_name) VALUES (?,?)',
        [filePath, scriptName])
}

export function getScripts()
{
    return window.dao.all('SELECT * FROM shell_scripts');
}