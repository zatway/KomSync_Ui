import {useSortable} from "@dnd-kit/sortable"
import {CSS} from "@dnd-kit/utilities"
import {Card, CardContent, CardHeader} from "@/shared/ui_shadcn/card"
import {Avatar, AvatarFallback, AvatarImage} from "@/shared/ui_shadcn/avatar"
import {Badge} from "@/shared/ui_shadcn/badge"
import {cn} from "@/shared/lib/ui_shadcn/utils"
import {GripVertical, Clock, MessageSquare} from "lucide-react"
import {StatusBadge} from "./StatusBadge"
import {TaskShortDto} from "@/types/dto/tasks/TaskShortDto";
import {formatDate} from "@/shared/lib";

interface TaskCardProps {
    task: TaskShortDto
}

export function TaskCard({task}: TaskCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({id: task.id})

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.7 : 1,
    }

    const getDescription = () => {
        if (task.description) {
            if(task.description.length > 40) {
                return task.description.slice(0, 40) + '...'
            }
        }
    }

    return (
        <Card
            ref={setNodeRef}
            style={style}
            className={cn(
                "group relative border-border/50 bg-card/80 shadow-sm",
                "hover:shadow-md hover:border-primary/40 transition-all duration-200",
                "cursor-grab active:cursor-grabbing select-none",
                isDragging && "ring-2 ring-primary/50 scale-[1.02] shadow-xl"
            )}
            {...attributes}
        >
            <div
                {...listeners}
                className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center
                cursor-grab opacity-40 group-hover:opacity-100 transition-opacity"
            >
                <GripVertical className="h-5 w-5 text-muted-foreground"/>
            </div>

            <CardHeader className="p-3 pb-1 pl-10 flex flex-col items-start justify-between gap-2">
                <h3 className="font-bold text-sm leading-tight line-clamp-2 flex-1">
                    {task.id}
                </h3>
                <h3 className=" fg-primary font-medium text-sm leading-tight line-clamp-2 flex-1">
                    {task.title}
                </h3>
                <StatusBadge status={task.status}/>
            </CardHeader>

            <CardContent className="p-3 pt-1 pl-10 space-y-2.5">
                <div title={task.description} className="flex flex-col items-start">
                    <h4>{getDescription()}</h4>
                </div>

              {/*  <div className="flex items-center justify-between text-xs text-muted-foreground">*/}
              {/*      <div className="flex items-center gap-3">*/}
              {/*          {task.assignee && (*/}
              {/*              <Avatar className="h-6 w-6">*/}
              {/*                  <AvatarImage src={task.assignee.avatar}/>*/}
              {/*                  <AvatarFallback className="text-xs">*/}
              {/*                      {task.assignee.name.slice(0, 2).toUpperCase()}*/}
              {/*                  </AvatarFallback>*/}
              {/*              </Avatar>*/}
              {/*          )}*/}
              {/*          {task.deadline && (*/}
              {/*              <span className="flex items-center gap-1">*/}
              {/*  <Clock className="h-3 w-3"/> {task.d}*/}
              {/*</span>*/}
              {/*          )}*/}
              {/*      </div>*/}

              {/*      {task.comments !== undefined && (*/}
              {/*          <span className="flex items-center gap-1">*/}
              {/*<MessageSquare className="h-3 w-3"/> {task.comments}*/}
            {/*        )}*/}
            {/*    </div>*/}
                {task.deadline &&
                    <div className={"flex flex-row"}>
                    <Clock className="h-3 w-3"/> {<h5 className={"fill-destructive"}>{formatDate(task.deadline)}</h5>}
                </div>}
            </CardContent>
        </Card>
    )
}
