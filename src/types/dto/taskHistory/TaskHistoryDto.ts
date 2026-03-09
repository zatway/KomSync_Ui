import {TaskHistoryAction} from "../enums/TaskHistoryAction.ts";

export interface TaskHistoryDto {
    id: string;
    taskId: string;
    changedById: string;
    propertyName: string;
    oldValue: string;
    newValue: string;
    action: TaskHistoryAction;
    changedAt: Date;
}
