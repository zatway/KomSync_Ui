import { useParams, useNavigate, Link } from 'react-router-dom'
import { useGetProjectByIdQuery } from '@/modules/projects/api/projectsApi'
import { useGetTasksByProjectQuery } from '@/modules/tasks/api/tasksApi'
import { AppRoutes } from '@/app/routes/AppRoutes'
import { Button } from '@/shared/ui_shadcn/button'
import { ArrowLeft } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui_shadcn/table'
import { Badge } from '@/shared/ui_shadcn/badge'
import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

export default function ProjectTasksTablePage() {
    const { projectId } = useParams<{ projectId: string }>()
    const navigate = useNavigate()
    const { data: project } = useGetProjectByIdQuery(projectId!, { skip: !projectId })
    const { data: tasks = [], isLoading } = useGetTasksByProjectQuery(projectId!, { skip: !projectId })

    const goTask = (id: string) => {
        navigate(`${AppRoutes.TASKS}/${projectId}/detail/${id}`)
    }

    return (
        <div className='container mx-auto py-6 sm:py-8 px-3 sm:px-4 max-w-full'>
            <div className='flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8'>
                <div className="min-w-0">
                    <Button variant='ghost' className="px-2 sm:px-4" onClick={() => navigate(`${AppRoutes.PROJECTS}/${projectId}`)}>
                        <ArrowLeft className='mr-2 h-4 w-4 shrink-0' />
                        К проекту
                    </Button>
                    <h1 className='text-xl sm:text-2xl font-bold mt-2 truncate'>Задачи: {project?.name ?? projectId}</h1>
                </div>
                <Button className="shrink-0 w-full sm:w-auto" onClick={() => navigate(`${AppRoutes.TASKS}/${projectId}/create`)}>Новая задача</Button>
            </div>
            {isLoading && <p className='text-muted-foreground'>Загрузка…</p>}
            <div className='border rounded-xl overflow-x-auto bg-card'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="whitespace-nowrap">Ключ</TableHead>
                            <TableHead>Название</TableHead>
                            <TableHead className="hidden sm:table-cell whitespace-nowrap">Статус</TableHead>
                            <TableHead className="hidden md:table-cell whitespace-nowrap">Приоритет</TableHead>
                            <TableHead className="hidden lg:table-cell whitespace-nowrap">Исполнитель</TableHead>
                            <TableHead className="hidden md:table-cell whitespace-nowrap">Срок</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks.map((t) => (
                            <TableRow
                                key={t.id}
                                className='cursor-pointer hover:bg-muted/50'
                                onDoubleClick={() => goTask(t.id)}
                            >
                                <TableCell className='font-mono text-xs sm:text-sm whitespace-nowrap'>{t.key}</TableCell>
                                <TableCell className='max-w-[min(60vw,280px)] sm:max-w-none'>
                                    <Link
                                        to={`${AppRoutes.TASKS}/${projectId}/detail/${t.id}`}
                                        className='hover:underline font-medium line-clamp-2'
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {t.title}
                                    </Link>
                                    <div className="sm:hidden mt-1 flex flex-wrap gap-1">
                                        <Badge variant='secondary' className="text-[10px]">{t.status.name}</Badge>
                                        <span className="text-[10px] text-muted-foreground">{t.priority}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell"><Badge variant='secondary'>{t.status.name}</Badge></TableCell>
                                <TableCell className="hidden md:table-cell">{t.priority}</TableCell>
                                <TableCell className="hidden lg:table-cell">{t.assignee?.name ?? '—'}</TableCell>
                                <TableCell className="hidden md:table-cell whitespace-nowrap">
                                    {t.deadline ? format(parseISO(t.deadline), 'd MMM yyyy', { locale: ru }) : '—'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {!tasks.length && !isLoading && (
                    <p className='p-6 text-center text-muted-foreground'>Задач пока нет</p>
                )}
            </div>
            <p className="text-xs text-muted-foreground mt-3 hidden sm:block">Двойной щелчок по строке открывает задачу</p>
        </div>
    )
}
