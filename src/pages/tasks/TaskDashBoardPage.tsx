// src/pages/tasks/TaskDashboardPage.tsx
"use client";

import { ProjectKanbanBoard, TaskCreateButton } from "@/modules/tasks";
import { useParams } from "react-router-dom";

export default function TaskDashboardPage() {
    const { projectId } = useParams<{ projectId: string }>();

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Шапка доски */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Kanban-доска задач</h1>
                        <p className="text-muted-foreground mt-1">Проект {projectId}</p>
                    </div>

                    {/*<TaskCreateButton projectId={projectId!} />*/}
                </div>
                {/* Сама доска */}
                <ProjectKanbanBoard projectId={projectId!} />
            </div>
        </div>
    );
}
