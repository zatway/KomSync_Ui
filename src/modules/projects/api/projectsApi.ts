import { api } from "@/shared/lib";
import { env } from "@/env";

import { ProjectBriefDto } from "@/types/dto/projects/ProjectBriefDto";
import { ProjectDetailedDto } from "@/types/dto/projects/ProjectDetailedDto";
import { CreateProjectRequest } from "@/types/dto/projects/CreateProjectRequest";
import { UpdateProjectRequest } from "@/types/dto/projects/UpdateProjectRequest";
import { ProjectHistoryEntryDto } from "@/types/dto/projects/ProjectHistoryEntryDto";
import {ProjectCommentDto} from "@/types/dto/projectComments/ProjectCommentDto";
import {CreateProjectCommentRequest} from "@/types/dto/projectComments/CreateProjectCommentRequest";
import {UpdateProjectCommentRequest} from "@/types/dto/projectComments/UpdateProjectCommentRequest";

const getUrl = (endUrl: string) => `${env.PROJECTS_URL}${endUrl}`;

export const projectsApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getProjects: builder.query<ProjectBriefDto[], void>({
            query: () => ({
                url: getUrl(""),
                method: "GET",
            }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: "Project" as const, id })), "Project"]
                    : ["Project"],
        }),

        // --- Детали проекта ---
        getProjectById: builder.query<ProjectDetailedDto, string>({
            query: (id) => ({
                url: getUrl(`/${id}`),
                method: "GET",
            }),
            providesTags: (_, __, id) => [{ type: "Project", id }],
        }),

        // --- Создание проекта (PUT) ---
        createProject: builder.mutation<string, CreateProjectRequest>({
            query: (data) => ({
                url: getUrl(""),
                method: "PUT",
                data,
            }),
            invalidatesTags: ["Project"],
        }),

        // --- Обновление проекта ---
        updateProject: builder.mutation<boolean, UpdateProjectRequest & { id: string }>({
            query: ({ id, ...data }) => ({
                url: getUrl(`/${id}`),
                method: "PATCH",
                data,
            }),
            invalidatesTags: (_, __, { id }) => [{ type: "Project", id }, "Project"],
        }),

        // --- Удаление проекта ---
        deleteProject: builder.mutation<boolean, string>({
            query: (id) => ({
                url: getUrl(`/${id}`),
                method: "DELETE",
            }),
            invalidatesTags: ["Project"],
        }),

        // --- История проекта ---
        getProjectHistory: builder.query<ProjectHistoryEntryDto[], string>({
            query: (projectId) => ({
                url: getUrl(`/${projectId}${env.PROJECTS_HISTORY_URL}`),
                method: "GET",
            }),
            providesTags: (_, __, projectId) => [
                { type: "ProjectHistory" as const, id: projectId },
            ],
        }),

        // --- Получить комментарии ---
        getProjectComments: builder.query<ProjectCommentDto[], string>({
            query: (projectId) => ({
                url: getUrl(`/${projectId}${env.PROJECTS_COMMENTS_URL}`),
                method: "GET",
            }),
            providesTags: (_, __, projectId) => [
                { type: "ProjectComment" as const, id: projectId },
            ],
        }),

        addProjectComment: builder.mutation<
            { id: string; createdAt: string },
            { projectId: string; data: CreateProjectCommentRequest }
        >({
            query: ({ projectId, data }) => ({
                url: getUrl(`/${projectId}${env.PROJECTS_COMMENTS_URL}`),
                method: "PUT",
                data,
            }),
            invalidatesTags: (_, __, { projectId }) => [
                { type: "ProjectComment" as const, id: projectId },
                { type: "Project" as const, id: projectId },
            ],
        }),

        updateProjectComment: builder.mutation<
            boolean,
            { id: string; data: UpdateProjectCommentRequest }
        >({
            query: ({ id, data }) => ({
                url: getUrl(`/comments/${id}`),
                method: "PATCH",
                data,
            }),
            invalidatesTags: ["ProjectComment"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetProjectsQuery,
    useGetProjectByIdQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
    useGetProjectHistoryQuery,
    useGetProjectCommentsQuery,
    useAddProjectCommentMutation,
    useUpdateProjectCommentMutation,
} = projectsApi;
