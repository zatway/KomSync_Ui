"use client";

import { ProjectEditHeader, ProjectForm } from "@/modules/projects";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProjectByIdQuery, useUpdateProjectMutation } from "@/modules/projects/api/projectsApi";
import { toast } from "sonner";
import {UpdateProjectRequest} from "@/types/dto/projects/UpdateProjectRequest";
import {ProjectDetailedDto} from "@/types/dto/projects/ProjectDetailedDto"; // будем использовать как базовый тип

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


export default function ProjectEditPage() {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();

    const { data: project = mockProjectDetailed, isLoading } = useGetProjectByIdQuery(projectId!);
    const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

    if (isLoading) {
        return <div className="p-10 text-center">Загрузка...</div>;
    }

    if (!project) {
        return <div>Проект не найден</div>;
    }

    const handleSubmit = async (values: UpdateProjectRequest ) => {
        try {
            await updateProject({ id: projectId!, ...values }).unwrap();
            toast.success("Проект обновлён");
            navigate(`/projects/${projectId}`);
        } catch (err) {
            toast.error("Не удалось обновить проект");
        }
    };

    return (
        <div className="container max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <ProjectEditHeader projectName={project.name} />

            <div className="bg-card border rounded-xl shadow-sm overflow-hidden mt-8">
                <ProjectForm
                    submitLabel="Сохранить изменения"
                    isLoading={isUpdating}
                    initialValues={{
                        name: project.name,
                        key: project.key,
                        description: project.description || "",
                        startDate: project.startDate ? new Date(project.startDate) : undefined,
                        dueDate: project.dueDate ? new Date(project.dueDate) : undefined,
                        color: project.color,
                        icon: project.icon,
                        tags: project.tags || [],
                    }}
                    onSubmit={value => handleSubmit({
                        name: value.name,
                        description: value.description,
                        key: value.key,
                        startDate: value.startDate?.toISOString(),
                        dueDate: value.dueDate?.toISOString(),
                        color: value.color,
                        icon: value.icon,
                        tags: value.tags,
                    })}
                />
            </div>
        </div>
    );
}
