import { api } from "@/shared/lib";

export type AnalyticsDashboard = {
    openTasks: number;
    overdueTasks: number;
    tasksByStatus: Array<{ statusName: string; count: number }>;
    topAssignees: Array<{ userId: string; fullName: string; activeTaskCount: number }>;
};

export const analyticsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAnalyticsDashboard: builder.query<AnalyticsDashboard, void>({
            query: () => ({
                url: "/analytics/dashboard",
                method: "GET",
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetAnalyticsDashboardQuery } = analyticsApi;
