// src/modules/projects/api/projectCommentsApi.ts
import { api } from "@/shared/lib";
import {UpdateProjectCommentRequest} from "@/types/dto/projectComments/UpdateProjectCommentRequest";
import {ProjectCommentDto} from "@/types/dto/projectComments/ProjectCommentDto";
import {CreateProjectCommentRequest} from "@/types/dto/projectComments/CreateProjectCommentRequest";

export const projectCommentsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Получить все комментарии проекта (с вложенными replies)
        getProjectComments: builder.query<ProjectCommentDto[], string>({
            query: (projectId) => `/projects/${projectId}/comments`,
            providesTags: (_, __, projectId) => [
                { type: "ProjectComments", id: projectId },
                "ProjectComments",
            ],
        }),

        // Создать комментарий (или ответ)
        createProjectComment: builder.mutation<string, CreateProjectCommentRequest>({
            query: (body) => ({
                url: `/projects/${body.projectId}/comments`,
                method: "POST",
                body,
            }),
            invalidatesTags: (_, __, { projectId }) => [
                { type: "ProjectComments", id: projectId },
                "ProjectComments",
            ],
        }),

        // Обновить комментарий
        updateProjectComment: builder.mutation<boolean, UpdateProjectCommentRequest>({
            query: ({ id, ...body }) => ({
                url: `/projects/comments/${id}`,
                method: "PATCH",
                body,
            }),
        }),

        // Удалить комментарий
        deleteProjectComment: builder.mutation<boolean, string>({
            query: (id) => ({
                url: `/projects/comments/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetProjectCommentsQuery,
    useCreateProjectCommentMutation,
    useUpdateProjectCommentMutation,
    useDeleteProjectCommentMutation,
} = projectCommentsApi;
