"use client";

import {ProjectCommentForm, ProjectCommentsHeader, ProjectCommentsList} from "@/modules/porjectComments";
import { useParams } from "react-router-dom";
import {useGetProjectCommentsQuery} from "@/modules/porjectComments/api/projectCommentsApi";
import {ProjectCommentDto} from "@/types/dto/projectComments/ProjectCommentDto";

// src/modules/projects/mocks/projectCommentsMock.ts

export const mockProjectComments: ProjectCommentDto[] = [
    {
        id: "comment-001",
        projectId: "proj-uuid-001",
        content: "Ребята, предлагаю перенести запуск мобильного приложения на 2 недели позже — нужно доработать интеграцию с лабораториями, иначе будут баги с результатами анализов. Что думаете?",
        author: {
            id: "user-101",
            name: "Анна Смирнова",
            avatarUrl: "https://i.pravatar.cc/150?u=anna",
            email: "anna@komdiagnostika.ru",
        },
        createdAt: "2026-03-15T09:42:00Z",
        updatedAt: "2026-03-15T10:05:00Z",
        likesCount: 8,
        isEdited: true,
        canEdit: true,
        canDelete: true,
        replies: [
            {
                id: "comment-002",
                projectId: "proj-uuid-001",
                content: "Согласен, лучше задержать, чем выпустить с багами. У меня уже есть план по API — могу показать завтра на стендапе.",
                author: {
                    id: "user-102",
                    name: "Иван Петров",
                    avatarUrl: "https://i.pravatar.cc/150?u=ivan",
                },
                createdAt: "2026-03-15T10:12:00Z",
                parentId: "comment-001",
                likesCount: 3,
                isEdited: false,
                canEdit: true,
                canDelete: false,
            },
            {
                id: "comment-003",
                projectId: "proj-uuid-001",
                content: "Поддерживаю перенос. Клиенты уже жалуются на задержки результатов, ещё и приложение глючное будет — репутационные риски.",
                author: {
                    id: "user-104",
                    name: "Елена Маркова",
                    avatarUrl: "https://i.pravatar.cc/150?u=elena",
                },
                createdAt: "2026-03-15T11:30:00Z",
                parentId: "comment-001",
                likesCount: 5,
                isEdited: false,
                canEdit: false,
                canDelete: false,
            },
        ],
    },

    {
        id: "comment-004",
        projectId: "proj-uuid-001",
        content: "Добавил в Figma новые экраны онбординга и профиля пациента. Посмотрите, пожалуйста, по ссылке: https://www.figma.com/file/abc123...",
        author: {
            id: "user-103",
            name: "Мария Кузнецова",
            avatarUrl: "https://i.pravatar.cc/150?u=maria",
        },
        createdAt: "2026-03-18T14:20:00Z",
        likesCount: 4,
        isEdited: false,
        canEdit: true,
        canDelete: true,
        replies: [
            {
                id: "comment-005",
                projectId: "proj-uuid-001",
                content: "Классно получилось! Особенно понравился экран с историей анализов. Можно добавить там фильтр по дате?",
                author: {
                    id: "user-101",
                    name: "Анна Смирнова",
                    avatarUrl: "https://i.pravatar.cc/150?u=anna",
                },
                createdAt: "2026-03-18T15:05:00Z",
                parentId: "comment-004",
                likesCount: 2,
                isEdited: false,
            },
        ],
    },

    {
        id: "comment-006",
        projectId: "proj-uuid-001",
        content: "Тестировщики нашли 3 критических бага в авторизации через номер телефона. Завтра утром выложу отчёт в Notion.",
        author: {
            id: "user-105",
            name: "Алексей Иванов",
            avatarUrl: "https://i.pravatar.cc/150?u=alex",
        },
        createdAt: "2026-03-19T16:45:00Z",
        likesCount: 1,
        isEdited: false,
        canEdit: true,
        canDelete: true,
        replies: [],
    },

    {
        id: "comment-007",
        projectId: "proj-uuid-001",
        content: "Всем привет! Предлагаю провести демо-стенд 25 марта в 11:00. Кто сможет?",
        author: {
            id: "user-101",
            name: "Анна Смирнова",
            avatarUrl: "https://i.pravatar.cc/150?u=anna",
        },
        createdAt: "2026-03-20T10:15:00Z",
        likesCount: 6,
        isEdited: false,
        canEdit: true,
        canDelete: true,
        replies: [
            {
                id: "comment-008",
                projectId: "proj-uuid-001",
                content: "Я смогу, но только до 12:30.",
                author: {
                    id: "user-102",
                    name: "Иван Петров",
                    avatarUrl: "https://i.pravatar.cc/150?u=ivan",
                },
                createdAt: "2026-03-20T10:22:00Z",
                parentId: "comment-007",
                likesCount: 0,
            },
            {
                id: "comment-009",
                projectId: "proj-uuid-001",
                content: "+1, удобно время",
                author: {
                    id: "user-104",
                    name: "Елена Маркова",
                    avatarUrl: "https://i.pravatar.cc/150?u=elena",
                },
                createdAt: "2026-03-20T10:35:00Z",
                parentId: "comment-007",
                likesCount: 1,
            },
        ],
    },
];

export default function ProjectCommentsPage() {
    const { projectId } = useParams<{ projectId: string }>();

    const { data: comments = mockProjectComments, isLoading } = useGetProjectCommentsQuery(projectId!, {
        skip: !projectId,
    });

    return (
        <div className="container max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <ProjectCommentsHeader projectId={projectId!} />

            <div className="mt-8 space-y-10">
                {/* Форма добавления нового комментария */}
                <ProjectCommentForm projectId={projectId!} />

                {/* Список комментариев */}
                <ProjectCommentsList comments={comments} isLoading={isLoading} projectId={projectId!} />
            </div>
        </div>
    );
}
