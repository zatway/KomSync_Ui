import { Card, CardContent } from "@/shared/ui_shadcn/card";
import {FolderKanban, HistoryIcon, ListTodo, MessageSquare} from "lucide-react";
import { AppRoutes } from "@/app/routes/AppRoutes";
import {cn} from "@/shared/lib/ui_shadcn/utils";
import {useNavigate} from "react-router-dom";

interface Props {
    projectId: string;
}

export function ProjectQuickActions({ projectId }: Props) {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <ActionButton
                icon={<FolderKanban className="h-8 w-8" />}
                title="Доска задач"
                onClick={() => navigate(`${AppRoutes.TASKS}/${projectId}`)}
                color="bg-blue-500/10 hover:bg-blue-500/20 text-blue-600"
            />
            <ActionButton
                icon={<ListTodo className="h-8 w-8" />}
                title="Таблица задач"
                onClick={() => navigate(`${AppRoutes.PROJECTS}/${projectId}/table`)}
                color="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600"
            />
            <ActionButton
                icon={<MessageSquare className="h-8 w-8" />}
                title="Комментарии"
                onClick={() => navigate(`${AppRoutes.PROJECTS}/${projectId}/comments`)}
                color="bg-violet-500/10 hover:bg-violet-500/20 text-violet-600"
            />
            <ActionButton
                icon={<HistoryIcon className="h-8 w-8" />}
                title="История"
                onClick={() => navigate(`${AppRoutes.PROJECTS}/${projectId}/history`)}
                color="bg-violet-500/10 hover:bg-violet-500/20 text-violet-600"
            />
        </div>
    );
}

function ActionButton({
                          icon,
                          title,
                          onClick,
                          color,
                      }: {
    icon: React.ReactNode;
    title: string;
    onClick: () => void;
    color: string;
}) {
    return (
        <Card className={cn("cursor-pointer border-0 transition-all hover:shadow-md", color)} onClick={onClick}>
            <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 opacity-90">{icon}</div>
                <h3 className="font-semibold">{title}</h3>
            </CardContent>
        </Card>
    );
}
