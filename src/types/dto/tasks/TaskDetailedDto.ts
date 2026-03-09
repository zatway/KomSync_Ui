import {ProjectTaskStatus} from "../enums/ProjectTaskStatus.ts";
import {ProjectTaskPriority} from "../enums/ProjectTaskPriority.ts";

export interface TaskDetailedDto {
    id: string;
    title: string;
    description: string;
    status: ProjectTaskStatus;
    priority: ProjectTaskPriority;
    creatorId: string;
    updatedAt?: Date;
    assigneeId: string;
    parentTaskId?: string;
}
