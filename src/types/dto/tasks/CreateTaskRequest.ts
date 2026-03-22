// src/types/dto/tasks/CreateTaskRequest.ts
export interface CreateTaskRequest {
    projectId: string;
    title: string;
    description?: string;
    status?: "todo" | "in_progress" | "review" | "done" | "blocked"; // по умолчанию "todo"
    priority?: "low" | "medium" | "high" | "critical";
    assigneeId?: string | null;
    dueDate?: string | null;
    labels?: string[];
}
