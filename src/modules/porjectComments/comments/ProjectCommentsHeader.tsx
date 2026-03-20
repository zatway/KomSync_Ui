import { ArrowLeft, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui_shadcn/button";
import { AppRoutes } from "@/app/routes/AppRoutes";

interface Props {
    projectId: string;
}

export function ProjectCommentsHeader({ projectId }: Props) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                    <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Комментарии проекта</h1>
                    <p className="text-muted-foreground mt-1">
                        Обсуждения, вопросы и заметки по проекту
                    </p>
                </div>
            </div>

            <Button variant="outline" onClick={() => navigate(`${AppRoutes.PROJECTS}/${projectId}`)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад к проекту
            </Button>
        </div>
    );
}
