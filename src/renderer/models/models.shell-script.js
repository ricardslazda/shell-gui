export class ShellScript {
    /** From DB **/
    id;
    scriptName;
    filePath;
    status = ShellScript.STATUS_IDLE;
    createdAt;
    lastExecutedAt;

    static STATUS_IDLE = 0;
    static STATUS_EXECUTING = 1;
    static STATUS_EXECUTED = 2;
    static STATUS_STOPPING = 3;
    static STATUS_STOPPED = 4;

    /** Additional Properties **/
    output = "";
    processId = "";

    constructor(properties) {
        this.id = properties.id;
        this.scriptName = properties.scriptName;
        this.filePath = properties.filePath;
        this.createdAt = properties.createdAt;
        this.lastExecutedAt = properties.lastExecutedAt;
    }
}