import { Badge } from "@/shared/ui_shadcn/badge"
import { cn } from "@/shared/lib/ui_shadcn/utils"
import {ProjectTaskStatus} from "@/types/dto/enums/ProjectTaskStatus";

const statusStyles: Record<ProjectTaskStatus, string> = {
    Todo: "bg-slate-700 text-slate-300 border-slate-600",
    InProgress: "bg-blue-600/30 text-blue-400 border-blue-500/40",
    Testing: "bg-amber-600/30 text-amber-400 border-amber-500/40",
    Review: "bg-purple-600/30 text-purple-400 border-purple-500/40",
    Done: "bg-emerald-600/30 text-emerald-400 border-emerald-500/40",
}

interface StatusBadgeProps {
    status: ProjectTaskStatus
    className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const label = {
        Todo: "Очередь",
        InProgress: "В работе",
        Review: "Ревью",
        Testing: "Тестирование",
        Done: "Готово",
    }[status]

    return (
        <Badge
            variant="outline"
            className={cn(
                "px-2.5 py-0.5 text-xs font-medium border",
                statusStyles[status],
                className
            )}
        >
            {label}
        </Badge>
    )
}
