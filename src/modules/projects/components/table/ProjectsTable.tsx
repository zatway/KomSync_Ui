"use client";

import { useMemo } from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { ArrowUpDown, Edit, Trash2, FolderKanban } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/ui_shadcn/table";
import { Button } from "@/shared/ui_shadcn/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui_shadcn/avatar";
import { Progress } from "@/shared/ui_shadcn/progress";
import { useGetProjectsQuery } from "@/modules/projects/api/projectsApi";
import { ProjectBriefDto } from "@/types/dto/projects/ProjectBriefDto";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/app/routes/AppRoutes";

export const mockProjects: ProjectBriefDto[] = [
    {
        id: "proj-uuid-001",
        key: "MOBAPP",
        name: "Мобильное приложение для клиентов",
        description: "Приложение для записи на диагностику и просмотра результатов. iOS + Android",
        ownerId: "user-101",
        ownerName: "Анна Смирнова",
        ownerAvatarUrl: "https://i.pravatar.cc/150?u=anna",
        memberCount: 7,
        taskCount: 124,
        openTaskCount: 42,
        completedTaskCount: 82,
        progress: 66,
        dueDate: "2026-06-30",
        lastActivityAt: "2026-03-13T14:22:00Z",
        createdAt: "2025-11-05T09:15:00Z",
        updatedAt: "2026-03-13T14:22:00Z",
        color: "#10b981", // emerald-500
        icon: "📱",
    },

    {
        id: "proj-uuid-002",
        key: "CRM2026",
        name: "Внедрение новой CRM-системы",
        description: "Переход с старой Bitrix24 на кастомную CRM + интеграции с 1С и телефонией",
        ownerId: "user-205",
        ownerName: "Дмитрий Ковалёв",
        ownerAvatarUrl: "https://i.pravatar.cc/150?u=dm",
        memberCount: 12,
        taskCount: 238,
        openTaskCount: 115,
        completedTaskCount: 123,
        progress: 52,
        dueDate: "2026-09-15",
        lastActivityAt: "2026-03-14T08:45:00Z",
        createdAt: "2025-08-20T11:30:00Z",
        updatedAt: "2026-03-14T08:45:00Z",
        color: "#3b82f6", // blue-500
        icon: "💼",
    },

    {
        id: "proj-uuid-003",
        key: "SITE2025",
        name: "Редизайн корпоративного сайта",
        description: "Полный редизайн + переход на Next.js 15 + улучшение SEO и скорости",
        ownerId: "user-101",
        ownerName: "Анна Смирнова",
        ownerAvatarUrl: "https://i.pravatar.cc/150?u=anna",
        memberCount: 4,
        taskCount: 68,
        openTaskCount: 9,
        completedTaskCount: 59,
        progress: 87,
        dueDate: "2026-04-20",
        lastActivityAt: "2026-03-12T17:10:00Z",
        createdAt: "2025-12-10T14:00:00Z",
        updatedAt: "2026-03-12T17:10:00Z",
        color: "#8b5cf6", // violet-500
        icon: "🌐",
    },

    {
        id: "proj-uuid-004",
        key: "INT2026",
        name: "Интеграция с лабораториями-партнёрами",
        description: "Автоматическая передача результатов анализов из внешних лабораторий",
        ownerId: "user-318",
        ownerName: "Елена Петрова",
        ownerAvatarUrl: "https://i.pravatar.cc/150?u=elena",
        memberCount: 5,
        taskCount: 47,
        openTaskCount: 38,
        completedTaskCount: 9,
        progress: 19,
        dueDate: "2026-12-01",
        lastActivityAt: "2026-03-10T11:55:00Z",
        createdAt: "2026-02-15T10:20:00Z",
        updatedAt: "2026-03-10T11:55:00Z",
        color: "#f59e0b", // amber-500
        icon: "🔬",
    },

    {
        id: "proj-uuid-005",
        key: "ARCH2025",
        name: "Архив старых проектов 2024–2025",
        description: "Перенос завершённых проектов в архив + очистка старых данных",
        ownerId: "user-205",
        ownerName: "Дмитрий Ковалёв",
        ownerAvatarUrl: "https://i.pravatar.cc/150?u=dm",
        memberCount: 2,
        taskCount: 15,
        openTaskCount: 0,
        completedTaskCount: 15,
        progress: 100,
        dueDate: "2026-02-28",
        lastActivityAt: "2026-02-27T16:30:00Z",
        createdAt: "2026-01-10T09:00:00Z",
        updatedAt: "2026-02-27T16:30:00Z",
        color: "#6b7280", // gray-500
        icon: "📦",
    },
];

