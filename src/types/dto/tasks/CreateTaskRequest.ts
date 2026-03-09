import {ProjectTaskPriority} from "../enums/ProjectTaskPriority.ts";
import {ProjectTaskStatus} from "../enums/ProjectTaskStatus.ts";

export interface CreateTaskRequest {
    title: string;
    description: string;
    status: ProjectTaskStatus;
    priority: ProjectTaskPriority;
}
