import { AddTaskCommentRequest } from '@/types/dto/taskComments/AddTaskCommentRequest'
import { UpdateTaskCommentRequest } from '@/types/dto/taskComments/UpdateTaskCommentRequest'
import { DeleteTaskCommentRequest } from '@/types/dto/taskComments/DeleteTaskCommentRequest'
import { api } from '@/shared/lib'
import { env } from '@/env'

export const taskCommentsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addComment: builder.mutation<string, AddTaskCommentRequest>({
            query: (data) => ({ url: env.API_TASK_COMMENTS_PATH, method: 'PUT', data }),
            invalidatesTags: ['TaskComment'],
        }),
        updateComment: builder.mutation<boolean, UpdateTaskCommentRequest>({
            query: (data) => ({ url: env.API_TASK_COMMENTS_PATH, method: 'PATCH', data }),
            invalidatesTags: ['Task'],
        }),
        deleteComment: builder.mutation<boolean, DeleteTaskCommentRequest>({
            query: ({ id }) => ({ url: `${env.API_TASK_COMMENTS_PATH}/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Task'],
        }),
    }),
})

export const { useAddCommentMutation, useUpdateCommentMutation, useDeleteCommentMutation } = taskCommentsApi

