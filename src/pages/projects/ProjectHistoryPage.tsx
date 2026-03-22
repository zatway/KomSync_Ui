"use client";

import { useParams } from "react-router-dom";
import { Skeleton } from "@/shared/ui_shadcn/skeleton";
import { useGetProjectHistoryQuery } from "@/modules/projects/api/projectsApi";
import {HistoryEntry} from "@/modules/projects";

// src/types/dto/projects/mocks.ts (или в любом удобном месте)
import { ProjectHistoryEntryDto } from "@/types/dto/projects/ProjectHistoryEntryDto";

export const mockProjectHistory: ProjectHistoryEntryDto[] = [
    {
        id: "hist-001",
        field: "name",
        oldValue: "Мобильное приложение для записи",
        newValue: "Мобильное приложение для пациентов Комдиагностика",
        changedBy: {
            id: "user-101",
            name: "Анна Смирнова",
            avatarUrl: "https://i.pravatar.cc/150?u=anna",
        },
        changedAt: "2026-03-20T14:35:22Z",
        comment: "Уточнили название для маркетинга и бренда",
    },

    {
        id: "hist-002",
        field: "dueDate",
        oldValue: "2026-07-15",
        newValue: "2026-06-30",
        changedBy: {
            id: "user-102",
            name: "Иван Петров",
            avatarUrl: "https://i.pravatar.cc/150?u=ivan",
        },
        changedAt: "2026-03-18T09:12:45Z",
        comment: "Сократили срок, чтобы успеть к запуску новой лаборатории",
    },

    {
        id: "hist-003",
        field: "description",
        oldValue: "Приложение для записи на анализы",
        newValue: "Полноценное мобильное приложение с авторизацией, записью, результатами и уведомлениями",
        changedBy: {
            id: "user-101",
            name: "Анна Смирнова",
            avatarUrl: "https://i.pravatar.cc/150?u=anna",
        },
        changedAt: "2026-03-15T16:40:10Z",
        comment: "Расширили описание после встречи с заказчиком",
    },

    {
        id: "hist-004",
        field: "color",
        oldValue: "#3b82f6",
        newValue: "#10b981",
        changedBy: {
            id: "user-103",
            name: "Мария Кузнецова",
            avatarUrl: "https://i.pravatar.cc/150?u=maria",
        },
        changedAt: "2026-03-12T11:20:33Z",
        comment: "Сменили цвет на фирменный зелёный Комдиагностика",
    },

    {
        id: "hist-005",
        field: "icon",
        oldValue: "📱",
        newValue: "🩺",
        changedBy: {
            id: "user-101",
            name: "Анна Смирнова",
            avatarUrl: "https://i.pravatar.cc/150?u=anna",
        },
        changedAt: "2026-03-10T08:55:00Z",
        comment: "Иконка теперь лучше отражает медицинскую тематику",
    },

    {
        id: "hist-006",
        field: "tags",
        oldValue: ["mobile", "ios"],
        newValue: ["mobile", "ios", "android", "patient", "urgent"],
        changedBy: {
            id: "user-102",
            name: "Иван Петров",
            avatarUrl: "https://i.pravatar.cc/150?u=ivan",
        },
        changedAt: "2026-03-05T13:10:22Z",
        comment: "Добавили теги для лучшей фильтрации и поиска",
    },

    {
        id: "hist-007",
        field: "startDate",
        oldValue: null,
        newValue: "2025-11-10",
        changedBy: {
            id: "user-101",
            name: "Анна Смирнова",
            avatarUrl: "https://i.pravatar.cc/150?u=anna",
        },
        changedAt: "2025-11-05T10:00:00Z",
        comment: "Установили официальную дату старта проекта",
    },

    {
        id: "hist-008",
        field: "key",
        oldValue: "MOBAPP",
        newValue: "PATIENT",
        changedBy: {
            id: "user-101",
            name: "Анна Смирнова",
            avatarUrl: "https://i.pravatar.cc/150?u=anna",
        },
        changedAt: "2025-11-07T15:25:47Z",
        comment: "Изменили ключ проекта на более понятный",
    },
];

export default function ProjectHistoryPage() {
    const { projectId } = useParams<{ projectId: string }>();

    const { data: history = mockProjectHistory, isLoading } = useGetProjectHistoryQuery(projectId!, {
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

    if (!history.length) {
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
