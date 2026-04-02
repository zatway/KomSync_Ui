import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { cn } from "@/shared/lib/ui_shadcn/utils"
import { ColumnHeader } from "./ColumnHeader"
import type { TaskShortDto } from "@/types/dto/tasks/TaskShortDto"
import type { ReactNode } from "react"

interface KanbanColumnProps {
    id: string
    title: string
    tasks: TaskShortDto[]
    children: ReactNode
    color?: "blue" | "purple" | "amber" | "emerald" | "slate"
}

export function KanbanColumn({
                                 id,
                                 title,
                                 tasks,
                                 children,
                                 color = "slate",
                             }: KanbanColumnProps) {
    const { setNodeRef } = useDroppable({ id })

    return (
        <div
            className={cn(
                "flex flex-col min-w-[340px] m-h-[400px] h-screen bg-muted/20 rounded-xl border border-border/30 overflow-hidden shadow-sm bg-card:",
            )}
        >
            <ColumnHeader title={title} count={tasks.length} color={color} />

            <SortableContext id={id} items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                <div
                    ref={setNodeRef}
                    className="flex-1 p-3 space-y-3 overflow-y-auto min-h-[400px]"
                >
                    {children}
                </div>
            </SortableContext>
        </div>
    )
}
