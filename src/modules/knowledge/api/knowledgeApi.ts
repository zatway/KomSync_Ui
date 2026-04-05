import { api } from "@/shared/lib";

const base = `/knowledge`;

export type KnowledgeArticleListItem = {
    id: string;
    title: string;
    slug: string;
    parentId?: string | null;
    sortOrder: number;
    updatedAt?: string | null;
    projectId?: string | null;
    projectKey?: string | null;
    projectName?: string | null;
    projectTaskId?: string | null;
    taskDisplayKey?: string | null;
};

export type KnowledgeArticleDetail = {
    id: string;
    title: string;
    slug: string;
    contentMarkdown: string;
    parentId?: string | null;
    authorId: string;
    authorName: string;
    sortOrder: number;
    createdAt: string;
    updatedAt?: string | null;
    projectId?: string | null;
    projectKey?: string | null;
    projectName?: string | null;
    projectTaskId?: string | null;
    taskDisplayKey?: string | null;
    taskTitle?: string | null;
};

export type KnowledgeListParams = {
    projectId?: string;
    taskId?: string;
};

export type CreateKnowledgeBody = {
    title: string;
    slug?: string | null;
    contentMarkdown: string;
    parentId?: string | null;
    sortOrder?: number | null;
    projectId?: string | null;
    projectTaskId?: string | null;
};

export type UpdateKnowledgeBody = {
    title?: string;
    slug?: string | null;
    contentMarkdown?: string;
    parentId?: string | null;
    sortOrder?: number | null;
    projectId?: string | null;
    projectTaskId?: string | null;
    scopeChanged?: boolean;
    parentChanged?: boolean;
};

export const knowledgeApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getKnowledgeArticles: builder.query<KnowledgeArticleListItem[], KnowledgeListParams | void>({
            query: (arg) => {
                const params = new URLSearchParams();
                if (arg?.projectId) params.set("projectId", arg.projectId);
                if (arg?.taskId) params.set("taskId", arg.taskId);
                const q = params.toString();
                return { url: q ? `${base}?${q}` : base, method: "GET" };
            },
            providesTags: ["Knowledge"],
        }),
        getKnowledgeArticle: builder.query<KnowledgeArticleDetail, string>({
            query: (slug) => ({ url: `${base}/${encodeURIComponent(slug)}`, method: "GET" }),
            providesTags: (_, __, slug) => [{ type: "Knowledge", id: slug }],
        }),
        createKnowledgeArticle: builder.mutation<KnowledgeArticleDetail, CreateKnowledgeBody>({
            query: (data) => ({ url: base, method: "POST", data }),
            invalidatesTags: ["Knowledge"],
        }),
        updateKnowledgeArticle: builder.mutation<
            KnowledgeArticleDetail,
            { id: string; body: UpdateKnowledgeBody }
        >({
            query: ({ id, body }) => ({ url: `${base}/${id}`, method: "PATCH", data: body }),
            invalidatesTags: ["Knowledge"],
        }),
        deleteKnowledgeArticle: builder.mutation<void, string>({
            query: (id) => ({ url: `${base}/${id}`, method: "DELETE" }),
            invalidatesTags: ["Knowledge"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetKnowledgeArticlesQuery,
    useGetKnowledgeArticleQuery,
    useCreateKnowledgeArticleMutation,
    useUpdateKnowledgeArticleMutation,
    useDeleteKnowledgeArticleMutation,
} = knowledgeApi;
