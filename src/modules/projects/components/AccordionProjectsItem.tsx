import {NavLink, useLocation} from "react-router-dom";
import {cn} from "@/shared/lib/ui_shadcn/utils";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/shared/ui_shadcn/accordion";
import {FolderKanban, GitPullRequestCreate, Table} from "lucide-react";
import {useGetProjectsQuery} from "@/modules/projects/api/projectsApi";
import {FC} from "react";
import {AppRoutes} from "@/app/routes/AppRoutes";
import ProjectItem from "@/modules/projects/components/ProjectItem";

interface AccordionProjectsItemProps {
    collapsed: boolean;
}

const AccordionProjectsItem: FC<AccordionProjectsItemProps> = ({collapsed}) => {
    const {data: projectBriefDto} = useGetProjectsQuery();

    const LABEL = "Проекты"

    const Icon = FolderKanban;
    const hasChildren = !!projectBriefDto?.length;

    const location = useLocation();

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
                            key={"Таблица проектов"}
                            to={AppRoutes.PROJECTS}
                            className={({ isActive: linkActive }) =>
                                cn(
                                    "flex items-center gap-2.5 rounded-md px-3 py-1.5 text-sm transition-colors",
                                    "hover:bg-accent/70",
                                    (location.pathname.startsWith(AppRoutes.PROJECTS) || linkActive) && "bg-accent/80 font-medium",
                                )
                            }
                        >
                            <Table size={20} className="min-w-[20px]"/>
                            {!collapsed && "Таблица проектов"}
                        </NavLink>
                        <NavLink
                            key={"Создать проект"}
                            to={AppRoutes.PROJECT_CREATE}
                            className={({ isActive: linkActive }) =>
                                cn(
                                    "flex items-center gap-2.5 rounded-md px-3 py-1.5 text-sm transition-colors",
                                    "hover:bg-accent/70",
                                    (location.pathname.startsWith(AppRoutes.PROJECT_CREATE) || linkActive) && "bg-accent/80 font-medium",
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

