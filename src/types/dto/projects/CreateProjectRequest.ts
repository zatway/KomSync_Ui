export interface CreateProjectRequest {
    name: string;                    // Обязательное, минимум 3 символа
    key: string;                     // Уникальный ключ, 2–10 символов, только A-Z0-9_-
    description?: string;            // Markdown или plain text
    startDate?: string;              // ISO date string (опционально)
    dueDate?: string;                // ISO date string (опционально)
    color?: string;                  // #HEX или hsl() — цвет проекта в UI
    icon?: string;                   // emoji или короткий путь к иконке
    departmentId: string;                   // emoji или короткий путь к иконке
    tags?: string[];                 // массив тегов, например ["frontend", "urgent"]
}
