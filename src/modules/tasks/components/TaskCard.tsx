import { TaskShortDto } from "@/types/dto/tasks/TaskShortDto";
import { Card, CardContent } from "@/shared/ui_shadcn/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui_shadcn/avatar";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, AlertCircle } from "lucide-react";
import { format, parseISO, isPast } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/shared/lib/ui_shadcn/utils";
import { Link } from "react-router-dom";
import { AppRoutes } from "@/app/routes/AppRoutes";
import { ProjectTaskPriority } from "@/types/dto/enums/ProjectTaskPriority";

interface Props {
    task: TaskShortDto;
    isOverlay?: boolean;
    projectId: string;
}

const priorityClass: Record<ProjectTaskPriority, string> = {
    [ProjectTaskPriority.Critical]: "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300",
    [ProjectTaskPriority.High]: "bg-orange-100 text-orange-800 dark:bg-orange-950/40 dark:text-orange-300",
    [ProjectTaskPriority.Medium]: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-300",
    [ProjectTaskPriority.Low]: "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300",
};

export function TaskCard({ task, isOverlay = false, projectId }: Props) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const due = task.deadline;
    const isOverdue = due && isPast(parseISO(due));

    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={cn(
                "cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow",
                isOverlay && "opacity-80 scale-105 rotate-1 shadow-2xl"
            )}
        >
            <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                    <Link
                        to={`${AppRoutes.TASKS}/${projectId}/detail/${task.id}`}
                        className="font-medium line-clamp-2 hover:underline flex-1"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {task.title}
                    </Link>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{task.key}</span>
                        <span
                            className={cn(
                                "px-2 py-0.5 rounded-full text-xs",
                                priorityClass[task.priority]
                            )}
                        >
                            {task.priority}
                        </span>
                    </div>

                    {task.assignee && (
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={task.assignee.avatarUrl ?? undefined} />
                            <AvatarFallback>{task.assignee.name[0]}</AvatarFallback>
                        </Avatar>
                    )}
                </div>

                {due && (
                    <div className="flex items-center gap-1.5 text-xs">
                        <Calendar className="h-3.5 w-3.5" />
                        <span className={cn(isOverdue && "text-destructive")}>
                            {format(parseISO(due), "d MMM", { locale: ru })}
                        </span>
                        {isOverdue && <AlertCircle className="h-3.5 w-3.5 text-destructive" />}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
