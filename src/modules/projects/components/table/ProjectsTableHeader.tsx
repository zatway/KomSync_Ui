import { Plus } from "lucide-react";
import { Button } from "@/shared/ui_shadcn/button";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/app/routes/AppRoutes";

export function ProjectsTableHeader() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Таблица проектов</h1>
                <p className="text-muted-foreground mt-1">
                    Полный список с фильтрами, сортировкой и действиями
                </p>
            </div>

            <Button onClick={() => navigate(AppRoutes.PROJECT_CREATE)}>
                <Plus className="mr-2 h-4 w-4" />
                Новый проект
            </Button>
        </div>
    );
}
