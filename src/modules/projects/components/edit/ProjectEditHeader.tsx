import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui_shadcn/button";

interface Props {
    projectName: string;
}

export function ProjectEditHeader({ projectName }: Props) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Редактирование проекта</h1>
                <p className="text-muted-foreground mt-1">{projectName}</p>
            </div>

            <Button variant="outline" onClick={() => navigate(-1)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад
            </Button>
        </div>
    );
}
