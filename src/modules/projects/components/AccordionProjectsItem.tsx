import { NavLink } from 'react-router-dom'
import { cn } from '@/shared/lib/ui_shadcn/utils'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui_shadcn/accordion'
import { FolderKanban, GitPullRequestCreate } from 'lucide-react'
import { useGetProjectsQuery } from '@/modules/projects/api/projectsApi'
import { FC } from 'react'
import { AppRoutes } from '@/app/routes/AppRoutes'
import ProjectItem from '@/modules/projects/components/ProjectItem'

interface AccordionProjectsItemProps { collapsed: boolean }

const AccordionProjectsItem: FC<AccordionProjectsItemProps> = ({ collapsed }) => {
    const { data: projects } = useGetProjectsQuery()
    return (
        <AccordionItem value='Проекты' className='border-none'>
            <AccordionTrigger className={cn('flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-accent hover:no-underline', collapsed && 'justify-center px-0')} disabled={collapsed}>
                <div className='flex items-center gap-3 flex-1'><FolderKanban size={20} className='min-w-[20px]' />{!collapsed && 'Проекты'}</div>
            </AccordionTrigger>
            {!collapsed && (
                <AccordionContent className='pb-1 pl-2'>
                    <div className='mb-2 space-y-1'>
                        <NavLink to={AppRoutes.PROJECT_CREATE} className={({ isActive }) => cn('flex items-center gap-2 rounded-md px-3 py-1.5 text-sm hover:bg-accent/70', isActive && 'bg-accent/80')}><GitPullRequestCreate size={14} />Создать проект</NavLink>
                    </div>
                    <div className='space-y-1'>
                        {projects?.map((p) => <ProjectItem key={p.id} project={p} />)}
                    </div>
                </AccordionContent>
            )}
        </AccordionItem>
    )
}

export default AccordionProjectsItem

