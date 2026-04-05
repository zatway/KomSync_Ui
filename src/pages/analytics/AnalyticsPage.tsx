import { env } from "@/env";
import { useGetAnalyticsDashboardQuery } from "@/modules/analytics/api/analyticsApi";
import { Button } from "@/shared/ui_shadcn/button";
import {authLocalService, hasValue} from "@/shared/lib";
import {toast} from "sonner";

const AnalyticsPage = () => {
    const { data, isLoading, error } = useGetAnalyticsDashboardQuery();

    const exportOverdue = async () => {
        const bearer = authLocalService.getToken();
        if(hasValue(bearer))
        {
            const res = await fetch(`${env.VITE_API_BASE_URL}/reports/tasks/overdue.csv`, {
                headers: bearer ? { Authorization: `Bearer ${bearer}` } : {},
            });
            if (!res.ok) return;
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "overdue-tasks.csv";
            a.click();
            URL.revokeObjectURL(url);
        }
        else toast.error("Ошибка")
    };

    return (
        <div className="mx-auto max-w-4xl space-y-6 p-4 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-semibold">Аналитика</h1>
                <Button type="button" variant="outline" size="sm" onClick={exportOverdue}>
                    CSV просроченных
                </Button>
            </div>
            {isLoading && <p>Загрузка…</p>}
            {error && <p className="text-destructive">Не удалось загрузить данные</p>}
            {data && (
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border bg-card p-4">
                        <div className="text-sm text-muted-foreground">Открытых задач</div>
                        <div className="text-3xl font-semibold">{data.openTasks}</div>
                    </div>
                    <div className="rounded-lg border bg-card p-4">
                        <div className="text-sm text-muted-foreground">Просрочено</div>
                        <div className="text-3xl font-semibold text-destructive">{data.overdueTasks}</div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 sm:col-span-2">
                        <div className="mb-2 text-sm font-medium">По статусам</div>
                        <ul className="space-y-1 text-sm">
                            {data.tasksByStatus.map((s) => (
                                <li key={s.statusName} className="flex justify-between gap-4">
                                    <span>{s.statusName}</span>
                                    <span className="text-muted-foreground">{s.count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-lg border bg-card p-4 sm:col-span-2">
                        <div className="mb-2 text-sm font-medium">Загрузка исполнителей (активные задачи)</div>
                        <ul className="space-y-1 text-sm">
                            {data.topAssignees.map((u) => (
                                <li key={u.userId} className="flex justify-between gap-4">
                                    <span>{u.fullName}</span>
                                    <span className="text-muted-foreground">{u.activeTaskCount}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalyticsPage;
