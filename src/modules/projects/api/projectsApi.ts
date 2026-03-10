import {
    CreateProjectRequest,
    UpdateProjectRequest,
    ProjectBriefDto,
    ProjectDetailedDto,
} from '../../../types/dto'
import {api} from "../../../shared/lib";

export const projectsApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getProjects: builder.query<ProjectBriefDto[], void>({
            query: () => '/projects',
            providesTags: ['Project'],
        }),

        getProjectById: builder.query<ProjectDetailedDto, string>({
            query: (id) => `/projects/${id}`,
            providesTags: (_, __, id) =>
                [{ type: 'Project', id }],
        }),

        createProject: builder.mutation<string, CreateProjectRequest>({
            query: (body) => ({
                url: '/projects',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Project'],
        }),

        updateProject: builder.mutation<boolean, UpdateProjectRequest & { id: string }>({
            query: ({ id, ...body }) => ({
                url: `/projects/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (_, __, { id }) => [{ type: 'Project', id }, 'Project'],
        }),

        deleteProject: builder.mutation<boolean, string>({
            query: (id) => ({
                url: `/projects/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Project'],
        }),

    }),
})

export const {
    useGetProjectsQuery,
    useGetProjectByIdQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = projectsApi
