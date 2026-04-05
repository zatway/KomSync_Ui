import {FC} from "react";
import type {TaskHistoryDto} from "@/types/dto/taskHistory/TaskHistoryDto";
import {Card, CardContent, CardHeader} from "@/shared/ui_shadcn/card";
import {format, parseISO} from "date-fns";
import {ru} from "date-fns/locale";

interface TaskHistoryProps {
    history: TaskHistoryDto[];
}

function renderValue(v: unknown) {
    if (v === null || v === undefined || v === "") {
        return <span className="text-muted-foreground italic">пусто</span>;
    }
    if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") {
        return String(v);
    }
    try {
        return JSON.stringify(v);
    } catch {
        return String(v);
    }
}

const TaskHistory: FC<TaskHistoryProps> = ({history}) => {
    return (
        history.map(h =>
            <Card className="overflow-hidden" key={h.id}>
            <CardHeader className="pb-2 bg-muted/40">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/*<Avatar className="h-9 w-9">*/}
                        {/*    <AvatarImage src={h.changedAt} />*/}
                        {/*    /!*<AvatarFallback>{entry.changedBy.name[0]}</AvatarFallback>*!/*/}
                        {/*</Avatar>*/}
                        <div>
                            <p className="font-medium">{h.changedById}</p>
                            <p className="text-xs text-muted-foreground">
                                {format(parseISO(h.changedAt), "d MMMM yyyy, HH:mm", { locale: ru })}
                            </p>
                        </div>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                        Изменено поле: <span className="font-semibold text-foreground">{h.propertyName}</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-4 space-y-3">
                <div className="grid grid-cols-2 gap-6 text-sm">
                    <div>
                        <p className="text-muted-foreground">Было:</p>
                        <p className="mt-1 font-medium break-words">
                            {renderValue(h.oldValue)}
                        </p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Стало:</p>
                        <p className="mt-1 font-medium break-words">
                            {renderValue(h.newValue)}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>)
    );
};

export default TaskHistory;
