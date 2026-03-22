// src/modules/tasks/components/TaskCard.tsx
import { TaskShortDto } from "@/types/dto/tasks/TaskShortDto";
import { Card, CardContent } from "@/shared/ui_shadcn/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui_shadcn/avatar";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, AlertCircle } from "lucide-react";
import { format, parseISO, isPast } from "date-fns";
import { ru } from "date-fns/locale";
import {cn} from "@/shared/lib/ui_shadcn/utils";

interface Props {
    task: TaskShortDto;
    isOverlay?: boolean;
}

export function TaskCard({ task, isOverlay = false }: Props) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const isOverdue = task.dueDate && isPast(parseISO(task.dueDate));

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
                <h3 className="font-medium line-clamp-2">{task.title}</h3>

                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{task.key}</span>
                        {task.priority && (
                            <span
                                className={cn(
                                    "px-2 py-0.5 rounded-full text-xs",
                                    task.priority === "critical" && "bg-red-100 text-red-800",
                                    task.priority === "high" && "bg-orange-100 text-orange-800",
                                    task.priority === "medium" && "bg-yellow-100 text-yellow-800",
                                    task.priority === "low" && "bg-green-100 text-green-800"
                                )}
                            >
                {task.priority}
              </span>
                        )}
                    </div>

                    {task.assignee && (
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={task.assignee.avatarUrl} />
                            <AvatarFallback>{task.assignee.name[0]}</AvatarFallback>
                        </Avatar>
                    )}
                </div>

                {task.dueDate && (
                    <div className="flex items-center gap-1.5 text-xs">
                        <Calendar className="h-3.5 w-3.5" />
                        <span className={cn(isOverdue && "text-destructive")}>
              {format(parseISO(task.dueDate), "d MMM", { locale: ru })}
            </span>
                        {isOverdue && <AlertCircle className="h-3.5 w-3.5 text-destructive" />}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
