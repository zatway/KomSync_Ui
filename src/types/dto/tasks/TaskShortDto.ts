import {ProjectTaskPriority} from "../enums/ProjectTaskPriority.ts";
import {ProjectTaskStatus} from "../enums/ProjectTaskStatus.ts";
import {UserShortDto} from "@/types/dto/UserShortDto";

export interface TaskShortDto {
    id: string;
    title: string;
    description?: string;
    deadline?: Date;
    priority: ProjectTaskPriority;
    status: ProjectTaskStatus;
    creatorUser: {
        user: UserShortDto;
        createdAt: Date;
    };
    assigneeUser:{
        user: UserShortDto;
        assigneeAt: Date;
    };
}
