import { env } from "@/env";

/** Маршруты приложения (значения из `env.ts`). */
export const AppRoutes = {
    LOGIN: env.ROUTE_LOGIN,
    REGISTER: env.ROUTE_REGISTER,

    PROJECTS: env.ROUTE_PROJECTS,
    PROJECT_CREATE: env.ROUTE_PROJECT_CREATE,
    PROJECT_DETAIL: `${env.ROUTE_PROJECTS}/:projectId`,
    PROJECT_BOARD: `${env.ROUTE_PROJECTS}/:projectId/board`,
    PROJECT_TABLE: `${env.ROUTE_PROJECTS}/:projectId/table`,
    PROJECT_SETTINGS: `${env.ROUTE_PROJECTS}/:projectId/settings`,

    TASKS: env.ROUTE_TASKS,
    TASK_CREATE: `${env.ROUTE_TASKS}/create`,
    TASK_EDIT: `${env.ROUTE_TASKS}/edit`,
    TASK_DETAIL: `${env.ROUTE_TASKS}/:taskId`,
    TASKS_DASHBOARD: `${env.ROUTE_TASKS}/dashboard`,
    TASKS_TABLE: `${env.ROUTE_TASKS}/table`,

    KNOWLEDGE: env.ROUTE_KNOWLEDGE,
    ADMIN: env.ROUTE_ADMIN,
    PROFILE: env.ROUTE_PROFILE,
} as const;
