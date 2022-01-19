export class ShellScript {
    /** From DB **/
    id;
    scriptName;
    filePath;
    status = STATUS.IDLE;
    createdAt;
    updatedAt;
    lastExecutedAt;

    /** Additional Properties **/
    output = "";
    processId = "";

    constructor(properties = {}) {
        this.id = properties.id;
        this.scriptName = properties.scriptName;
        this.filePath = properties.filePath;
        this.createdAt = properties.createdAt;
        this.updatedAt = properties.updatedAt;
        this.lastExecutedAt = properties.lastExecutedAt;
    }

    canBeExecuted() {
        return STATUSES_FOR_EXECUTION.includes(this.status);
    }

    canBeStopped() {
        return STATUSES_FOR_STOPPING.includes(this.status);
    }

    isStopping() {
        return this.status === STATUS.STOPPING;
    }

    getStatusByName() {
        return STATUS_NAMES[this.status];
    }
}

export const STATUS = Object.freeze({
    IDLE: 0,
    EXECUTING: 1,
    EXECUTED: 2,
    STOPPING: 3,
    STOPPED: 4
});

export const STATUSES_FOR_EXECUTION = [
    STATUS.IDLE,
    STATUS.STOPPED,
    STATUS.EXECUTED,
];

export const STATUSES_FOR_STOPPING = [
    STATUS.EXECUTING,
];

const STATUS_NAMES = Object.freeze({
    0: "Idle",
    1: "Executing",
    2: "Executed",
    3: "Stopping",
    4: "Stopped"
})