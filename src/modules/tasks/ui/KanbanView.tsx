import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core"
import { useChangeTaskStatusMutation } from "../api/tasksApi"
import { KanbanColumn } from "../ui/KanbanColumn"
import { TaskCard } from "../ui/TaskCard"
import { useGetTasksByProjectQuery } from "../api/tasksApi"
// import { sonner as toast } from "sonner"
import {ProjectTaskStatus} from "@/types/dto";

// Пример статусов (можно вынести в constants/taskStatuses.ts)
const columns = [
    { id: "queue", title: "Очередь", color: "slate" as const },
    { id: "in-progress", title: "В работе", color: "blue" as const },
    { id: "review", title: "Ревью", color: "purple" as const },
    { id: "testing", title: "Тестирование", color: "amber" as const },
    { id: "done", title: "Готово", color: "emerald" as const },
]

export function KanbanView({ projectId }: { projectId: string }) {
    const { data: tasks = [], isLoading } = useGetTasksByProjectQuery(projectId)
    const [changeStatus] = useChangeTaskStatusMutation()

    // Группировка задач по статусам
    const tasksByStatus = columns.reduce((acc, col) => {
        acc[col.id] = tasks.filter(t => t.status === col.id)
        return acc
    }, {} as Record<string, typeof tasks>)

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over) return

        const taskId = active.id as string
        const newStatus = over.id as string

        if (newStatus !== active.data.current?.sortable?.containerId) {
            changeStatus({ taskId, newStatus: ProjectTaskStatus.Todo })
                .unwrap()
                .then(() => toast.success("Статус обновлён"))
                .catch(() => toast.error("Ошибка обновления статуса"))
        }
    }

    if (isLoading) return <div className="p-8 text-center">Загрузка...</div>

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="flex gap-4 overflow-x-auto pb-4">
                {columns.map(col => (
                    <KanbanColumn
                        key={col.id}
                        id={col.id}
                        title={col.title}
                        tasks={tasksByStatus[col.id]}
                        color={col.color}
                    >
                        {tasksByStatus[col.id].map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </KanbanColumn>
                ))}
            </div>
        </DndContext>
    )
}
