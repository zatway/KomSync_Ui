// Полный исправленный ProjectKanbanBoard.tsx
"use client";

import { useParams } from "react-router-dom";
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useGetTasksByProjectQuery, useReorderTaskMutation } from "@/modules/tasks/api/tasksApi";
import { TaskShortDto } from "@/types/dto/tasks/TaskShortDto";
import { TaskCard } from "./TaskCard";
import { TaskColumn } from "./TaskColumn";
import { Button } from "@/shared/ui_shadcn/button";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";

const mockTasks: TaskShortDto[] = [
    // todo (К выполнению)
    {
        id: "task-001",
        key: "MOBAPP-101",
        title: "Настроить авторизацию через телефон",
        description: "Добавить вход по номеру + OTP",
        status: "todo",
        priority: "high",
        assignee: { id: "user-102", name: "Иван Петров", avatarUrl: "https://i.pravatar.cc/150?u=ivan" },
        dueDate: "2026-04-05",
        projectId: "proj-uuid-001",
        order: 0,
        createdAt: "2026-03-10T09:15:00Z",
        updatedAt: "2026-03-19T14:30:00Z",
    },
    {
        id: "task-002",
        key: "MOBAPP-102",
        title: "Дизайн экрана результатов анализов",
        description: "Сделать красивый график + PDF-экспорт",
        status: "todo",
        priority: "medium",
        assignee: null,
        dueDate: "2026-04-15",
        projectId: "proj-uuid-001",
        order: 1,
        createdAt: "2026-03-12T11:20:00Z",
        updatedAt: "2026-03-12T11:20:00Z",
    },

    // in_progress (В работе)
    {
        id: "task-003",
        key: "MOBAPP-103",
        title: "Интеграция с API лаборатории №1",
        description: "Получение результатов в реальном времени",
        status: "in_progress",
        priority: "critical",
        assignee: { id: "user-101", name: "Анна Смирнова", avatarUrl: "https://i.pravatar.cc/150?u=anna" },
        dueDate: "2026-03-28",
        projectId: "proj-uuid-001",
        order: 0,
        createdAt: "2026-02-20T08:45:00Z",
        updatedAt: "2026-03-20T16:10:00Z",
    },
    {
        id: "task-004",
        key: "MOBAPP-104",
        title: "Push-уведомления о готовности анализа",
        description: "Firebase Cloud Messaging + шаблоны",
        status: "in_progress",
        priority: "high",
        assignee: { id: "user-103", name: "Мария Кузнецова", avatarUrl: "https://i.pravatar.cc/150?u=maria" },
        dueDate: "2026-04-10",
        projectId: "proj-uuid-001",
        order: 1,
        createdAt: "2026-03-05T13:55:00Z",
        updatedAt: "2026-03-18T09:30:00Z",
    },
    {
        id: "task-005",
        key: "MOBAPP-105",
        title: "Тёмная тема в приложении",
        description: "Поддержка system/dark/light",
        status: "in_progress",
        priority: "medium",
        assignee: null,
        projectId: "proj-uuid-001",
        order: 2,
        createdAt: "2026-03-15T10:00:00Z",
        updatedAt: "2026-03-15T10:00:00Z",
    },

    // review (На проверке)
    {
        id: "task-006",
        key: "MOBAPP-106",
        title: "Экран профиля пациента",
        description: "Фото, ФИО, история анализов",
        status: "review",
        priority: "medium",
        assignee: { id: "user-102", name: "Иван Петров", avatarUrl: "https://i.pravatar.cc/150?u=ivan" },
        dueDate: "2026-03-25",
        projectId: "proj-uuid-001",
        order: 0,
        createdAt: "2026-03-08T14:20:00Z",
        updatedAt: "2026-03-19T17:45:00Z",
    },

    // done (Готово)
    {
        id: "task-007",
        key: "MOBAPP-107",
        title: "Splash screen и иконки приложения",
        description: "Адаптив под разные размеры",
        status: "done",
        priority: "low",
        assignee: { id: "user-103", name: "Мария Кузнецова", avatarUrl: "https://i.pravatar.cc/150?u=maria" },
        dueDate: "2026-03-10",
        projectId: "proj-uuid-001",
        order: 0,
        createdAt: "2026-02-25T09:30:00Z",
        updatedAt: "2026-03-10T15:20:00Z",
    },
    {
        id: "task-008",
        key: "MOBAPP-108",
        title: "Локализация на русский и английский",
        description: "i18n + переводы от заказчика",
        status: "done",
        priority: "medium",
        assignee: { id: "user-101", name: "Анна Смирнова", avatarUrl: "https://i.pravatar.cc/150?u=anna" },
        dueDate: "2026-03-05",
        projectId: "proj-uuid-001",
        order: 1,
        createdAt: "2026-02-28T11:10:00Z",
        updatedAt: "2026-03-05T16:40:00Z",
    },

    // blocked (Заблокировано)
    {
        id: "task-009",
        key: "MOBAPP-109",
        title: "Интеграция с Apple Health",
        description: "Синхронизация шагов и пульса",
        status: "blocked",
        priority: "low",
        assignee: null,
        projectId: "proj-uuid-001",
        order: 0,
        createdAt: "2026-03-01T10:00:00Z",
        updatedAt: "2026-03-01T10:00:00Z",
    },
    {
        id: "task-010",
        key: "MOBAPP-110",
        title: "Оплата подписки внутри приложения",
        description: "Stripe + In-App Purchases",
        status: "blocked",
        priority: "high",
        assignee: { id: "user-102", name: "Иван Петров", avatarUrl: "https://i.pravatar.cc/150?u=ivan" },
        dueDate: "2026-05-01",
        projectId: "proj-uuid-001",
        order: 1,
        createdAt: "2026-03-14T08:45:00Z",
        updatedAt: "2026-03-20T12:15:00Z",
    },

    // Дополнительные задачи (для заполнения доски)
    {
        id: "task-011",
        key: "MOBAPP-111",
        title: "Тестирование на iOS 18",
        description: "Проверка багов на последней версии",
        status: "todo",
        priority: "medium",
        assignee: null,
        dueDate: "2026-04-20",
        projectId: "proj-uuid-001",
        order: 2,
        createdAt: "2026-03-18T15:30:00Z",
        updatedAt: "2026-03-18T15:30:00Z",
    },
    {
        id: "task-012",
        key: "MOBAPP-112",
        title: "Рефакторинг API-слой",
        description: "Переход на RTK Query вместо axios",
        status: "in_progress",
        priority: "high",
        assignee: { id: "user-101", name: "Анна Смирнова", avatarUrl: "https://i.pravatar.cc/150?u=anna" },
        dueDate: "2026-04-01",
        projectId: "proj-uuid-001",
        order: 3,
        createdAt: "2026-03-16T09:00:00Z",
        updatedAt: "2026-03-19T10:45:00Z",
    },
];

