import { BarChart3, BookOpen, Shield } from "lucide-react";
import { AppRoutes } from "@/app/routes/AppRoutes";
import type { LucideIcon } from "lucide-react";

export type SidebarItem = {
    label: string;
    icon?: LucideIcon;
    path?: string;
    children?: SidebarItem[];
};

/** Проекты и доски задач вынесены в AccordionProjectsItem (динамический список). */
export const sidebarItems: SidebarItem[] = [
    {
        label: "База знаний",
        icon: BookOpen,
        path: AppRoutes.KNOWLEDGE,
    },
    {
        label: "Аналитика",
        icon: BarChart3,
        path: AppRoutes.ANALYTICS,
    },
    {
        label: "Админка",
        icon: Shield,
        path: AppRoutes.ADMIN,
    },
];
