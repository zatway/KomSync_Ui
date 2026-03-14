import {NavLink} from "react-router-dom";
import {cn} from "@/shared/lib/ui_shadcn/utils";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/shared/ui_shadcn/accordion";
import {FolderKanban, GitPullRequestCreate} from "lucide-react";
import {useGetProjectsQuery} from "@/modules/projects/api/projectsApi";
import {FC} from "react";
import {AppRoutes} from "@/app/routes/AppRoutes";
import ProjectItem from "@/modules/projects/components/ProjectItem";
import {ProjectBriefDto} from "@/types/dto/projects/ProjectBriefDto";

interface AccordionProjectsItemProps {
    collapsed: boolean;
}

// Мок-данные для useGetProjectsQuery() — массив ProjectBriefDto
export const mockProjects: ProjectBriefDto[] = [
    {
        id: "proj-uuid-001",
        key: "MOBAPP",
        name: "Мобильное приложение для клиентов",
        description: "Приложение для записи на диагностику и просмотра результатов. iOS + Android",
        ownerId: "user-101",
        ownerName: "Анна Смирнова",
        ownerAvatarUrl: "https://i.pravatar.cc/150?u=anna",
        memberCount: 7,
        taskCount: 124,
        openTaskCount: 42,
        completedTaskCount: 82,
        progress: 66,
        dueDate: "2026-06-30",
        lastActivityAt: "2026-03-13T14:22:00Z",
        createdAt: "2025-11-05T09:15:00Z",
        updatedAt: "2026-03-13T14:22:00Z",
        color: "#10b981", // emerald-500
        icon: "📱",
    },

    {
        id: "proj-uuid-002",
        key: "CRM2026",
        name: "Внедрение новой CRM-системы",
        description: "Переход с старой Bitrix24 на кастомную CRM + интеграции с 1С и телефонией",
        ownerId: "user-205",
        ownerName: "Дмитрий Ковалёв",
        ownerAvatarUrl: "https://i.pravatar.cc/150?u=dm",
        memberCount: 12,
        taskCount: 238,
        openTaskCount: 115,
        completedTaskCount: 123,
        progress: 52,
        dueDate: "2026-09-15",
        lastActivityAt: "2026-03-14T08:45:00Z",
        createdAt: "2025-08-20T11:30:00Z",
        updatedAt: "2026-03-14T08:45:00Z",
        color: "#3b82f6", // blue-500
        icon: "💼",
    },

    {
        id: "proj-uuid-003",
        key: "SITE2025",
        name: "Редизайн корпоративного сайта",
        description: "Полный редизайн + переход на Next.js 15 + улучшение SEO и скорости",
        ownerId: "user-101",
        ownerName: "Анна Смирнова",
        ownerAvatarUrl: "https://i.pravatar.cc/150?u=anna",
        memberCount: 4,
        taskCount: 68,
        openTaskCount: 9,
        completedTaskCount: 59,
        progress: 87,
        dueDate: "2026-04-20",
        lastActivityAt: "2026-03-12T17:10:00Z",
        createdAt: "2025-12-10T14:00:00Z",
        updatedAt: "2026-03-12T17:10:00Z",
        color: "#8b5cf6", // violet-500
        icon: "🌐",
    },

    {
        id: "proj-uuid-004",
        key: "INT2026",
        name: "Интеграция с лабораториями-партнёрами",
        description: "Автоматическая передача результатов анализов из внешних лабораторий",
        ownerId: "user-318",
        ownerName: "Елена Петрова",
        ownerAvatarUrl: "https://i.pravatar.cc/150?u=elena",
        memberCount: 5,
        taskCount: 47,
        openTaskCount: 38,
        completedTaskCount: 9,
        progress: 19,
        dueDate: "2026-12-01",
        lastActivityAt: "2026-03-10T11:55:00Z",
        createdAt: "2026-02-15T10:20:00Z",
        updatedAt: "2026-03-10T11:55:00Z",
        color: "#f59e0b", // amber-500
        icon: "🔬",
    },

    {
        id: "proj-uuid-005",
        key: "ARCH2025",
        name: "Архив старых проектов 2024–2025",
        description: "Перенос завершённых проектов в архив + очистка старых данных",
        ownerId: "user-205",
        ownerName: "Дмитрий Ковалёв",
        ownerAvatarUrl: "https://i.pravatar.cc/150?u=dm",
        memberCount: 2,
        taskCount: 15,
        openTaskCount: 0,
        completedTaskCount: 15,
        progress: 100,
        dueDate: "2026-02-28",
        lastActivityAt: "2026-02-27T16:30:00Z",
        createdAt: "2026-01-10T09:00:00Z",
        updatedAt: "2026-02-27T16:30:00Z",
        color: "#6b7280", // gray-500
        icon: "📦",
    },
];

const AccordionProjectsItem: FC<AccordionProjectsItemProps> = ({collapsed}) => {
    const {data: projectBriefDto = mockProjects} = useGetProjectsQuery();

    const LABEL = "Проекты"

    const Icon = FolderKanban;
    const hasChildren = !!projectBriefDto?.length;

    return (
        <AccordionItem key={LABEL} value={LABEL} className="border-none">
            <AccordionTrigger
                className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-accent hover:no-underline",
                    collapsed && "justify-center px-0"
                )}
                disabled={collapsed}
            >
                <div className="flex items-center gap-3 flex-1">
                    <Icon size={20} className="min-w-[20px]"/>
                    {!collapsed && LABEL}
                </div>
            </AccordionTrigger>

            {!collapsed && (
                <AccordionContent className="pb-1 pl-8">
                    <div className="flex flex-col gap-1">
                        <NavLink
                            key={"Создать проект"}
                            to={AppRoutes.PROJECT_CREATE}
                            className={({isActive}) =>
                                cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                                    "hover:bg-accent",
                                    isActive && "bg-accent text-accent-foreground",
                                    collapsed && "justify-center"
                                )
                            }
                        >
                            <GitPullRequestCreate size={20} className="min-w-[20px]"/>
                            {!collapsed && "Создать проект"}
                        </NavLink>
                        {hasChildren && projectBriefDto.map((child) => (
                            <ProjectItem project={child} isCollapsed={collapsed}/>
                        ))}
                    </div>
                </AccordionContent>
            )}
        </AccordionItem>
    );
};

export default AccordionProjectsItem;

