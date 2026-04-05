import { api } from "@/shared/lib";

export type SearchHit = {
    kind: string;
    id: string;
    title: string;
    subtitle?: string | null;
    projectId?: string | null;
    projectKey?: string | null;
};

export const searchApi = api.injectEndpoints({
    endpoints: (builder) => ({
        globalSearch: builder.query<SearchHit[], { q: string; take?: number }>({
            query: ({ q, take = 40 }) => ({
                url: "/search",
                method: "GET",
                params: { q, take },
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGlobalSearchQuery, useLazyGlobalSearchQuery } = searchApi;
