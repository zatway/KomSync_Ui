import { Badge } from "@/shared/ui_shadcn/badge"
import { cn } from "@/shared/lib/ui_shadcn/utils"

type Status = "queue" | "in-progress" | "review" | "testing" | "done" | "blocked"

const statusStyles: Record<Status, string> = {
    queue: "bg-slate-700 text-slate-300 border-slate-600",
    "in-progress": "bg-blue-600/30 text-blue-400 border-blue-500/40",
    review: "bg-purple-600/30 text-purple-400 border-purple-500/40",
    testing: "bg-amber-600/30 text-amber-400 border-amber-500/40",
    done: "bg-emerald-600/30 text-emerald-400 border-emerald-500/40",
    blocked: "bg-rose-600/30 text-rose-400 border-rose-500/40",
}

interface StatusBadgeProps {
    status: Status
    className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const label = {
        queue: "Очередь",
        "in-progress": "В работе",
        review: "Ревью",
        testing: "Тестирование",
        done: "Готово",
        blocked: "Заблокировано",
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
