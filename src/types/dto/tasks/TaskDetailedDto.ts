// src/types/dto/tasks/TaskDetailedDto.ts
import {TaskShortDto} from "@/types/dto/tasks/TaskShortDto";

export interface TaskDetailedDto extends TaskShortDto {
    fullDescription?: string;       // Markdown или длинный текст
    labels?: string[];              // ["bug", "feature", "ui"]
    attachments?: Array<{
        id: string;
        name: string;
        url: string;
        type: "image" | "pdf" | "doc" | "other";
    }>;
    commentsCount: number;
    history?: Array<{
        field: string;
        oldValue: any;
        newValue: any;
        changedBy: { id: string; name: string };
        changedAt: string;
    }>;
    createdBy: {
        id: string;
        name: string;
        avatarUrl?: string;
    };
    watchers?: Array<{ id: string; name: string }>;
    subtasks?: Array<{
        id: string;
        title: string;
        completed: boolean;
    }>;
}
