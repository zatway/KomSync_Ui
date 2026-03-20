import { Button } from "@/shared/ui_shadcn/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProjectsTablePagination() {
    return (
        <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
                Показано 1–10 из 42 проектов
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" disabled>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
