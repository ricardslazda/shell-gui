export function createTable()
{
    const sql = `
        CREATE TABLE IF NOT EXISTS shell_script_flags
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            shell_script_id INTEGER NOT NULL,
            flag_name TEXT NOT NULL,
            flag_value TEXT NOT NULL,
            CONSTRAINT fk_shell_script
            FOREIGN KEY (shell_script_id)
            REFERENCES shell_scripts(id)
        )`
    return window.dao.run(sql)
}