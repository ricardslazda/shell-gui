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

    static STATUSES_FOR_EXECUTION = [
        this.STATUS_IDLE,
        this.STATUS_STOPPED,
        this.STATUS_EXECUTED
    ];

    static STATUSES_FOR_STOPPING = [
        this.STATUS_EXECUTING
    ];

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

    canBeExecuted() {
        return ShellScript.STATUSES_FOR_EXECUTION.includes(this.status);
    }

    canBeStopped() {
        return ShellScript.STATUSES_FOR_STOPPING.includes(this.status);
    }

    isStopping() {
        return this.status === ShellScript.STATUS_STOPPING;
    }
}