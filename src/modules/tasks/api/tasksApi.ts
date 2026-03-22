// src/modules/tasks/api/tasksApi.ts
import { api } from "@/shared/lib";
import { TaskShortDto } from "@/types/dto/tasks/TaskShortDto";
import { TaskDetailedDto } from "@/types/dto/tasks/TaskDetailedDto";
import { CreateTaskRequest } from "@/types/dto/tasks/CreateTaskRequest";
import { UpdateTaskRequest } from "@/types/dto/tasks/UpdateTaskRequest";
import { AssignUserRequest } from "@/types/dto/tasks/AssignUserRequest";
import { ChangeTaskStatusCommand } from "@/types/dto/tasks/ChangeTaskStatusCommand";

export const tasksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Получить все задачи проекта (для Kanban)
        getTasksByProject: builder.query<TaskShortDto[], string>({
            query: (projectId) => `/tasks/project/${projectId}`,
            providesTags: (result, _, projectId) => [
                { type: "Task", id: "LIST" },
                { type: "Project", id: projectId },
                ...(result?.map(({ id }) => ({ type: "Task" as const, id })) ?? []),
            ],
        }),

        // Детальная задача
        getTaskById: builder.query<TaskDetailedDto, string>({
            query: (taskId) => `/tasks/${taskId}`,
            providesTags: (_, __, id) => [{ type: "Task", id }],
        }),

        // Создать задачу
        createTask: builder.mutation<string, CreateTaskRequest>({
            query: (body) => ({
                url: "/tasks",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Task"],
        }),

        // Обновить задачу (включая drag-n-drop статус/порядок)
        updateTask: builder.mutation<boolean, UpdateTaskRequest>({
            query: (body) => ({
                url: `/tasks/${body.id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (_, __, { id }) => [{ type: "Task", id }, "Task"],
        }),

        // Удалить задачу
        deleteTask: builder.mutation<boolean, string>({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Task"],
        }),

        // Назначить исполнителя
        assignUser: builder.mutation<boolean, AssignUserRequest>({
            query: (body) => ({
                url: "/tasks/assign",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Task"],
        }),

        // Изменить статус (используется при drag-n-drop)
        changeTaskStatus: builder.mutation<boolean, ChangeTaskStatusCommand>({
            query: (body) => ({
                url: "/tasks/status",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Task"],
        }),

        // Переместить задачу внутри колонки или между колонками (порядок)
        reorderTask: builder.mutation<boolean, { taskId: string; newStatus: string; newOrder: number }>({
            query: ({ taskId, newStatus, newOrder }) => ({
                url: `/tasks/${taskId}/reorder`,
                method: "PATCH",
                body: { status: newStatus, order: newOrder },
            }),
            invalidatesTags: ["Task"],
        }),
    }),
});

export const {
    useGetTasksByProjectQuery,
    useGetTaskByIdQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useAssignUserMutation,
    useChangeTaskStatusMutation,
    useReorderTaskMutation,
} = tasksApi;
