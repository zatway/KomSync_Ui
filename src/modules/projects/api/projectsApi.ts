// src/modules/projects/api/projectsApi.ts
import { api } from "@/shared/lib";
import { ProjectBriefDto } from "@/types/dto/projects/ProjectBriefDto";
import { ProjectDetailedDto } from "@/types/dto/projects/ProjectDetailedDto";
import { CreateProjectRequest } from "@/types/dto/projects/CreateProjectRequest";
import { UpdateProjectRequest } from "@/types/dto/projects/UpdateProjectRequest";
import { ProjectHistoryEntryDto } from "@/types/dto/projects/ProjectHistoryEntryDto";

export const projectsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // --- Список проектов ---
        getProjects: builder.query<ProjectBriefDto[], void>({
            query: () => "/projects",
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: "Project" as const, id })), "Project"]
                    : ["Project"],
        }),

        // --- Детали проекта ---
        getProjectById: builder.query<ProjectDetailedDto, string>({
            query: (id) => `/projects/${id}`,
            providesTags: (result, error, id) => [{ type: "Project", id }],
        }),

        // --- Создание проекта ---
        createProject: builder.mutation<string, CreateProjectRequest>({
            query: (body) => ({
                url: "/projects",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Project"],
        }),

        // --- Обновление проекта ---
        updateProject: builder.mutation<boolean, UpdateProjectRequest & { id: string }>({
            query: ({ id, ...body }) => ({
                url: `/projects/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (_, __, { id }) => [{ type: "Project", id }, "Project"],
        }),

        // --- Удаление проекта ---
        deleteProject: builder.mutation<boolean, string>({
            query: (id) => ({
                url: `/projects/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Project"],
        }),

        // --- История проекта ---
        getProjectHistory: builder.query<ProjectHistoryEntryDto[], string>({
            query: (projectId) => `/projects/${projectId}/history`,
            providesTags: (_, __, projectId) => [{ type: "ProjectHistory" as const, id: projectId }],
        }),

        // --- Добавление комментария к проекту ---
        addProjectComment: builder.mutation<
            { id: string; createdAt: string },
            { projectId: string; content: string }
        >({
            query: ({ projectId, content }) => ({
                url: `/projects/${projectId}/comments`,
                method: "POST",
                body: { content },
            }),
            invalidatesTags: (_, __, { projectId }) => [
                { type: "ProjectHistory" as const, id: projectId },
                { type: "Project" as const, id: projectId },
            ],
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
    useAddProjectCommentMutation,
} = projectsApi;
