import {useParams} from "react-router-dom";
import {FC} from "react";
import {KanbanView} from "@/modules/tasks";

interface TasksPageProps {
    variant: 'dashboard' | "table"
}

const TasksPage:FC<TasksPageProps>  = ({variant}) => {
    const {url} = useParams();

    return (
        <KanbanView/>
    );
};

export default TasksPage ;
