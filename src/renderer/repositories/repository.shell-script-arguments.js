export function createTable()
{
    const sql = `
        CREATE TABLE IF NOT EXISTS shell_script_arguments
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            shell_script_id INTEGER NOT NULL,
            argument_name TEXT NOT NULL,
            argument_value TEX NOT NULL,
            CONSTRAINT fk_shell_script
            FOREIGN KEY (shell_script_id)
            REFERENCES shell_scripts(id)
        )`
    return window.dao.run(sql)
}