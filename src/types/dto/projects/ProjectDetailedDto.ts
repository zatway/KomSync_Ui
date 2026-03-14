export interface ProjectDetailedDto {
    id: string;
    key: string;
    name: string;
    description?: string;          // полное описание (может быть markdown)

    // Даты
    startDate?: string | Date;
    dueDate?: string | Date;
    completedAt?: string | Date;   // дата завершения (если status = completed)

    createdAt: string | Date;
    updatedAt: string | Date;

    // Владелец и участники
    owner: {
        id: string;
        name: string;
        avatarUrl?: string;
        email?: string;
        role: "owner" | "admin" | "member";
    };

    members: Array<{
        id: string;
        name: string;
        avatarUrl?: string;
        email?: string;
        role: "admin" | "member" | "viewer" | "guest";
        joinedAt: string | Date;
    }>;

    // Статистика задач
    taskStats: {
        total: number;
        open: number;
        inProgress: number;
        review: number;
        done: number;
        blocked: number;
        cancelled: number;
    };

    // Прогресс и метрики
    progress: number;              // 0–100 (обычно считается как done / total)
    overdueTasksCount?: number;
    highPriorityTasksCount?: number;

    // Дополнительные поля (часто полезны в корпоративных системах)
    tags?: string[];               // ["frontend", "mobile", "urgent", "clientX"]
    category?: string;             // "internal", "client", "product", "research"
    department?: string;           // "IT", "Marketing", "HR" и т.д.
    budget?: {
        planned: number;
        spent: number;
        currency: string;
    };

    // История изменений (можно подгружать отдельно, но иногда удобно иметь summary)
    recentChanges?: Array<{
        field: string;
        oldValue: any;
        newValue: any;
        changedBy: { id: string; name: string };
        changedAt: string | Date;
    }>;

    // Метаданные
    isFavorite?: boolean;          // для текущего пользователя
    permissions: {
        canEdit: boolean;
        canDelete: boolean;
        canManageMembers: boolean;
        canViewHistory: boolean;
    };

    customFields?: Record<string, any>; // для кастомных полей компании
}