export function ProjectsTable() {
    const { data: projects = mockProjects, isLoading } = useGetProjectsQuery();
    const navigate = useNavigate();

    const columns = useMemo<ColumnDef<ProjectBriefDto>[]>(
        () => [
            {
                accessorKey: "name",
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Название
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: ({ row }) => (
                    <div className="flex items-center gap-3">
                        <div
                            className="h-8 w-8 rounded-md flex items-center justify-center text-xl shadow-sm"
                            style={{ backgroundColor: row.original.color ? `${row.original.color}20` : "#3b82f620" }}
                        >
                            {row.original.icon || "📁"}
                        </div>
                        <div>
                            <div className="font-medium">{row.original.name}</div>
                            <div className="text-xs text-muted-foreground">{row.original.key}</div>
                        </div>
                    </div>
                ),
            },
            {
                accessorKey: "ownerName",
                header: "Владелец",
                cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={row.original.ownerAvatarUrl} alt={row.original.ownerName} />
                            <AvatarFallback>{row.original.ownerName?.[0]?.toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span>{row.original.ownerName}</span>
                    </div>
                ),
            },
            {
                accessorKey: "memberCount",
                header: "Участники",
                cell: ({ row }) => <div>{row.original.memberCount || 0}</div>,
            },
            {
                accessorKey: "taskCount",
                header: "Задачи",
                cell: ({ row }) => (
                    <div>
                        {row.original.taskCount || 0}
                        {row.original.openTaskCount !== undefined && (
                            <span className="text-xs text-muted-foreground ml-1">
                ({row.original.openTaskCount} открытых)
              </span>
                        )}
                    </div>
                ),
            },
            {
                accessorKey: "progress",
                header: "Прогресс",
                cell: ({ row }) =>
                    row.original.progress !== undefined ? (
                        <div className="flex items-center gap-2">
                            <Progress value={row.original.progress} className="h-2 w-24" />
                            <span className="text-sm font-medium">{row.original.progress}%</span>
                        </div>
                    ) : (
                        "—"
                    ),
            },
            {
                accessorKey: "dueDate",
                header: "Срок",
                cell: ({ row }) =>
                    row.original.dueDate ? (
                        <span className="text-sm">
              {format(parseISO(row.original.dueDate), "d MMM yyyy", { locale: ru })}
            </span>
                    ) : (
                        "—"
                    ),
            },
            {
                id: "actions",
                header: "Действия",
                cell: ({ row }) => {
                    const project = row.original;
                    return (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate(`${AppRoutes.PROJECTS}/${project.id}`)}
                            >
                                <FolderKanban className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate(`${AppRoutes.PROJECTS}/${project.id}/edit`)}
                            >
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    );
                },
            },
        ],
        [navigate]
    );

    const table = useReactTable({
        data: projects,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    if (isLoading) {
        return (
            <div className="p-8 text-center text-muted-foreground">
                Загрузка проектов...
            </div>
        );
    }

    if (!projects.length) {
        return (
            <div className="p-12 text-center text-muted-foreground">
                <p className="text-lg mb-4">Нет проектов</p>
                <p>Создайте первый проект, чтобы начать работу</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                className="hover:bg-muted/50 transition-colors cursor-pointer"
                                onClick={() => navigate(`${AppRoutes.PROJECTS}/${row.original.id}`)}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                Нет результатов
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
