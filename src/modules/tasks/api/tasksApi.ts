// import {
//     CreateTaskRequest,
//     UpdateTaskRequest,
//     AssignUserRequest,
//     ChangeTaskStatusCommand,
//     TaskDetailedDto,
//     TaskShortDto,
// } from '@/types/dto'
import {api} from "../../../shared/lib";
import {TaskShortDto} from "@/types/dto/tasks/TaskShortDto";
import {TaskDetailedDto} from "@/types/dto/tasks/TaskDetailedDto";
import {CreateTaskRequest} from "@/types/dto/tasks/CreateTaskRequest";
import {UpdateTaskRequest} from "@/types/dto/tasks/UpdateTaskRequest";
import {AssignUserRequest} from "@/types/dto/tasks/AssignUserRequest";
import {ChangeTaskStatusCommand} from "@/types/dto/tasks/ChangeTaskStatusCommand";

export const tasksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTasksByProject: builder.query<TaskShortDto[], string>({
            query: (projectId) => `/tasks/project/${projectId}`,
            providesTags: (result) => [
                { type: 'Task', id: 'LIST' },
                ... (result?.map(({ id }) => ({ type: 'Task' as const, id })) ?? []),
            ],
        }),

        getTaskById: builder.query<TaskDetailedDto, string>({
            query: (id) => `/tasks/${id}`,
            providesTags: (_, __, id) => [{ type: 'Task', id }],
        }),

        createTask: builder.mutation<string, CreateTaskRequest>({
            query: (body) => ({
                url: '/tasks',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Task'],
        }),

        updateTask: builder.mutation<boolean, UpdateTaskRequest>({
            query: (body) => ({
                url: `/tasks/${body.id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (_, __, { id }) => [{ type: 'Task', id }, 'Task'],
        }),

        deleteTask: builder.mutation<boolean, string>({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Task'],
        }),

        assignUser: builder.mutation<boolean, AssignUserRequest>({
            query: (body) => ({
                url: '/tasks/assign',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Task'],
        }),

        changeTaskStatus: builder.mutation<boolean, ChangeTaskStatusCommand>({
            query: (body) => ({
                url: '/tasks/status',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Task'],
        }),

    }),
})

export const {
    useGetTasksByProjectQuery,
    useGetTaskByIdQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useAssignUserMutation,
    useChangeTaskStatusMutation,
} = tasksApi
