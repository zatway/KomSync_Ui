// src/types/dto/tasks/TaskShortDto.ts
export interface TaskShortDto {
    id: string;                     // UUID
    key: string;                    // Например: MOBAPP-123
    title: string;                  // Короткое название задачи
    description?: string;           // Краткое описание (1–2 строки)
    status: "todo" | "in_progress" | "review" | "done" | "blocked"; // статус = колонка на доске
    priority?: "low" | "medium" | "high" | "critical";
    assignee?: {
        id: string;
        name: string;
        avatarUrl?: string;
    } | null;
    dueDate?: string;               // ISO дата
    projectId: string;
    order: number;                  // порядок внутри колонки (для сортировки)
    createdAt: string;
    updatedAt: string;
}
