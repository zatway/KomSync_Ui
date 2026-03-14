import { Badge } from "@/shared/ui_shadcn/badge"
import { cn } from "@/shared/lib/ui_shadcn/utils"
import { MoreHorizontal } from "lucide-react"

interface ColumnHeaderProps {
    title: string
    count: number
    color?: "blue" | "purple" | "amber" | "emerald" | "slate"
}

export function ColumnHeader({ title, count, color = "slate" }: ColumnHeaderProps) {
    const colorMap = {
        blue: "bg-blue-950/40 border-blue-800/50 text-blue-300",
        purple: "bg-purple-950/40 border-purple-800/50 text-purple-300",
        amber: "bg-amber-950/40 border-amber-800/50 text-amber-300",
        emerald: "bg-emerald-950/40 border-emerald-800/50 text-emerald-300",
        slate: "bg-slate-800/40 border-slate-700/50 text-slate-300",
    }

    return (
        <div
            className={cn(
                "px-4 py-3 border-b flex items-center justify-between font-medium text-sm",
                colorMap[color]
            )}
        >
            <div className="flex items-center gap-2">
                <span>{title}</span>
                <Badge variant="secondary" className="bg-background/60 px-2 min-w-[2rem] text-center">
                    {count}
                </Badge>
            </div>
            <button className="p-1 rounded hover:bg-accent/50">
                <MoreHorizontal className="h-4 w-4" />
            </button>
        </div>
    )
}
