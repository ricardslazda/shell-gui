export function createTable()
{
    const sql = `
        CREATE TABLE IF NOT EXISTS script_arguments
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            script_id INTEGER NOT NULL,
            type TEXT NOT NULL,
            flag_prefix_option TEXT,
            flag_prefix_value TEXT,
            flag_middle_syntax_option TEXT,
            flag_argument_value TEXT,
            positional_argument_value TEXT,
            CONSTRAINT fk_shell_script
            FOREIGN KEY (script_id)
            REFERENCES shell_scripts(id)
        )`
    return window.dao.run(sql)
}

export function createRecord(scriptId, argument)
{
    return window.dao.run(
        'INSERT INTO script_arguments (script_id, type, flag_prefix_option, flag_prefix_value, flag_middle_syntax_option, flag_argument_value, positional_argument_value) VALUES (?,?,?,?,?,?,?)',
        [scriptId, argument.type, argument.flagPrefixOption, argument.flagPrefixValue, argument.flagMiddleSyntaxOption, argument.flagArgumentValue, argument.positionalArgumentValue])
}