import {ProjectTaskStatus} from "../enums/ProjectTaskStatus.ts";
import {ProjectTaskPriority} from "../enums/ProjectTaskPriority.ts";

export interface UpdateTaskRequest {
    id: string;
    title?: string;
    status?: ProjectTaskStatus;
    priority?: ProjectTaskPriority;
    deadline?: Date;
    description?: string;
    projectId: string;
    parentTaskId?: string;
    assigneeId?: string;
}
