import { BookOpen, CheckSquare, FolderKanban, ListTodo, Settings, Shield } from "lucide-react";
import { AppRoutes } from "@/app/routes/AppRoutes";

export type SidebarItem = {
    label: string;
    icon?: any;           // LucideIcon
    path?: string;       // если есть — прямая ссылка (как База знаний)
    children?: SidebarItem[]; // вложенные пункты
};

export const sidebarItems: SidebarItem[] = [
    {
        label: "База знаний",
        icon: BookOpen,
        path: AppRoutes.KNOWLEDGE,
    },
    {
        label: "Доска задач",
        icon: CheckSquare,
        children: [
            // Здесь можно динамически подгружать проекты из API
            { label: "Проект А", path: `${AppRoutes.TASKS_DASHBOARD}/project-a` },
            { label: "Проект Б", path: `${AppRoutes.TASKS_DASHBOARD}/project-b` },
        ],
    },
    {
        label: "Админка",
        icon: Shield,
        path: AppRoutes.ADMIN,
    },
];
