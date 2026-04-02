import type { TaskShortDto } from "./TaskShortDto";
import type { TaskCommentDto } from "../taskComments/TaskCommentDto";
import type { TaskHistoryDto } from "../taskHistory/TaskHistoryDto";

export interface TaskDetailedDto extends TaskShortDto {
    parentTaskId?: string | null;
    comments: TaskCommentDto[];
    history: TaskHistoryDto[];
    watchers: Array<{ id: string; name: string; avatarUrl?: string | null }>;
}
