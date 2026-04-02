"use client";

import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
    useChangeTaskStatusMutation,
    useGetTasksByProjectQuery,
} from "@/modules/tasks/api/tasksApi";
import {
    useGetProjectTaskStatusColumnsQuery,
    useCreateProjectTaskStatusColumnMutation,
} from "@/modules/projects/api/projectsApi";
import { TaskShortDto } from "@/types/dto/tasks/TaskShortDto";
import { TaskCard } from "./TaskCard";
import { TaskColumn } from "./TaskColumn";
import { Button } from "@/shared/ui_shadcn/button";
import { Input } from "@/shared/ui_shadcn/input";
import { Plus } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/app/routes/AppRoutes";
import type { TaskStatusColumnDto } from "@/types/dto/tasks/TaskStatusColumnDto";
import { toast } from "sonner";

interface ProjectKanbanBoardProps {
    projectId: string;
}

export default function ProjectKanbanBoard({ projectId }: ProjectKanbanBoardProps) {
    const { data: serverTasks = [], isFetching } = useGetTasksByProjectQuery(projectId);
    const { data: statusColumns = [], isFetching: colsLoading } = useGetProjectTaskStatusColumnsQuery(
        projectId,
        { skip: !projectId }
    );
    const [changeStatus] = useChangeTaskStatusMutation();
    const [createColumn, { isLoading: creatingCol }] = useCreateProjectTaskStatusColumnMutation();
    const navigate = useNavigate();

    const sortedColumns = useMemo(
        () => [...statusColumns].sort((a, b) => a.sortOrder - b.sortOrder),
        [statusColumns]
    );

    const [columns, setColumns] = useState<Record<string, TaskShortDto[]>>({});
    const [activeTask, setActiveTask] = useState<TaskShortDto | null>(null);
    const [newColName, setNewColName] = useState("");

    const tasksById = useMemo(() => {
        const m = new Map<string, TaskShortDto>();
        serverTasks.forEach((t) => m.set(t.id, t));
        return m;
    }, [serverTasks]);

    useEffect(() => {
        const initial: Record<string, TaskShortDto[]> = {};
        sortedColumns.forEach((c) => {
            initial[c.id] = [];
        });

        serverTasks.forEach((task) => {
            const colId = task.status?.id;
            if (colId && initial[colId]) {
                initial[colId].push(task);
            } else if (sortedColumns[0]) {
                initial[sortedColumns[0].id].push(task);
            }
        });

        sortedColumns.forEach((c) => {
            initial[c.id].sort((a, b) => a.sortOrder - b.sortOrder || a.taskNumber - b.taskNumber);
        });

        setColumns(initial);
    }, [serverTasks, sortedColumns]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 },
        })
    );

    const handleDragStart = (event: { active: { id: string | number } }) => {
        const task = tasksById.get(String(event.active.id));
        if (task) setActiveTask(task);
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveTask(null);
        if (!over) return;

        const activeTaskId = String(active.id);
        const overId = String(over.id);

        const activeTask = tasksById.get(activeTaskId);
        if (!activeTask) return;

        let newStatusColumnId = activeTask.status.id;
        let newOrder = activeTask.sortOrder;

        const columnHit = sortedColumns.find((c) => c.id === overId);
        if (columnHit) {
            newStatusColumnId = columnHit.id;
            newOrder = (columns[columnHit.id]?.length ?? 1) - 1;
            if (newOrder < 0) newOrder = 0;
        } else {
            const overTask = tasksById.get(overId);
            if (overTask) {
                newStatusColumnId = overTask.status.id;
                const columnTasks = columns[newStatusColumnId] ?? [];
                const overIndex = columnTasks.findIndex((t) => t.id === overId);
                newOrder = overIndex >= 0 ? overIndex : activeTask.sortOrder;
            }
        }

        if (
            newStatusColumnId === activeTask.status.id &&
            newOrder === activeTask.sortOrder
        )
            return;

        try {
            await changeStatus({
                taskId: activeTaskId,
                projectId,
                newStatusColumnId,
                newSortOrder: newOrder,
            }).unwrap();
        } catch (e) {
            console.error(e);
            toast.error("Не удалось обновить статус задачи");
        }
    };

    const handleAddColumn = async () => {
        const name = newColName.trim();
        if (!name) return;
        try {
            await createColumn({ projectId, name, colorHex: null }).unwrap();
            setNewColName("");
            toast.success("Колонка добавлена");
        } catch {
            toast.error("Не удалось создать колонку");
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap justify-end gap-2 items-center">
                <div className="flex gap-2 items-center mr-auto">
                    <Input
                        placeholder="Новая колонка"
                        value={newColName}
                        onChange={(e) => setNewColName(e.target.value)}
                        className="max-w-xs"
                    />
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleAddColumn}
                        disabled={creatingCol || !newColName.trim()}
                    >
                        Добавить колонку
                    </Button>
                </div>
                <Button type="button" onClick={() => navigate(`${AppRoutes.TASKS}/${projectId}/create`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Новая задача
                </Button>
            </div>

            {(isFetching || colsLoading) && (
                <p className="text-sm text-muted-foreground">Загрузка…</p>
            )}

            {!sortedColumns.length && !colsLoading && (
                <p className="text-sm text-muted-foreground">
                    Нет колонок статусов для проекта. Добавьте колонку выше.
                </p>
            )}

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                modifiers={[restrictToVerticalAxis]}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="flex gap-6 overflow-x-auto pb-8">
                    {sortedColumns.map((column: TaskStatusColumnDto) => (
                        <TaskColumn
                            key={column.id}
                            column={{ id: column.id, title: column.name }}
                            tasks={columns[column.id] ?? []}
                            projectId={projectId}
                        />
                    ))}
                </div>

                <DragOverlay>
                    {activeTask && <TaskCard task={activeTask} isOverlay projectId={projectId} />}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
