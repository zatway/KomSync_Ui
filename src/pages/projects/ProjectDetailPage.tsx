"use client";

import {
    ProjectDetailSkeleton,
    ProjectDetailHeader,
    ProjectOverview,
    ProjectTeam,
    ProjectTimeline,
    ProjectQuickActions
} from "@/modules/projects";
import {useGetProjectByIdQuery} from "@/modules/projects/api/projectsApi";
import {AlertCircle} from "lucide-react";
import {Button} from "@/shared/ui_shadcn/button";
import {useNavigate, useParams} from "react-router-dom";
import {AppRoutes} from "@/app/routes/AppRoutes";

export default function ProjectDetailPage() {
    const {projectId} = useParams<{ projectId: string }>();
    const navigate = useNavigate();

    const {data: project, isLoading, isError} = useGetProjectByIdQuery(projectId!, {
        skip: !projectId,
    });

    if (isLoading) {
        return <ProjectDetailSkeleton/>;
    }

    if (!project || isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
                <AlertCircle className="h-16 w-16 text-destructive mb-6"/>
                <h2 className="text-2xl font-bold mb-2">Проект не найден</h2>
                <p className="text-muted-foreground mb-8 max-w-md">
                    Возможно, проект был удалён или у вас нет доступа.
                </p>
                <Button onClick={() => navigate(AppRoutes.PROJECTS)}>
                    Вернуться к списку проектов
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <ProjectDetailHeader project={project}/>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
                <div className="lg:col-span-2 space-y-8">
                    <ProjectOverview project={project}/>
                    <ProjectQuickActions projectId={project.id}/>
                </div>

                <div className="space-y-8">
                    <ProjectTeam project={project}/>
                    <ProjectTimeline project={project}/>
                </div>
            </div>
        </div>
    );
}
