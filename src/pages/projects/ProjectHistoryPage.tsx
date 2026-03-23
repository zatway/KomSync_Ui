"use client";

import { useParams } from "react-router-dom";
import { Skeleton } from "@/shared/ui_shadcn/skeleton";
import { useGetProjectHistoryQuery } from "@/modules/projects/api/projectsApi";
import {HistoryEntry} from "@/modules/projects";

export default function ProjectHistoryPage() {
    const { projectId } = useParams<{ projectId: string }>();

    const { data: history, isLoading } = useGetProjectHistoryQuery(projectId!, {
        skip: !projectId,
    });

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
            </div>
        );
    }

    if (!history?.length) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                История изменений пока пустая
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {history.map((entry) => (
                <HistoryEntry key={entry.id} entry={entry} />
            ))}
        </div>
    );
}
