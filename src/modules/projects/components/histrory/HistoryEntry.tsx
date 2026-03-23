import {ProjectHistoryEntryDto} from "@/types/dto/projects/ProjectHistoryEntryDto";
import {Card, CardContent, CardHeader} from "@/shared/ui_shadcn/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/shared/ui_shadcn/avatar";
import {format, parseISO} from "date-fns";
import {ru} from "date-fns/locale";

export function HistoryEntry({ entry }: { entry: ProjectHistoryEntryDto }) {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="pb-2 bg-muted/40">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={entry.changedBy.avatarUrl} />
                            <AvatarFallback>{entry.changedBy.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{entry.changedBy.name}</p>
                            <p className="text-xs text-muted-foreground">
                                {format(parseISO(entry.changedAt), "d MMMM yyyy, HH:mm", { locale: ru })}
                            </p>
                        </div>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                        Изменено поле: <span className="font-semibold text-foreground">{entry.field}</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-4 space-y-3">
                <div className="grid grid-cols-2 gap-6 text-sm">
                    <div>
                        <p className="text-muted-foreground">Было:</p>
                        <p className="mt-1 font-medium break-words">
                            {entry.oldValue ?? <span className="text-muted-foreground italic">пусто</span>}
                        </p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Стало:</p>
                        <p className="mt-1 font-medium break-words">
                            {entry.newValue ?? <span className="text-muted-foreground italic">пусто</span>}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
