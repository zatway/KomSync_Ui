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

    return (
        <div className='container mx-auto py-8 px-4'>
            <div className='flex flex-wrap items-center justify-between gap-4 mb-8'>
                <div>
                    <Button variant='ghost' onClick={() => navigate(`${AppRoutes.PROJECTS}/${projectId}`)}><ArrowLeft className='mr-2 h-4 w-4' />К проекту</Button>
                    <h1 className='text-2xl font-bold mt-2'>Задачи: {project?.name ?? projectId}</h1>
                </div>
                <Button onClick={() => navigate(`${AppRoutes.TASKS}/${projectId}/create`)}>Новая задача</Button>
            </div>
            {isLoading && <p className='text-muted-foreground'>Загрузка…</p>}
            <div className='border rounded-xl overflow-hidden bg-card'>
                <Table><TableHeader><TableRow><TableHead>Ключ</TableHead><TableHead>Название</TableHead><TableHead>Статус</TableHead><TableHead>Приоритет</TableHead><TableHead>Исполнитель</TableHead><TableHead>Срок</TableHead></TableRow></TableHeader>
                    <TableBody>{tasks.map((t) => <TableRow key={t.id}><TableCell className='font-mono text-sm'>{t.key}</TableCell><TableCell><Link to={`${AppRoutes.TASKS}/${projectId}/detail/${t.id}`} className='hover:underline font-medium'>{t.title}</Link></TableCell><TableCell><Badge variant='secondary'>{t.status.name}</Badge></TableCell><TableCell>{t.priority}</TableCell><TableCell>{t.assignee?.name ?? '—'}</TableCell><TableCell>{t.deadline ? format(parseISO(t.deadline), 'd MMM yyyy', { locale: ru }) : '—'}</TableCell></TableRow>)}</TableBody>
                </Table>
                {!tasks.length && !isLoading && <p className='p-6 text-center text-muted-foreground'>Задач пока нет</p>}
            </div>
        </div>
    )
}

