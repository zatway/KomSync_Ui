export const AppRoutes = {
    LOGIN: "/login",
    REGISTER: "/register",

    // Проекты
    PROJECTS: "/projects",
    PROJECT_CREATE: "/projects/create",           // ← изменили на вложенный путь
    PROJECT_DETAIL: "/projects/:projectId",       // базовый путь для проекта
    PROJECT_BOARD: "/projects/:projectId/board",
    PROJECT_TABLE: "/projects/:projectId/table",
    PROJECT_SETTINGS: "/projects/:projectId/settings",

    // Глобальные задачи (если нужны отдельно от проектов)
    TASKS: "/tasks",
    TASK_CREATE: "/tasks/create",
    TASK_EDIT: "/tasks/edit",
    TASK_DETAIL: "/tasks/:taskId",
    TASKS_DASHBOARD: "/tasks/dashboard",
    TASKS_TABLE: "/tasks/table",

    KNOWLEDGE: "/knowledge",
    ADMIN: "/admin",
};
