import {
    AddTaskCommentRequest,
    UpdateTaskCommentRequest,
    DeleteTaskCommentRequest,
    TaskCommentDto,
} from '../../../types/dto'
import {api} from "../../../shared/lib";

export const taskCommentsApi = api.injectEndpoints({
    endpoints: (builder) => ({

        addComment: builder.mutation<string, AddTaskCommentRequest>({
            query: (body) => ({
                url: '/task-comments',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['TaskComment'], // или создай 'TaskComment' если нужно детальнее
        }),

        updateComment: builder.mutation<boolean, UpdateTaskCommentRequest>({
            query: (body) => ({
                url: '/task-comments',
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Task'],
        }),

        deleteComment: builder.mutation<boolean, DeleteTaskCommentRequest>({
            query: (body) => ({
                url: '/task-comments',
                method: 'DELETE',
                body,
            }),
            invalidatesTags: ['Task'],
        }),
    }),
})

export const {
    useAddCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
} = taskCommentsApi
