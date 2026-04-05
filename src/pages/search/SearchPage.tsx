import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui_shadcn/button";
import { Input } from "@/shared/ui_shadcn/input";
import { useLazyGlobalSearchQuery } from "@/modules/search/api/searchApi";
import { AppRoutes } from "@/app/routes/AppRoutes";
import { getApiErrorMessage } from "@/shared/lib";

const kindLabel: Record<string, string> = {
    project: "Проект",
    task: "Задача",
    knowledge: "База знаний",
    taskComment: "Комментарий к задаче",
    projectComment: "Комментарий к проекту",
};

const SearchPage = () => {
    const [q, setQ] = useState("");
    const [search, { data, isFetching, error }] = useLazyGlobalSearchQuery();

    const run = async () => {
        if (q.trim().length < 2) return;
        try {
            await search({ q: q.trim(), take: 50 }).unwrap();
        } catch {
            /* toast optional */
        }
    };

    return (
        <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-8">
            <h1 className="text-2xl font-semibold">Поиск</h1>
            <div className="flex gap-2">
                <Input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Не менее 2 символов"
                    onKeyDown={(e) => e.key === "Enter" && run()}
                />
                <Button type="button" onClick={run} disabled={isFetching}>
                    Найти
                </Button>
            </div>
            {error && (
                <p className="text-sm text-destructive">{getApiErrorMessage(error)}</p>
            )}
            <ul className="space-y-3">
                {(data ?? []).map((hit) => (
                    <li key={`${hit.kind}-${hit.id}`} className="rounded-md border bg-card p-3 text-sm">
                        <div className="text-xs text-muted-foreground">
                            {kindLabel[hit.kind] ?? hit.kind}
                        </div>
                        <div className="font-medium">{hit.title}</div>
                        {hit.subtitle && (
                            <div className="text-muted-foreground">{hit.subtitle}</div>
                        )}
                        <div className="mt-2 flex flex-wrap gap-2">
                            {hit.kind === "project" && (
                                <Link
                                    className="text-primary underline"
                                    to={`${AppRoutes.PROJECTS}/${hit.id}`}
                                >
                                    Открыть проект
                                </Link>
                            )}
                            {hit.kind === "task" && hit.projectId && (
                                <Link
                                    className="text-primary underline"
                                    to={`${AppRoutes.TASKS}/${hit.projectId}/detail/${hit.id}`}
                                >
                                    Открыть задачу
                                </Link>
                            )}
                            {hit.kind === "knowledge" && (
                                <Link
                                    className="text-primary underline"
                                    to={`${AppRoutes.KNOWLEDGE}/${hit.subtitle ?? hit.id}`}
                                >
                                    Открыть статью
                                </Link>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchPage;
