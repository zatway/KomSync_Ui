export interface ChangeTaskStatusCommand {
    taskId: string;
    projectId: string;
    newStatusColumnId: string;
    newSortOrder?: number | null;
}
