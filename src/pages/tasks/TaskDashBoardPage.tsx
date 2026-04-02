"use client";

import { ProjectKanbanBoard } from "@/modules/tasks";
import { useParams } from "react-router-dom";
import { useGetProjectByIdQuery } from "@/modules/projects/api/projectsApi";

export default function TaskDashboardPage() {
    const { projectId } = useParams<{ projectId: string }>();
    const { data: project } = useGetProjectByIdQuery(projectId!, { skip: !projectId });

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Задачи проекта</h1>
                        <p className="text-muted-foreground mt-1">
                            {project ? `${project.icon ?? ""} ${project.name}`.trim() : projectId}
                        </p>
                    </div>
                </div>
                {projectId && <ProjectKanbanBoard projectId={projectId} />}
            </div>
        </div>
    );
}
