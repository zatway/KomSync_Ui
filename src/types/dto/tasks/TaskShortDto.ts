import {ProjectTaskPriority} from "../enums/ProjectTaskPriority.ts";
import {ProjectTaskStatus} from "../enums/ProjectTaskStatus.ts";

export interface TaskShortDto {
    id: string;
    title: string;
    description?: string;
    priority: ProjectTaskPriority;
    status: ProjectTaskStatus;
    creatorId: string;
    assigneeId: string;
}
