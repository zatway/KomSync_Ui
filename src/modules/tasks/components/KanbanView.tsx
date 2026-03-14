import {closestCenter, DndContext, DragEndEvent} from "@dnd-kit/core"
import {useChangeTaskStatusMutation, useGetTasksByProjectQuery} from "../api/tasksApi"
import {ProjectTaskStatus} from "@/types/dto/enums/ProjectTaskStatus";
import {toast} from "sonner";
import {TaskShortDto} from "@/types/dto/tasks/TaskShortDto";
import {ProjectTaskPriority} from "@/types/dto/enums/ProjectTaskPriority";
import {FC, useState} from "react";
import {KanbanColumn} from "@/modules/tasks/components/KanbanColumn";
import {TaskCard} from "@/modules/tasks/components/TaskCard";

const columns = [
    { id: ProjectTaskStatus.Todo, title: "Очередь", color: "slate" as const },
    { id: ProjectTaskStatus.InProgress, title: "В работе", color: "blue" as const },
    { id: ProjectTaskStatus.Review, title: "Ревью", color: "purple" as const },
    { id: ProjectTaskStatus.Testing, title: "Тестирование", color: "amber" as const },
    { id: ProjectTaskStatus.Done, title: "Выполнено", color: "gray" as const },
]

const a: TaskShortDto = {
    id: "1",
    title: "123",
    status: ProjectTaskStatus.Todo,
    priority: ProjectTaskPriority.Critical,
    description: "Солнце медленно клонилось к горизонту, окрашивая древние стены города в золотистые тона. Легкий ветерок играл листвой вековых платанов, создавая причудливую мелодию, которую дополнял далекий звон церковных колоколов. В этот час улицы становились особенно уютными — туристы расходились по кафе, а местные жители выходили на вечерние прогулки.\n" +
        "Мария шла по знакомой тропинке, ведущей к набережной. Её мысли были где-то далеко — в воспоминаниях о детстве, когда этот город казался огромным и полным чудес. Теперь он стал родным, почти домашним, но не утратил своего очарования. Каждый камень здесь хранил свою историю, каждая улочка имела характер.\n" +
        "На площади перед ратушей дети запускали воздушных змеев, их смех разносился по округе. Старушка в цветастом платье продавала самодельные куклы, а молодой художник увлеченно рисовал пейзаж с видом на реку. Жизнь текла своим чередом, неспешно и гармонично.\n" +
        "Река несла свои воды к морю, отражая в своей глади последние лучи солнца. Рыбаки возвращались с дневного улова, их лодки тихо покачивались у причала. Вдалеке проплывал белоснежный теплоход, его палубы были заполнены людьми, наслаждающимися вечерним круизом.\n" +
        "Мария остановилась у парапета, вдыхая свежий воздух, пропитанный ароматом цветущих лип. В такие моменты она особенно остро чувствовала связь времен — прошлое переплеталось с настоящим, создавая уникальную ткань бытия. Каждый закат здесь был неповторим, как и каждый прожитый день.\n" +
        "Город засыпал медленно, с достоинством. Огни фонарей зажигались один за другим, создавая уютную атмосферу. В окнах домов загорался теплый свет, слышался приглушенный гул разговоров. Где-то играла музыка, доносились запахи свежей выпечки из ближайшей пекарни.\n" +
        "Ночь вступала в свои права, но город не спешил погружаться в сон. Он жил своей особенной ночной жизнью, храня тайны и готовясь встретить новый день. А Мария продолжала свой путь, унося с собой частичку этого волшебного вечера, чтобы сохранить её в своей душе навсегда.\n" +
        "Потому что именно в таких моментах, когда время словно замедляется, а мир раскрывает свою истинную красоту, мы по-настоящему чувствуем жизнь во всей её полноте и многогранности.",
    // creatorId: '1',
    // assigneeId: '1',
    deadline: new Date()
}

interface KanbanViewProps {
    projectId: string
}

const KanbanView: FC<KanbanViewProps> = ({projectId}) => {
    const { isLoading } = useGetTasksByProjectQuery(projectId)
    const [changeStatus] = useChangeTaskStatusMutation()

    const [tasks, setTasks] = useState([a])

    // Группировка задач по статусам
    const tasksByStatus = columns.reduce((acc, col) => {
        acc[col.id] = tasks.filter(t => t.status === col.id)
        return acc
    }, {} as Record<string, typeof tasks>)

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over) return

        const taskId = active.id as string
        const newStatus = over.id as string

        if (newStatus !== active.data.current?.sortable?.containerId) {
            changeStatus({ taskId, newStatus: ProjectTaskStatus.Todo })
                .unwrap()
                .then(() => toast.success("Статус обновлён"))
                .catch(() => toast.error("Ошибка обновления статуса"))
        }
    }

    if (isLoading) return <div className="p-8 text-center">Загрузка...</div>

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="flex gap-4 overflow-x-auto pb-4">
                {columns.map(col => (
                    <KanbanColumn
                        key={col.id}
                        id={col.id}
                        title={col.title}
                        tasks={tasksByStatus[col.id]}
                        color={col.color}
                    >
                        {tasksByStatus[col.id].map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </KanbanColumn>
                ))}
            </div>
        </DndContext>
    )
}

export default KanbanView
