import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent, CardHeader } from "@/shared/ui_shadcn/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui_shadcn/avatar"
import { Badge } from "@/shared/ui_shadcn/badge"
import { cn } from "@/shared/lib/ui_shadcn/utils"
import { GripVertical, Clock, MessageSquare } from "lucide-react"
import { StatusBadge } from "./StatusBadge"

interface TaskCardProps {
    task: {
        id: string
        title: string
        tags?: string[]
        status: string
        assignee?: { name: string; avatar?: string }
        timeSpent?: string
        comments?: number
    }
}

export function TaskCard({ task }: TaskCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.7 : 1,
    }

    return (
        <Card
            ref={setNodeRef}
            style={style}
            className={cn(
                "group relative border-border/50 bg-card/80 backdrop-blur-sm shadow-sm",
                "hover:shadow-md hover:border-primary/40 transition-all duration-200",
                "cursor-grab active:cursor-grabbing select-none",
                isDragging && "ring-2 ring-primary/50 scale-[1.02] shadow-xl"
            )}
            {...attributes}
        >
            {/* drag handle */}
            <div
                {...listeners}
                className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center cursor-grab opacity-40 group-hover:opacity-100 transition-opacity"
            >
                <GripVertical className="h-5 w-5 text-muted-foreground" />
            </div>

            <CardHeader className="p-3 pb-1 pl-10 flex flex-row items-start justify-between gap-2">
                <h3 className="font-medium text-sm leading-tight line-clamp-2 flex-1">
                    {task.title}
                </h3>
                <StatusBadge status={task.status as any} />
            </CardHeader>

            <CardContent className="p-3 pt-1 pl-10 space-y-2.5">
                {/* tags */}
                {task.tags && task.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {task.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs px-2 py-0 h-5 bg-background/60">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}

                {/* footer */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                        {task.assignee && (
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={task.assignee.avatar} />
                                <AvatarFallback className="text-xs">
                                    {task.assignee.name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        )}
                        {task.timeSpent && (
                            <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {task.timeSpent}
              </span>
                        )}
                    </div>

                    {task.comments !== undefined && (
                        <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" /> {task.comments}
            </span>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