const COLUMNS = [
    { id: "todo", title: "К выполнению" },
    { id: "in_progress", title: "В работе" },
    { id: "review", title: "На проверке" },
    { id: "done", title: "Готово" },
    { id: "blocked", title: "Заблокировано" },
];

interface ProjectKanbanBoardProps {
    projectId: string;
}

export default function ProjectKanbanBoard({ projectId }: ProjectKanbanBoardProps) {
    const { data: serverTasks = mockTasks } = useGetTasksByProjectQuery(projectId);
    const [reorderTask] = useReorderTaskMutation();

    const [columns, setColumns] = useState<Record<string, TaskShortDto[]>>({});
    const [activeTask, setActiveTask] = useState<TaskShortDto | null>(null);

    // Инициализация колонок один раз при загрузке задач
    useEffect(() => {
        if (!serverTasks.length) return;

        const initial: Record<string, TaskShortDto[]> = {};
        COLUMNS.forEach((col) => (initial[col.id] = []));

        serverTasks.forEach((task) => {
            if (initial[task.status]) {
                initial[task.status].push(task);
            } else {
                // Если статус неизвестен — кидаем в todo
                initial["todo"].push({ ...task, status: "todo" });
            }
        });

        // Сортируем по order
        Object.values(initial).forEach((col) => col.sort((a, b) => a.order - b.order));

        setColumns(initial);
    }, [serverTasks]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 }, // чтобы не дергалось при клике
        })
    );

    const handleDragStart = (event: any) => {
        const { active } = event;
        const task = serverTasks.find((t) => t.id === active.id);
        if (task) setActiveTask(task);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            setActiveTask(null);
            return;
        }

        const activeTaskId = active.id as string;
        const overId = over.id as string;

        // Находим задачу
        const activeTask = serverTasks.find((t) => t.id === activeTaskId);
        if (!activeTask) return;

        // Определяем, куда дропнули
        let newStatus = activeTask.status;
        let newOrder = 0;

        // Если дропнули на колонку (over.id — это id колонки)
        if (COLUMNS.some((c) => c.id === overId)) {
            newStatus = overId as "todo" | "in_progress" | "review" | "done" | "blocked";
            // Порядок — в конец колонки
            newOrder = (columns[overId]?.length || 0);
        } else {
            // Дропнули на другую карточку
            const overTask = serverTasks.find((t) => t.id === overId);
            if (overTask) {
                newStatus = overTask.status;
                const columnTasks = columns[newStatus] || [];
                const overIndex = columnTasks.findIndex((t) => t.id === overId);
                newOrder = overIndex;
            }
        }

        // Если ничего не изменилось — выходим
        if (newStatus === activeTask.status && newOrder === activeTask.order) {
            setActiveTask(null);
            return;
        }

        // Оптимистическое обновление UI
        setColumns((prevColumns) => {
            const newColumns = { ...prevColumns };

            // Удаляем из старой колонки
            newColumns[activeTask.status] = (newColumns[activeTask.status] || []).filter(
                (t) => t.id !== activeTaskId
            );

            // Добавляем в новую с новым порядком
            const targetColumn = [...(newColumns[newStatus] || [])];
            const updatedTask = { ...activeTask, status: newStatus, order: newOrder };
            targetColumn.splice(newOrder, 0, updatedTask);

            // Пересчитываем order для всех задач в целевой колонке
            newColumns[newStatus] = targetColumn.map((t, idx) => ({ ...t, order: idx }));

            return newColumns;
        });

        // Отправляем на сервер
        reorderTask({
            taskId: activeTaskId,
            newStatus,
            newOrder,
        }).unwrap().catch((err) => {
            console.error("Ошибка сохранения порядка:", err);
            // Можно откатить UI, если нужно
        });

        setActiveTask(null);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Kanban доска проекта</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Новая задача
                </Button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                modifiers={[restrictToVerticalAxis]}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="flex gap-6 overflow-x-auto pb-8">
                    {COLUMNS.map((column) => (
                        <TaskColumn
                            key={column.id}
                            column={column}
                            tasks={columns[column.id] || []}
                        />
                    ))}
                </div>

                {/* Drag Overlay — красивая карточка при перетаскивании */}
                <DragOverlay>
                    {activeTask && <TaskCard task={activeTask} isOverlay />}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
