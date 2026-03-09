import {ProjectTaskStatus} from "../enums/ProjectTaskStatus.ts";

export interface ChangeTaskStatusCommand {
    taskId: string;
    newStatus: ProjectTaskStatus;
}
