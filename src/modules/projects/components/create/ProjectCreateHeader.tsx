import {Button} from "@/shared/ui_shadcn/button";
import {ArrowLeft} from "lucide-react";
import {useNavigate} from "react-router-dom";

const ProjectCreateHeader = () => {
    const navigate = useNavigate();

    return (
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Создание нового проекта</h1>
                <p className="text-muted-foreground mt-1">
                    Заполните основные данные — остальное можно настроить позже
                </p>
            </div>
            <Button variant="outline" onClick={() => navigate(-1)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад
            </Button>
        </div>
    );
};

export default ProjectCreateHeader;
