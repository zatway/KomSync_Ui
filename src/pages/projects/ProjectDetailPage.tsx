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
import {ProjectDetailedDto} from "@/types/dto/projects/ProjectDetailedDto";

// src/types/dto/projects/mocks.ts (или где удобно)
export const mockProjectDetailed: ProjectDetailedDto = {
    id: "proj-uuid-001",
    key: "MOBAPP",
    name: "Мобильное приложение для клиентов",
    description: "Разработка кроссплатформенного приложения для записи на диагностику, просмотра результатов анализов и уведомлений о готовности.\n\n**Основные модули:**\n- Авторизация и профиль пациента\n- Запись на приём\n- Результаты анализов в реальном времени\n- Уведомления push/email\n- Интеграция с лабораторными системами",
    startDate: "2025-11-10",
    dueDate: "2026-06-30",
    createdAt: "2025-11-05T09:15:00Z",
    updatedAt: "2026-03-19T11:42:00Z",
    color: "#3b82f6",
    icon: "🚀",
    owner: {
        id: "user-101",
        name: "Анна Смирнова",
        avatarUrl: "https://i.pravatar.cc/150?u=anna",
        email: "anna@komdiagnostika.ru",
        role: "owner",
    },
    members: [
        {
            id: "user-102",
            name: "Иван Петров",
            avatarUrl: "https://i.pravatar.cc/150?u=ivan",
            email: "ivan@komdiagnostika.ru",
            role: "admin",
            joinedAt: "2025-11-06",
        },
        {
            id: "user-103",
            name: "Мария Кузнецова",
            avatarUrl: "https://i.pravatar.cc/150?u=maria",
            email: "maria@komdiagnostika.ru",
            role: "member",
            joinedAt: "2025-12-01",
        },
    ],
    taskStats: {
        total: 124,
        open: 42,
        inProgress: 28,
        review: 12,
        done: 82,
        blocked: 3,
        cancelled: 0,
    },
    progress: 66,
    overdueTasksCount: 5,
    highPriorityTasksCount: 18,
    tags: ["mobile", "patient", "urgent", "ios", "android"],
    category: "product",
    department: "IT",
    budget: {
        planned: 2500000,
        spent: 1400000,
        currency: "RUB",
    },
    recentChanges: [
        {
            field: "dueDate",
            oldValue: "2026-07-15",
            newValue: "2026-06-30",
            changedBy: { id: "user-101", name: "Анна Смирнова" },
            changedAt: "2026-03-10T14:30:00Z",
        },
        {
            field: "description",
            oldValue: "...",
            newValue: "... (обновлено)",
            changedBy: { id: "user-102", name: "Иван Петров" },
            changedAt: "2026-02-28T09:15:00Z",
        },
    ],
    isFavorite: true,
    permissions: {
        canEdit: true,
        canDelete: true,
        canManageMembers: true,
        canViewHistory: true,
    },
    customFields: {
        client: "ООО КлиентЗдоровье",
        contractNumber: "КД-2025/147",
    },
};

export default function ProjectDetailPage() {
    const {projectId} = useParams<{ projectId: string }>();
    const navigate = useNavigate();

    const {data: project = mockProjectDetailed, isLoading, isError} = useGetProjectByIdQuery(projectId!, {
        skip: !projectId,
    });

    if (isLoading) {
        return <ProjectDetailSkeleton/>;
    }

    if (!project) {//isError ||
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
